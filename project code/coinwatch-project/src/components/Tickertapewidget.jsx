import { TickerTape } from "react-ts-tradingview-widgets";
import {useEffect, useState} from "react";

export function Tickertapewidget({ darkMode }) {
    const colorTheme=darkMode ? "dark" : "light";


    return (
        <div className="fixed-ticker-tape">
            <style>
                {`
                    .tradingview-widget-copyright {
                        display: none;
                    }
                    height: 72px;
                `}
            </style>
            <TickerTape colorTheme={colorTheme} isTransparent={true}>

            </TickerTape>
        </div>
    );
}
