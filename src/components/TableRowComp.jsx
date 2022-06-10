import React from 'react'
import {
    TableRow,
    TableCell,
    Button
} from "@mui/material";

function TableRowComp({
    setCoins,
    coins,
    sortCoins,
    setSort,
    favourites,
    coinsBackup,
    sort
}) {

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
        <><TableRow>
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
                    onClick={() => coins === favourites ? setCoins(coinsBackup) : setCoins(favourites)}
                >
                    Watch List</Button>
            </TableCell>
        </TableRow></>
    )
}

export default TableRowComp