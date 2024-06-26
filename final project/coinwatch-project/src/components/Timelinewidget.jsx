
import { Timeline } from "react-ts-tradingview-widgets";
import {useEffect, useState} from "react";
import { useParams} from "react-router-dom";

import axios from "axios";
import {SingleCoin} from "../config/api.jsx";
export function Timelinewidget ({ darkMode }) {
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

    const colorTheme=darkMode ? "dark" : "light";

    return (
            <>



                <Timeline colorTheme={colorTheme}   market="crypto" height={550} width="100%"
                          feedMode="symbol"

                    isTransparent={true}
                          symbol={Rsymbol}

                >






                </Timeline>



            </>
        )
    }

