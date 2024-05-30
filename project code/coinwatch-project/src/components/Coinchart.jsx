/*
import { SymbolOverview} from "react-ts-tradingview-widgets";
function  Coinchart()  {
    const styles: copyrightStyles = {
        parent: {
            display:'none',

        },
        link: {
            display:'none',
        },

        span:{
            display:'none',
        }


    };

        return (

    <SymbolOverview colorTheme="dark"
                    symbols="BTCUSD"

                    width="100%"
                    height="400"
                    chartOnly={true}

                    isTransparent={true}

                    scalePosition='left'
                    ScaleMode="Normal"
                    chartType="Bars"

                    ScalePosition='left'



                    lineWidth='2'

                    lineColor='#089981'
                    timeHoursFormat='24-hours'
                     // hideDateRanges={true}
                    copyrightStyles={styles}


           //         widgetFontColor='rgba(34, 171, 148, 1)'
//bottomColor='rgba(34, 171, 148, 1)'

    />
        );
}


export default Coinchart;*/
import { SymbolOverview } from "react-ts-tradingview-widgets";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {SingleCoin} from "../config/api.jsx";

function Coinchart({ darkMode }) {


    const { id } = useParams();
    const [coin, setCoin] = useState();


    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));

        setCoin(data);
    };

    useEffect(() => {
        fetchCoin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const getid = coin?.symbol.toUpperCase();
    const Rsymbol=getid+"USD"
    const colorTheme = darkMode ? "dark" : "light";

    return (
        <div>
            <style>
                {`
                .tradingview-widget-copyright {
                    display: none;
                }
                `}
            </style>
            <SymbolOverview
                colorTheme={colorTheme}
                symbols={Rsymbol}
                width="100%"
                height={400}
                chartOnly={true}
                isTransparent={true}
                scalePosition="left"
                scaleMode="Normal"
                chartType="Bars"
                lineWidth={2}
                lineColor="#089981"
                timeHoursFormat="24-hours"
               
                // hideDateRanges={true}
            />
        </div>
    );
}

export default Coinchart;
