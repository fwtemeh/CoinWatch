
export const CoinList = (currency) =>

    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id) =>
    `https://api.coingecko.com/api/v3/coins/${id}?localization=false&vs_currencies=usd&market_data=true&community_data=false&developer_data=z&x_cg_demo_api_key=CG-YjubLmYWNnUaSJ1dArGTLS2D`;



export const TrendingCoins = (currency) =>
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=5&page=1&sparkline=true&x_cg_demo_api_key=CG-YjubLmYWNnUaSJ1dArGTLS2D`;



