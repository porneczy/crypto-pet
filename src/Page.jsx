import React, { useEffect, useState } from "react";

import axios from "axios";

import Coin from "./components/Coin";
import AppBarComp from "./components/AppBarComp";
import DrawerComp from "./components/DrawerComp";

import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Paper,
} from "@mui/material";

function Page() {
    const [coins, setCoins] = useState([]);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

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

    return (
        <div className="tracker_app">
            <AppBarComp setOpen={setOpen} />

            <DrawerComp
                open={open}
                setOpen={setOpen}
                setSearch={setSearch}
                coins={coins}
                setCoins={setCoins}
            />

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
                            <TableCell>Current Price</TableCell>
                            <TableCell>Change 24h</TableCell>
                            <TableCell>Market Cap</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
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
                                    id={coin.id}
                                />
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Page;
