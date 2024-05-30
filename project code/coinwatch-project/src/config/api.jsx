/*

/!*export const TrendingCoins = (currency) => {
    const options = {
        headers: {
            'x-access-token': 'coinrankingf89decd2393dbd09568685d9fdae3c949b672b5c052d9f6d',
        },
    };

    return fetch(`https://api.coinranking.com/v2/coins/${currency}`, options)
        .then((response) => response.json())
        .then((result) => console.log(result));
};*!/
*/

export const CoinList = (currency) =>

    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id) =>
    `https://api.coingecko.com/api/v3/coins/${id}?localization=false&vs_currencies=usd&market_data=true&community_data=false&developer_data=z&x_cg_demo_api_key=CG-YjubLmYWNnUaSJ1dArGTLS2D`;

export const HistoricalChart = (id, days = 365, currency) =>
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;



export const TrendingCoins = (currency) =>
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=5&page=1&sparkline=true&x_cg_demo_api_key=CG-YjubLmYWNnUaSJ1dArGTLS2D`;



