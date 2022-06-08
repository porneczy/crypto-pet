import React from "react";
import { AppBar, Toolbar, Typography, Autocomplete, TextField } from "@mui/material";

const AppBarComp = ({ setSearch, coins }) => {

    const changeHandler = (value) => {
        setSearch(value);
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
                    Coin Tracker
                </Typography>

                <Autocomplete
                    sx={{ width: 400, backgroundColor: "#2196f3" }}
                    id="outlined-basic"
                    options={coins.map((coin) => coin.name)}
                    onChange={(event, value) => changeHandler(value)}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    renderInput={(params) => (
                        <TextField
                            onChange={(e) => changeHandler(e.target.value)}
                            {...params}
                            placeholder="Search…"
                        />
                    )}
                />

            </Toolbar>
        </AppBar>
    );
};

export default AppBarComp;
