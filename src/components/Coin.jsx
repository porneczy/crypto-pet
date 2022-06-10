import React, { useState } from "react";
import "./Coin.css";
import Chart from "./Chart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import {
    TableRow,
    TableCell,
    IconButton,
    Box,
    Collapse,
    Typography,
    LinearProgress
} from "@mui/material";

function Coin({
    coin,
    name,
    image,
    symbol,
    currentPrice,
    change24h,
    rank,
    marketCap,
    id,
    handleFavouritesClick,
    favourites,
    isLoading
}) {
    const [open, setOpen] = useState(false);


    return (
        <>
            {isLoading ? (
                <LinearProgress sx={{ width: '60%', position: 'fixed' }} />
            ) : (
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
                        <TableCell>
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => handleFavouritesClick(coin)}
                            >
                                {favourites.findIndex(favourite => favourite.id === id) >= 0 ? <StarIcon /> : <StarBorderIcon />}
                            </IconButton>

                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0, border: 0 }} colSpan={6}>
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
            )
            }
        </>
    );
}

export default Coin;
