


import axios from "axios";
import { TrendingCoins } from "../config/api.jsx";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparklines, SparklinesLine } from 'react-sparklines';



export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const CoinList = () => {
    const [trending, setTrending] = useState([]);
    const {currency, symbol} = useState('usd');

    const fetchTrendCoin = async () => {
        try {
            const {data} = await axios.get(TrendingCoins('usd'));
            setTrending(data);
        } catch (error) {
            console.error("Error fetching trending coins:", error);

        }
    };

    useEffect(() => {
        fetchTrendCoin();
    }, [currency]);

    return (
        <div className="row">
            {trending.map((coin) => {
                let profit = coin?.price_change_percentage_24h >= 0;

                return (
                    <div className="col-12 coin" key={coin.id}>

                        <Link style={{ textDecoration: 'none' }} to={`/coins/${coin.id}`} >
                            <div className="extension-card">
                                <div className="coin-card">
                                    <div className="coin-profile col-5">
                                        <div className="coin-icon">
                                            <img src={coin?.image} alt={coin.name} width="50px"  height="50" />
                                        </div>
                                        <div className="coin-information">
                                            <h2 className="coin-name">{coin.name}</h2>
                                            <div className="coin-abbreviation">
                                                <h6>
                                                    {coin.symbol}

                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="coin-small-chart col-4">
                                        <Sparklines data={coin.sparkline_in_7d.price
                                        } width={100} height={30}>
                                            <SparklinesLine      color={profit ? "#089981" : "#FF0000"}
                                                                 style={{ strokeWidth: 1, fill: "none" }} />
                                        </Sparklines>


                                    </div>
                                    <div className="coin-value col-3">
                                        <h3 className="coin-price">{`$ ${numberWithCommas(coin?.current_price.toFixed(2))}`}</h3>
                                        <span className={`coin-change ${profit ? "bullish" : "bearish"}`}>
                                    {profit ? "+" : ""}{coin?.price_change_percentage_24h?.toFixed(2)}%
                                </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    )

}

