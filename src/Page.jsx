import React, { useEffect, useState } from "react";
import axios from "axios";

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
        </div>
    )
}

export default Page