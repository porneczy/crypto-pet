import React, { useState } from "react";
import "./Coin.css";
import Chart from "./Chart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
    TableRow,
    TableCell,
    IconButton,
    Box,
    Collapse,
    Typography,
} from "@mui/material";

function Coin({
    name,
    image,
    symbol,
    currentPrice,
    change24h,
    rank,
    marketCap,
    id,
}) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                <TableCell component="th" scope="row">
                    {rank}
                </TableCell>
                <TableCell>
                    <img src={image} alt="coin" />
                    <b className="name">{name}</b>
                </TableCell>
                <TableCell>
                    <p className="symbol">{symbol}</p>
                </TableCell>
                <TableCell>{currentPrice} $</TableCell>
                <TableCell>
                    <p className={`${change24h < 0 ? "red" : "green"}`}>
                        {change24h.toFixed(2)}%
                    </p>
                </TableCell>

                <TableCell>{marketCap.toLocaleString()} $</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Chart
                            </Typography>

                            <Chart id={id} />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

export default Coin;
