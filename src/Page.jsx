import React, { useEffect, useState } from "react";
import axios from "axios";
import AppBarComp from "./components/AppBarComp";
import TableRowComp from "./components/TableRowComp";
import TableBodyComp from "./components/TableBodyComp";

import {
    Table,
    TableContainer,
    TableHead,
    Paper,
} from "@mui/material";

function Page() {
    const [coins, setCoins] = useState([]);
    const [coinsBackup, setCoinsBackup] = useState([])
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("desc");
    const [favourites, setFavourites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    setTimeout(() => {
        setIsLoading(false)
    }, "2000")

    useEffect(() => {
        axios
            .get(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
            )
            .then((response) => {
                setCoins(response.data);
                setCoinsBackup(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        const coinFavourites = JSON.parse(
            localStorage.getItem('react-coin-app-favourites')
        );
        coinFavourites ? setFavourites(coinFavourites) : setFavourites([]);
    }, []);

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

                        <TableRowComp
                            setCoins={setCoins}
                            coins={coins}
                            sort={sort}
                            setSort={setSort}
                            favourites={favourites}
                            coinsBackup={coinsBackup}
                        />

                    </TableHead>

                    <TableBodyComp
                        coins={coins}
                        search={search}
                        favourites={favourites}
                        setFavourites={setFavourites}
                        isLoading={isLoading}
                    />

                </Table>
            </TableContainer>
        </div>
    );
}

export default Page;
