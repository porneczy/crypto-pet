import React, { useEffect, useState } from "react";
import axios from "axios";
import Coin from "./components/Coin";
import AppBarComp from "./components/AppBarComp";

import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Paper,
    Button,
    setRef
} from "@mui/material";

function Page() {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("desc");
    const [favourites, setFavourites] = useState([]);

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

    const filteredCoins = coins.filter((coin) =>
        coin.name
            .toLowerCase()
            .includes(typeof search === "string" ? search.toLowerCase() : "")
    );

    const addFavouriteCoin = (coin) => {

        let newFavouriteList = []

        favourites.find(favourite => favourite.id === coin.id) ? newFavouriteList = [...favourites.filter(favourite => favourite.id !== coin.id)] : newFavouriteList = [...favourites, coin]

        let newFavouriteList2 = newFavouriteList.filter((c, index) => {
            return newFavouriteList.indexOf(c) === index
        })

        setFavourites(newFavouriteList2);
    };

    function sortCoins(sortProperty) {
        setCoins([
            ...coins.sort((a, b) =>
                sort === "desc"
                    ? b[sortProperty] - a[sortProperty]
                    : a[sortProperty] - b[sortProperty]
            ),
        ]);
        setSort(sort === "desc" ? "asc" : "desc");
    }


    return (
        <div className="tracker_app">
            <AppBarComp setSearch={setSearch} coins={coins} />


            <TableContainer
                component={Paper}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "100px",
                }}
            >
                <Table aria-label="collapsible table" sx={{ maxWidth: 1200 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Rank</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Symbol</TableCell>
                            <TableCell>
                                <Button
                                    variant="text"
                                    value="current_price"
                                    onClick={(e) => sortCoins(e.target.value)}
                                >
                                    Current Price</Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="text"
                                    value="price_change_percentage_24h"
                                    onClick={(e) => sortCoins(e.target.value)}
                                >
                                    Change 24h</Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="text"
                                    value="market_cap"
                                    onClick={(e) => sortCoins(e.target.value)}
                                >
                                    Marcet Cap</Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    onClick={() => setCoins(favourites)}
                                >
                                    Watch List</Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {
                            filteredCoins.length ?
                                filteredCoins.map((coin) => {
                                    return (
                                        <Coin
                                            coin={coin}
                                            key={coin.id}
                                            name={coin.name}
                                            image={coin.image}
                                            symbol={coin.symbol}
                                            currentPrice={coin.current_price}
                                            change24h={coin.price_change_percentage_24h}
                                            rank={coin.market_cap_rank}
                                            marketCap={coin.market_cap}
                                            id={coin.id}
                                            handleFavouritesClick={addFavouriteCoin}
                                            favourites={favourites}
                                        />
                                    );
                                })
                                :
                                <img className="noResult" src="https://i.pinimg.com/originals/6f/95/d2/6f95d238b4251ac47ed830cea546aaf5.png" alt="no-results" />
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Page;
