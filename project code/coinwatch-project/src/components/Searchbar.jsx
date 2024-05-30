

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SingleCoin, TrendingCoins } from "../config/api.jsx";
import "./destination/seachstyle.css"

export const SearchBar = ({ currency ,darkMode}) => {
    const [query, setQuery] = useState('');
    const [coins, setCoins] = useState([]);
    const [noResults, setNoResults] = useState(false); // State to track no results


    const handleSearch = async (event) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        if (newQuery.length > 2) {
            const response = await axios.get(`https://api.coingecko.com/api/v3/search?query=${newQuery}`);
            const fetchedCoins = response.data.coins; // Fetch all results
            setCoins(fetchedCoins);
            setNoResults(fetchedCoins.length === 0); // Update noResults state
        } else {
            setCoins([]);
            setNoResults(false); // Reset noResults state
        }
        const fetchTrendCoin = async () => {
            try {
                const { data } = await axios.get(TrendingCoins(currency));
                setTrending(data);
            } catch (error) {
                console.error("Error fetching trending coins:", error);
                // You might want to handle errors here, such as displaying an error message to the user.
            }
        };
    };



    return (
        <section id="search-bar" className={`position-relative ${darkMode ? 'dark-mode' : ''}`}>
            <div className="container-fluid">

                <div className="input-group rounded-3">
                    <input
                        type="text"
                        className="form-control extension-input"
                        placeholder="Search for a coin..."
                        value={query}
                        onChange={handleSearch}
                    />
                    <div className="input-group-append">
                        <button className="btn appended-input-btn" type="button">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </div>
                {query.length > 2 && (
                    <ul className="list-group position-absolute  mt-2   "
                        style={{ maxHeight: '200px', overflowY: 'auto' ,width:'450px'}}>
                        {noResults ? (
                            <li className="list-group-item">Coin does not exist</li>
                        ) : (
                            coins.map((coin) => (

                                <li key={coin.id}  className="list-group-item d-flex align-items-center" style={{borderRadius:'10px'}}>
                                    <Link to={`/coins/${coin.id}`}
                                          style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <img src={coin.thumb} alt={coin.name} className="me-2"
                                         style={{ width: '20px', height: '20px' }} />

                                        {coin.name}
                                    </Link>
                                </li>
                            ))
                        )}
                    </ul>
                )}
            </div>
        </section>
    );
};
