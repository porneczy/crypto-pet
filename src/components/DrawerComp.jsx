import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
    Autocomplete,
    TextField,
    Button,
    IconButton,
    Drawer,
    Divider,
} from "@mui/material";

function DrawerComp({ open, setOpen, setSearch, coins, setCoins }) {
    const [sort, setSort] = useState("desc");
    const theme = useTheme();

    const DrawerHeader = styled("div")(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-start",
    }));

    function sortCoinsByMarcetCap() {
        setCoins([
            ...coins.sort((a, b) =>
                sort === "desc"
                    ? b.market_cap - a.market_cap
                    : a.market_cap - b.market_cap
            ),
        ]);
        setSort(sort === "desc" ? "asc" : "desc");
    }
    function sortCoinsBy24hChange() {
        setCoins([
            ...coins.sort((a, b) =>
                sort === "desc"
                    ? b.price_change_percentage_24h - a.price_change_percentage_24h
                    : a.price_change_percentage_24h - b.price_change_percentage_24h
            ),
        ]);
        setSort(sort === "desc" ? "asc" : "desc");
    }
    function sortCoinsByCurrentPrice() {
        setCoins([
            ...coins.sort((a, b) =>
                sort === "desc"
                    ? b.current_price - a.current_price
                    : a.current_price - b.current_price
            ),
        ]);
        setSort(sort === "desc" ? "asc" : "desc");
    }

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const changeHandler = (value) => {
        setSearch(value);
    };

    return (
        <Drawer
            sx={{
                width: 400,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: 400,
                },
            }}
            variant="persistent"
            anchor="right"
            open={open}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "rtl" ? (
                        <ChevronLeftIcon />
                    ) : (
                        <ChevronRightIcon />
                    )}
                </IconButton>
            </DrawerHeader>

            <Autocomplete
                sx={{ maxWidth: 400 }}
                id="outlined-basic"
                options={coins.map((coin) => coin.name)}
                onChange={(event, value) => changeHandler(value)}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderInput={(params) => (
                    <TextField
                        onChange={(e) => changeHandler(e.target.value)}
                        {...params}
                        label="coin name"
                    />
                )}
            />
            <Divider />
            <Button
                variant="contained"
                onClick={sortCoinsByMarcetCap}
                sx={{ maxWidth: 250, margin: 5 }}
            >
                sort by marcet cap
            </Button>
            <Divider />
            <Button
                variant="contained"
                onClick={sortCoinsBy24hChange}
                sx={{ maxWidth: 250, margin: 5 }}
            >
                sort by 24h change
            </Button>
            <Divider />
            <Button
                variant="contained"
                onClick={sortCoinsByCurrentPrice}
                sx={{ maxWidth: 250, margin: 5 }}
            >
                sort by Current Price
            </Button>
        </Drawer>
    );
}

export default DrawerComp;
