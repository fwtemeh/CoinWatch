

import { TechnicalAnalysis } from 'react-ts-tradingview-widgets';

 const TradingViewWidget = ({darkMode}) => {

     const colorTheme=darkMode ? "dark" : "light";


    const tickerStyles = {
        parent: {
            display: 'none',

        },
    };

    return (
        <>
            <TechnicalAnalysis
                colorTheme={colorTheme}
                width="100%"
                height={400}
                isTransparent={true}
                copyrightStyles={tickerStyles}
                symbol="CRYPTOCAP:TOTAL"
            />
        </>
    );
};

export default TradingViewWidget;