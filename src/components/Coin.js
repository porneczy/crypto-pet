import React from 'react';
import "./Coin.css"
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
            <div className='coinRow'>
                <p className="rank">{rank}</p>
                <div className='coinColumnGroupName'>
                    <img src={image} alt="coin" />
                    <h2>{name}</h2>
                    <p className="symbol">{symbol}</p>
                </div>
                <div className='coinColumnGroupData'>
                    <p className="price">{currentPrice} $</p>
                    <p className="percent">
                        {change24h}%
                    </p>
                    <p className="marketcap">
                        Market Cap: {marketCap.toLocaleString()} $
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Coin