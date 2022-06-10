import React from 'react'
import Coin from './Coin';

import { TableBody } from '@mui/material';

function TableBodyComp({
    coins,
    search,
    favourites,
    setFavourites,
    isLoading
}) {

    const saveToLocalStorage = (items) => {
        localStorage.setItem('react-coin-app-favourites', JSON.stringify(items));
    };

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
        saveToLocalStorage(newFavouriteList2)
    };

    return (
        <>
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
                                    isLoading={isLoading}
                                />
                            );
                        })
                        :
                        <img className="noResult" src="https://i.pinimg.com/originals/6f/95/d2/6f95d238b4251ac47ed830cea546aaf5.png" alt="no-results" />
                }

            </TableBody>
        </>
    )
}

export default TableBodyComp