import React, { useEffect, useState } from "react";
import axios from "axios";
import Coin from "./components/Coin";
import { Autocomplete, TextField } from '@mui/material';

function Page() {

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");
    const [value, setValue] = useState("");

    const [coin, setCoin] = useState(coins[0]);
    console.log(coin)

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

    /* console.log(coins) */

    const changeHandler = value => {
        setSearch(value);
        console.log(value)
    };

    const filteredCoins = coins.filter((coin) =>
        coin.name.toLowerCase().includes(typeof search === 'string' ? search.toLowerCase() : '')
    );


    return (
        <div className="tracker_app">
            <h1>Coin Tracker</h1>
            <Autocomplete
                id="outlined-basic"
                options={coins.map(coin => coin.name)}
                value={value}
                onChange={(event, value) => changeHandler(value)}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderInput={(params) =>
                    <TextField
                        onChange={e => changeHandler(e.target.value)}
                        {...params} label="coin name" />
                }
            />
            {filteredCoins.map((coin) => {
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