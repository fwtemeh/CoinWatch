
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from 'dompurify';
import { SingleCoin } from "../config/api.jsx";
import { Coinchart } from './Coinchart.jsx';
import { Timelinewidget } from "./Timelinewidget.jsx";
import { Calculator } from "./Calculator.jsx";
import HashLoader from "react-spinners/HashLoader";

function numberWithCommas(x) {
    if (x) {
        return x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "N/A";
}

export const Coinpage = ({ darkMode }) => {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);
    const [isPinned, setIsPinned] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchCoin = async () => {
        try {
            const { data } = await axios.get(SingleCoin(id));
            setCoin(data);
            setIsPinned(isCoinPinned(data.id));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchCoin().finally(() => setLoading(false));
    }, [id]);

    const isCoinPinned = (coinId) => {
        const pinnedCoins = JSON.parse(localStorage.getItem('pinnedCoins')) || [];
        return pinnedCoins.includes(coinId);
    };

    const handlePinCoin = () => {
        let pinnedCoins = JSON.parse(localStorage.getItem('pinnedCoins')) || [];
        if (isPinned) {
            pinnedCoins = pinnedCoins.filter(coinId => coinId !== coin.id);
        } else {
            pinnedCoins.push(coin.id);
        }
        localStorage.setItem('pinnedCoins', JSON.stringify(pinnedCoins));
        setIsPinned(!isPinned);
    };

    const handleChartLoad = () => {
        setLoading(false);
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <HashLoader color="#3772FF" loading={true} size={50} />
            </div>
        );
    }

    let profit = coin?.market_data.price_change_percentage_24h >= 0;

    return (
        <div className={`coin-page ${darkMode ? "dark-mode" : ""}`}>
            <section id="coin-overview" className="mb-5" style={{ height: '550px' }}>
                <div className="container-fluid">
                    <div className="section-header text-start text-uppercase mb-3">
                        <h2>Coin Overview</h2>
                        <div className="button-group">
                            <div className="pin-checkbox">
                                <input
                                    type="checkbox"
                                    id="pin"
                                    className="pin-input"
                                    checked={isPinned}
                                    onChange={handlePinCoin}
                                />
                                <label htmlFor="pin" className="pin-label">
                                    <i className="fa-solid fa-thumbtack"></i>
                                </label>
                            </div>
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="back-button extension-button"
                            >
                                <i className="fa-solid fa-chevron-left"></i>
                                Back
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 coin">
                            <div className="extension-card">
                                <div className="coin-card">
                                    <div className="coin-profile col-7">
                                        <div className="coin-icon">
                                            <a href={`https://www.coingecko.com/en/coins/${id}`}>
                                                <img src={coin?.image.large} alt={coin?.name} className="img-fluid" />
                                            </a>
                                        </div>
                                        <div className="coin-information">
                                            <h2 className="coin-name">{coin?.name}</h2>
                                            <div className="coin-abbreviation d-flex gap-3">
                                                {coin?.symbol.toUpperCase()}
                                                <div className="coin-rank">#{coin?.market_cap_rank}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="coin-value col-">
                                        <h3 className="coin-price">
                                            ${numberWithCommas(coin?.market_data.current_price.usd)}
                                        </h3>
                                        <span className={`coin-change ${profit ? "bullish" : "bearish"}`}>
                                            {profit ? "+" : ""}{coin?.market_data.price_change_percentage_24h?.toFixed(2)}%
                                        </span>
                                    </div>
                                </div>
                                <div className="coin-overview-summary">
                                    <p
                                        className="description"
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(coin?.description.en.split(". ")[0])
                                        }}
                                    ></p>
                                </div>
                                <div className="coin-chart">
                                    <Coinchart darkMode={darkMode} onLoad={handleChartLoad} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="coin-metrics" className="mb-5" style={{ height: '250px', paddingTop: '70px' }}>
                <div className="container-fluid">
                    <div className="section-header text-start text-uppercase mb-3">
                        <h2>Coin Metrics</h2>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="extension-card">
                                <ul className="coin-metrics-table">
                                    <li className="coin-metrics-item">
                                        <h3 className="metrics-key">Price to USD</h3>
                                        <h3 className="metrics-value">${numberWithCommas(coin?.market_data.current_price.usd)}</h3>
                                    </li>
                                    <li className="coin-metrics-item">
                                        <h3 className="metrics-key">Price to BTC</h3>
                                        <h3 className="metrics-value">
                                            {coin?.tickers?.[1]?.converted_last?.btc ? coin.tickers[1].converted_last.btc : "N/A"} BTC
                                        </h3>
                                    </li>
                                    <li className="coin-metrics-item">
                                        <h3 className="metrics-key">Rank</h3>
                                        <h3 className="metrics-value">#{coin?.market_cap_rank}</h3>
                                    </li>
                                    <li className="coin-metrics-item">
                                        <h3 className="metrics-key">24h Volume</h3>
                                        <h3 className="metrics-value">${numberWithCommas(coin?.market_data.total_volume.usd)}</h3>
                                    </li>
                                    <li className="coin-metrics-item">
                                        <h3 className="metrics-key">Market Cap</h3>
                                        <h3 className="metrics-value">${numberWithCommas(coin?.market_data.market_cap.usd)}</h3>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="calculator" className="mb-5" style={{ height: '150px', paddingTop: '70px' }}>
                <Calculator />
            </section>

            <section id="coin-news" className="mb-5" style={{ paddingTop: '70px' }}>
                <div className="container-fluid">
                    <div className="section-header text-start text-uppercase mb-3">
                        <h2>Crypto News</h2>
                    </div>
                    <div className="row" style={{ height: '550px' }}>
                        <div className="col-12 new">
                            <div className="extension-card">
                                <Timelinewidget darkMode={darkMode} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
