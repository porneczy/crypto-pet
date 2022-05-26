import React, { useEffect, useState } from "react";
import axios from "axios";
import Coin from "./components/Coin";

function Page() {

    const [coins, setCoins] = useState([]);

    useEffect(() => {
        axios
            .get(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
            )
            .then((response) => {
                setCoins(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    console.log(coins)

    return (
        <div className="tracker_app">
            <h1>Coin Tracker</h1>
            {coins.map((coin) => {
                return (
                    <Coin
                        key={coin.id}
                        name={coin.name}
                        image={coin.image}
                        symbol={coin.symbol}
                        currentPrice={coin.current_price}
                        change24h={coin.price_change_percentage_24h}
                        rank={coin.market_cap_rank}
                        marketCap={coin.market_cap}
                    />
                )

            })}

        </div>
    )
}

export default Page