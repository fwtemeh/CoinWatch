
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import TradingViewWidget from './TradingViewWidget.jsx';
import { CoinList } from "./CoinList.jsx";
import { SearchBar } from "./Searchbar.jsx";
import { PinedCoin } from "./PinedCoin.jsx";

export const Mainpage = ({ darkMode }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <HashLoader color="#3772FF" loading={true} size={50} />
            </div>
        );
    }

    return (
        <div className="main-page">
            <PinedCoin darkMode={darkMode} />
            <SearchBar darkMode={darkMode} />

            <section id="market-analysis"  style={{height:'400px'}}>
                <div className="container-fluid">
                    <TradingViewWidget darkMode={darkMode} />
                </div>
            </section>

            <section id="top-5-coins" className="mb-5"  style={{height:'550px'}}>
                <div className="container-fluid">
                    <div className="section-header text-start text-uppercase mb-3">
                        <h2>Top 5 Coins</h2>
                    </div>
                    <CoinList />
                </div>
            </section>
        </div>
    );
};
