


import axios from "axios";
import { TrendingCoins } from "../config/api.jsx";
import { CryptoState } from "../CryptoContext.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparklines, SparklinesLine } from 'react-sparklines';



export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const CoinList = () => {
    const [trending, setTrending] = useState([]);
    const {currency, symbol} = CryptoState();

    const fetchTrendCoin = async () => {
        try {
            const {data} = await axios.get(TrendingCoins(currency));
            setTrending(data);
        } catch (error) {
            console.error("Error fetching trending coins:", error);
            // You might want to handle errors here, such as displaying an error message to the user.
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


/*

import React, { useEffect, useState } from 'react';
import { fetchTop5Coins } from '../config/api.jsx';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import {CryptoState} from "../CryptoContext.jsx";
import {Link} from "react-router-dom";

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// const options = {
//     headers: {
//         'Content-Type': 'application/json',
//       'x-access-token': 'coinrankingf89decd2393dbd09568685d9fdae3c949b672b5c052d9f6d',
//     },
// };
//
// fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=5&page=1&sparkline=false&x_cg_demo_api_key=CG-YjubLmYWNnUaSJ1dArGTLS2D', options)
//     .then((response) => response.json())
//     .then((result) => console.log(result));
//



 export const CoinList = () => {
    const [trending, setTrending] = useState([]);
     const { currency ,symbol } = CryptoState();

    useEffect(() => {
        fetchTop5Coins()
            .then((coins) => {
                setTrending(coins);
            })
            .catch((error) => {
                console.error('Error fetching top 5 coins:', error);
            });
    }, []);

    return (
        <div className="row">
            {trending.map((coin) => {
                let profit = coin?.price_change_percentage_24h >= 0;


                return (

                    <div className="col-12 coin" key={coin.name}>
                        <Link style={{ textDecoration: 'none' }} to={`/coins/${coin.name}`}>
                            <div className="extension-card">
                                <div className="coin-card">
                                    <div className="coin-profile col-5">
                                        <div className="coin-icon">
                                            <img src={coin.iconUrl} alt={coin.name} width="50px"/>
                                        </div>
                                        <div className="coin-information">
                                            <h2 className="coin-name">{coin.name}</h2>
                                            <div className="coin-abbreviation">
                                                <h6>{coin.symbol}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="coin-small-chart col-4">
                                        <Sparklines data={coin.sparkline} width={100} height={30}>
                                            <SparklinesLine color="#089981" style={{ strokeWidth: 1, fill: "none" }} />
                                        </Sparklines>
                                    </div>
                                    <div className="coin-value col-3">
                                        <h1 className="coin-price"> {symbol}{numberWithCommas(coin.price)}</h1>
{/!*<span className="coin-price">{coin?.price}</span>*!/}
{/!*                                        <span className={`coin-change ${profit ? "bullish" : "bearish"}`}>*!/}
{/!*                                            {profit ? "+" : ""}{coin?.price_change_percentage_24h?.toFixed(2)}%*!/}
{/!*                                        </span>*!/}
                                    </div>
                                </div>
                            </div>
                            </Link >
                    </div>
                );
            })}
        </div>
    );
};
*/
