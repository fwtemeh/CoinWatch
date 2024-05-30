
import { Timeline } from "react-ts-tradingview-widgets";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {CryptoState} from "../CryptoContext.jsx";
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

