import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const HistoricalData = ({ symbol, vsCurrency, days }) => {
  const [historicalData, setHistoricalData] = useState(null);
  const apiURL = `https://api.coingecko.com/api/v3/coins/${symbol}/market_chart?vs_currency=${vsCurrency}&days=${days}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiURL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setHistoricalData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Clean-up function
    return () => {
      // Any clean-up code here, if necessary
    };
  }, [apiURL, days, symbol, vsCurrency]);

  return (
    <div>
      <h2>Historical Data for {symbol}</h2>
      {historicalData && (
        <div className="graph">
          <LineChart
            width={800}
            height={400}
            data={historicalData.prices}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="0"
              type="number"
              domain={["dataMin", "dataMax"]}
              tickFormatter={(timestamp) => {
                const date = new Date(timestamp);
                const day = date.toLocaleDateString();
                const time = date.toLocaleTimeString(undefined, {
                  hour: "numeric",
                  minute: "2-digit",
                });
                return `${day} ${time}`;
              }}
            />
            <YAxis domain={[2650, 2750]} dy={-10} />
            <Tooltip
              labelFormatter={(timestamp) =>
                new Date(timestamp).toLocaleString()
              }
            />
            <Legend />
            <Line type="monotone" dataKey="1" stroke="#8884d8" dot={false} />
          </LineChart>
        </div>
      )}
    </div>
  );
};

export default HistoricalData;
