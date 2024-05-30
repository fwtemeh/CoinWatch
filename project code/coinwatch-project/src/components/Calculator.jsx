/*import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {CryptoState} from "../CryptoContext.jsx";
import axios from "axios";
import {SingleCoin} from "../config/api.jsx";

export function Calculator () {
    const { id } = useParams();
    const [coin, setCoin] = useState();
    let navigate = useNavigate();
    const { currency, symbol } = CryptoState();

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));

        setCoin(data);
    };
    console.log(coin)
    useEffect(() => {
        fetchCoin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

        return (
            <>

                <div className="container-fluid">
                    <div className="section-header text-start text-uppercase mb-3">
                        <h2>Calculator</h2>
                    </div>
                    <div className="row">
                        <div className="input-group">
                            <input type="text" className="form-control extension-input" value="1" placeholder="0"
                                   aria-label="Enter text" aria-describedby="basic-addon2"/>
                                <button className="btn appended-input-btn dropdown-toggle" type="button"
                                        data-bs-toggle="dropdown" aria-expanded="false"  disabled> {coin?.name} </button>
                        </div>
                        <span className="exchange-icon">
                                <i className="fas fa-exchange-alt m-3 fa-rotate-90"></i>
                            </span>
                        <div className="input-group">
                            <input type="text" className="form-control extension-input" value="67,140.39"
                                   aria-label="Enter text" aria-describedby="basic-addon2"  />
                                <span title="Change the Quote Currency through settings">
                                    <button className="btn appended-input-btn disabled dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                            aria-expanded="false"></button>
                                </span>

                        </div>

                    </div>
                </div>

            </>
        )
    }*/
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SingleCoin } from "../config/api.jsx";

export function Calculator() {
    const { id } = useParams();
    const [coin, setCoin] = useState();
    const [currency, setCurrency] = useState("usd");
    const [amount, setAmount] = useState(1);
    const [conversionRate, setConversionRate] = useState(null);

    useEffect(() => {
        const fetchCoin = async () => {
            try {
                const { data } = await axios.get(SingleCoin(id));
                setCoin(data);
            } catch (error) {
                console.error("Error fetching coin data:", error);
            }
        };
        fetchCoin();
    }, [id]);

    useEffect(() => {
        const fetchConversionRate = async () => {
            try {
                const response = await axios.get(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=${currency}`
                );
                setConversionRate(response.data[id][currency]);
            } catch (error) {
                console.error("Error fetching conversion rate:", error);
            }
        };
        fetchConversionRate();
    }, [id, currency]);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleCurrencyChange = (newCurrency) => {
        setCurrency(newCurrency);
    };

    return (
        <div className="container-fluid">
            <div className="section-header text-start text-uppercase mb-3">
                <h2>Calculator</h2>
            </div>
            <div className="row">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control extension-input"
                        value={amount}
                        onChange={handleAmountChange}
                        placeholder="0"
                        aria-label="Enter text"
                        aria-describedby="basic-addon2"
                    />
                    <button
                        className="btn appended-input-btn dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        disabled
                    >
                        {coin?.name}
                    </button>
                </div>
                <span className="exchange-icon">
                    <i className="fas fa-exchange-alt m-3 fa-rotate-90"></i>
                </span>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control extension-input"
                        value={conversionRate ? (amount * conversionRate).toFixed(2) : " "}
                        aria-label="Enter text"
                        aria-describedby="basic-addon2"
                        readOnly
                    />
                    <div className="dropdown">
                        <button
                            className="btn appended-input-btn dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {currency.toUpperCase()}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => handleCurrencyChange('usd')}
                                >
                                    USD
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => handleCurrencyChange('eur')}
                                >
                                    EUR
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => handleCurrencyChange('jpy')}
                                >
                                    JPY
                                </button>
                            </li>   <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => handleCurrencyChange('cad')}
                                >
                                    CAD
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
