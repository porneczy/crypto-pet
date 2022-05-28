import React, { useEffect, useState } from "react";
import axios from "axios";
import Coin from "./components/Coin";
import { Autocomplete, TextField, Button } from '@mui/material';

function Page() {

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");
    const [value, setValue] = useState("");
    const [sort, setSort] = useState("desc");

    const [coin, setCoin] = useState(coins[0]);
    

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

    

    const changeHandler = value => {
        setSearch(value)
    };

    const filteredCoins = coins.filter((coin) =>
        coin.name.toLowerCase().includes(typeof search === 'string' ? search.toLowerCase() : '')
    );

    function sortCoinsByMarcetCap() {
        setCoins([...coins.sort((a, b) => sort === "desc" ? b.market_cap - a.market_cap : a.market_cap - b.market_cap)])
        setSort(sort === "desc" ? "asc" : "desc")
    }
    function sortCoinsBy24hChange() {
        setCoins([...coins.sort((a, b) => sort === "desc" ? b.price_change_percentage_24h - a.price_change_percentage_24h : a.price_change_percentage_24h - b.price_change_percentage_24h)])
        setSort(sort === "desc" ? "asc" : "desc")
    }


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
            <Button variant="contained" onClick={sortCoinsByMarcetCap}>sort by marcet cap</Button>
            <Button variant="contained" onClick={sortCoinsBy24hChange}>sort by 24h change</Button>
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