import React, { useState, useEffect } from "react";
import axios from "axios";
import Plotly from "plotly.js-dist-min";

// https://itnext.io/how-to-make-a-basic-cryptocurrency-chart-app-with-near-real-time-updating-by-using-react-hooks-6a466529c2dc

function Chart({ id }) {
    const [isLoading, setIsLoading] = useState(true);
    const [latestPrice, setLatestPrice] = useState(0);

    useEffect(() => {
        axios
            .get(
                `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1&interval=1m`
            )
            .then((response) => {
                let dataa = { index: [], price: [], volumes: [] };

                for (const item of response.data.prices) {
                    dataa.index.push(item[0]);
                    dataa.price.push(item[1]);
                }
                for (const item of response.data.total_volumes) dataa.volumes.push(item[1]);

                setTimeout(() => {
                    setIsLoading(false)
                }, "1000")
                setTimeout(() => {
                    initChart(dataa)
                }, "1100")

                setLatestPrice(
                    parseFloat(dataa.price[dataa.price.length - 1]).toFixed(2)
                );
            })
        const timerID = setInterval(() => {
            axios
                .get(
                    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1&interval=1m`
                ).then((response) => {
                    let dataa = { index: [], price: [], volumes: [] };

                    for (const item of response.data.prices) {
                        dataa.index.push(item[0]);
                        dataa.price.push(item[1]);
                    }
                    for (const item of response.data.total_volumes) dataa.volumes.push(item[1]);

                    updateChart(dataa);
                    setLatestPrice(
                        parseFloat(dataa.price[dataa.price.length - 1]).toFixed(2)
                    );
                });
        }, 1000 * 30);
        return () => {
            clearInterval(timerID);
        };
    }, []);



    const initChart = (data) => {
        let trace_price = {
            name: "Price ($)",
            x: data.index.map((t) => new Date(t)),
            y: data.price,
            xaxis: "x",
            yaxis: "y1",
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue", size: 3 },
        };
        let trace_volumes = {
            name: "Volumne ($B)",
            x: data.index.map((t) => new Date(t)),
            y: data.volumes,
            xaxis: "x",
            yaxis: "y2",
            type: "bar",
            barmode: "relative",
            marker: {
                color: "rgb(49,130,189)",
                opacity: 0.7,
            },
        };
        let layout = {
            autosize: true,
            dragmode: "select",
            height: "100%",
            margin: {
                l: 50,
                r: 20,
                t: 35,
                pad: 3,
            },
            showlegend: false,
            xaxis: {
                domain: [1, 1],
                anchor: "y2",
            },
            yaxis: {
                domain: [0.1, 1],
                anchor: "x",
            },
            yaxis2: {
                showticklabels: false,
                domain: [0, 0.1],
                anchor: "x",
            },
            grid: {
                roworder: "bottom to top",
            },
        };
        let config = { responsive: true };
        let series = [trace_price, trace_volumes];
        Plotly.newPlot(`chart${id}`, series, layout, config);
    };

    const updateChart = (data) => {
        document.querySelector(`#${id}`).classList.remove("animate__fadeIn");
        let trace_price = {
            x: [data.index.map((t) => new Date(t))],
            y: [data.price],
        };
        let trace_volumes = {
            x: [data.index.map((t) => new Date(t))],
            y: [data.volumes],
        };

        Plotly.update(`chart${id}`, trace_price, {}, 0);
        Plotly.update(`chart${id}`, trace_volumes, {}, 1);
        document.querySelector(`#${id}`).classList.add("animate__fadeIn");
    };

    return (
        <div className="px-3 mt-1">
            {isLoading ? (
                <h6 className="value animate__animated animate__flash animate__slow text-center text-primary">
                    {" "}
                    loading ...
                </h6>
            ) : (
                <>
                    <h2 id={id} className="text-center text-primary animate__animated">
                        $ {latestPrice}
                    </h2>
                    <div id={`chart${id}`} className="p-0 m-0"></div>
                </>
            )}
        </div>
    );
}

export default Chart;
