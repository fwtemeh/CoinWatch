
import { SymbolOverview } from "react-ts-tradingview-widgets";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {SingleCoin} from "../config/api.jsx";

export function Coinchart({ darkMode }) {


    const { id } = useParams();
    const [coin, setCoin] = useState();


    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));

        setCoin(data);
    };

    useEffect(() => {
        fetchCoin();

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
               

            />
        </div>
    );
}


