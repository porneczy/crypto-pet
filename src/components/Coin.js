import React from 'react'

function Coin({
    name,
    image,
    symbol,
    currentPrice,
    change24h,
    rank,
    marketCap
}) {
    return (
        <div className='coinContainer'>
            <p className="rank">{rank}</p>
            <img src={image} alt="coin" />
            <h1>{name}</h1>
            <p className="symbol">{symbol}</p>
            <p className="price">{currentPrice} $</p>
            <p className="percent">
                {change24h}%
            </p>
            <p className="marketcap">
                Market Cap: {marketCap.toLocaleString()} $
            </p>
        </div>
    )
}

export default Coin