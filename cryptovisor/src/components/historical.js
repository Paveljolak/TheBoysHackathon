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

const HistoricalData = ({ vsCurrency, days, onChangeSymbol }) => {
  const [historicalData, setHistoricalData] = useState(null);
  const [changeSymbol, setChangeSymbol] = useState("bitcoin");
  const apiURL = `https://api.coingecko.com/api/v3/coins/${changeSymbol}/market_chart?vs_currency=${vsCurrency}&days=${days}`;

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
  }, [apiURL, days, vsCurrency, changeSymbol]);

  const handleSymbolChange = (event) => {
    const selectedSymbol = event.target.value;
    setChangeSymbol(selectedSymbol); // Update the symbol state
    onChangeSymbol(selectedSymbol); // Call the prop function to update symbol in App
  };

  return (
    <div>
      <h2 id="historical">
        Historical Data for {changeSymbol} for the last 24h
      </h2>
      {historicalData && (
        <div className="graph">
          <LineChart
            width={820}
            height={420}
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
            {changeSymbol === "bitcoin" && (
              <YAxis domain={[55000, 57500]} dy={-10} />
            )}
            {changeSymbol === "ethereum" && (
              <YAxis domain={[2650, 2750]} dy={-10} />
            )}
            <Tooltip
              labelFormatter={(timestamp) =>
                new Date(timestamp).toLocaleString()
              }
            />
            <Legend />
            {changeSymbol === "bitcoin" && (
              <Line
                type="monotone"
                dataKey="1"
                stroke="#FF5733"
                strokeWidth={2}
                dot={false}
                name={changeSymbol}
              />
            )}
            {changeSymbol === "ethereum" && (
              <Line
                type="monotone"
                dataKey="1"
                stroke="#7B68EE"
                strokeWidth={2}
                dot={false}
                name={changeSymbol}
              />
            )}
          </LineChart>
        </div>
      )}
      <div className="buttonSelection">
        <select value={changeSymbol} onChange={handleSymbolChange}>
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
        </select>
      </div>
    </div>
  );
};

export default HistoricalData;
