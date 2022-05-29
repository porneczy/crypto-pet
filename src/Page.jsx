import React, { useEffect, useState } from "react";
import axios from "axios";
import Coin from "./components/Coin";
import { Autocomplete, TextField, Button, AppBar, Toolbar, Typography, IconButton, Drawer, Divider } from '@mui/material';
import { styled, useTheme  } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';

function Page() {
    const theme = useTheme();

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");
    const [value, setValue] = useState("");
    const [sort, setSort] = useState("desc");
    const [open, setOpen] = useState(false);



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



    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    }));

    function sortCoinsByMarcetCap() {
        setCoins([...coins.sort((a, b) => sort === "desc" ? b.market_cap - a.market_cap : a.market_cap - b.market_cap)])
        setSort(sort === "desc" ? "asc" : "desc")
    }
    function sortCoinsBy24hChange() {
        setCoins([...coins.sort((a, b) => sort === "desc" ? b.price_change_percentage_24h - a.price_change_percentage_24h : a.price_change_percentage_24h - b.price_change_percentage_24h)])
        setSort(sort === "desc" ? "asc" : "desc")
    }
    function sortCoinsByCurrentPrice() {
        setCoins([...coins.sort((a, b) => sort === "desc" ? b.current_price - a.current_price : a.current_price - b.current_price)])
        setSort(sort === "desc" ? "asc" : "desc")
    }


    return (
        <div className="tracker_app">
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
                        Coin Tracker
                    </Typography>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerOpen}
                        sx={{ ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>



            <Drawer
                sx={{
                    width: 400,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 400,
                    },
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>

                <Autocomplete
                    sx={{ maxWidth: 400 }}
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
                <Divider />
                <Button 
                    variant="contained"
                    onClick={sortCoinsByMarcetCap}
                    sx={{maxWidth: 250, margin: 5}}
                >
                    sort by marcet cap
                </Button>
                <Divider />
                <Button 
                    variant="contained" 
                    onClick={sortCoinsBy24hChange}
                    sx={{maxWidth: 250, margin: 5}}
                >
                    sort by 24h change
                </Button>
                <Divider />
                <Button 
                    variant="contained" 
                    onClick={sortCoinsByCurrentPrice}
                    sx={{maxWidth: 250, margin: 5}}
                >
                    sort by Current Price
                </Button>
            </Drawer>






            <TableContainer component={Paper} sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "100px"
            }}>
                <Table aria-label="collapsible table" sx={{ maxWidth: 1200 }}>
                    <TableHead>
                        <TableRow >
                            <TableCell />
                            <TableCell >Rank</TableCell>
                            <TableCell >Name</TableCell>
                            <TableCell >Symbol</TableCell>
                            <TableCell >Current Price</TableCell>
                            <TableCell >
                                Change 24h
                            </TableCell>
                            <TableCell >Market Cap</TableCell>
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
                                />
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>





        </div>
    )
}

export default Page