/*



export function PinedCoin () {

        return (
            <>
                <section id="pinned-coins" className="mb-3">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-3">

                                <div className="pinned-coin">
                                    <div className="pinned-coin-icon">
                                        <img src="destination/Images/Coins/btc.svg" alt="" className="img-fluid" />
                                    </div>
                                    <div className="pinned-coin-abbreviation">
                                        BTC
                                    </div>
                                    <button className="remove-coin-btn"><i className="fa-solid fa-xmark"></i></button>
                                </div>
                            </div>


                        </div>
                    </div>
                </section>

            </>
        )
    }

*/

/*
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SingleCoin } from "../config/api.jsx";

export function PinedCoin() {
    const [pinnedCoins, setPinnedCoins] = useState([]);

    useEffect(() => {
        const fetchPinnedCoins = async () => {
            const pinnedCoinIds = JSON.parse(localStorage.getItem('pinnedCoins')) || [];
            const coinPromises = pinnedCoinIds.map(id => axios.get(SingleCoin(id)));
            const coinResponses = await Promise.all(coinPromises);
            setPinnedCoins(coinResponses.map(response => response.data));
        };

        fetchPinnedCoins();
    }, []);

    return (
        <section id="pinned-coins" className="mb-3">
            <div className="container-fluid">
                <div className="row">
                    {pinnedCoins.map(coin => (
                        <div key={coin.id} className="col-3">
                            <div className="pinned-coin">
                                <div className="pinned-coin-icon">
                                    <img src={coin.image.thumb} alt={coin.name} className="img-fluid" />
                                </div>
                                <Link to={`/coins/${coin.id}`} className="coin-link">
                                <div className="pinned-coin-abbreviation">
                                    {coin.symbol.toUpperCase()}
                                </div>
              </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
*/


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SingleCoin } from "../config/api.jsx";

export function PinedCoin({darkMode}) {
    const [pinnedCoins, setPinnedCoins] = useState([]);

    useEffect(() => {
        const fetchPinnedCoins = async () => {
            const pinnedCoinIds = JSON.parse(localStorage.getItem('pinnedCoins')) || [];
            const coinPromises = pinnedCoinIds.map(id => axios.get(SingleCoin(id)));
            const coinResponses = await Promise.all(coinPromises);
            setPinnedCoins(coinResponses.map(response => response.data));
        };

        fetchPinnedCoins();
    }, []);

    const removePinnedCoin = (coinId) => {
        const updatedPinnedCoins = pinnedCoins.filter(coin => coin.id !== coinId);
        setPinnedCoins(updatedPinnedCoins);
        const pinnedCoinIds = updatedPinnedCoins.map(coin => coin.id);
        localStorage.setItem('pinnedCoins', JSON.stringify(pinnedCoinIds));
    };

    return (
        <section id="pinned-coins" className="mb-3">
            <div className="container-fluid">
                <div className="row">
                    {pinnedCoins.map(coin => (
                        <div key={coin.id} className="col-3">
                            <div className="pinned-coin">
                                <div className="pinned-coin-icon">
                                    <img src={coin.image.thumb} alt={coin.name} className="img-fluid" />
                                </div>
                                <Link to={`/coins/${coin.id}`} className="coin-link" style={{textDecoration:"none"}}>
                                <div className="pinned-coin-abbreviation">
                                    {coin.symbol.toUpperCase()}
                                </div>


                                </Link>
                                <button
                                    className="remove-coin-btn"
                                    onClick={() => removePinnedCoin(coin.id)}
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
