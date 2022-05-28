import React, { useState } from 'react';
import "./Coin.css";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Coin({
    name,
    image,
    symbol,
    currentPrice,
    change24h,
    rank,
    marketCap
}) {
    const [open, setOpen] = useState(false);
    return (
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
                <TableCell align="right"><img src={image} alt="coin" /></TableCell>
                <TableCell align="right"><b>{name}</b></TableCell>
                <TableCell align="right"><p className="symbol">{symbol}</p></TableCell>
                <TableCell align="right">{currentPrice}</TableCell>
                <TableCell align="right">{change24h}</TableCell>
                <TableCell align="right">{marketCap.toLocaleString()}</TableCell>
                
            </TableRow>
    )
}

export default Coin