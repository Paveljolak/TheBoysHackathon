import React, { useState, useEffect } from 'react';

const HistoricalData = ({ symbol, vsCurrency, days }) => {
  const [historicalData, setHistoricalData] = useState(null);
  const apiURL = `https://api.coingecko.com/api/v3/coins/${symbol}/market_chart`;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiURL}?vs_currency=${vsCurrency}&days=${days}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setHistoricalData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
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
      {historicalData ? (
        <pre>{JSON.stringify(historicalData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HistoricalData;
