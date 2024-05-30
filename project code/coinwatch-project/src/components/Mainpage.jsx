

import TradingViewWidget from './TradingViewWidget.jsx';






import {CoinList} from "./CoinList.jsx";

import {SearchBar} from "./Searchbar.jsx";
import {PinedCoin} from "./PinedCoin.jsx";




export const Mainpage = ({darkMode}) =>{



    return (
        <>

            <div className="main-page">
                <PinedCoin  darkMode={darkMode} />
             <SearchBar darkMode={darkMode}/>

                <section id="market-analysis">
                    <div className="container-fluid ">


                        <TradingViewWidget darkMode={darkMode} />

                        {/*<Widget/>*/}

                    </div>
                </section>

                <section id="top-5-coins" className="mb-5">
                    <div className="container-fluid">
                        <div className="section-header text-start text-uppercase mb-3">
                            <h2>Top 5 Coins</h2>
                        </div>



                        <CoinList/>


                    </div>
                </section>

            </div>


        </>

    )};








