import React, { useState, useEffect } from "react";

const TradingSignals = ({ symbol }) => {
  const [sentiment, setSentiment] = useState(null);
  const apiURL =
    "https://min-api.cryptocompare.com/data/tradingsignals/intotheblock/latest";
  const apiKey =
    "7087ceecd90e32a613ed79e18a42278a138abe92ecb53b9dfd966e7a2c60a620";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiURL}?fsym=${symbol}`, {
          headers: {
            Authorization: `Apikey ${apiKey}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const sentiment = data?.Data?.addressesNetGrowth?.sentiment;
        setSentiment(sentiment);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiURL, apiKey]);

  let message = "";
  if (sentiment === "bearish") {
    message =
      'Based on the "addresses net growth" parameter, in the last 24h the price for this currency is rated as bearish, which means it is predicted to fall.';
  } else if (sentiment === "bullish") {
    message =
      'Based on the "addresses net growth" parameter, in the last 24h the price for this currency is rated as bullish, which means it is predicted to rise.';
  } else if (sentiment === "neutral") {
    message =
      'Based on the "addresses net growth" parameter, in the last 24h the price for this currency is rated as neutral, which means it is predicted to stay stagnant.';
  } else {
    message = "Sentiment data not available.";
  }

  return (
    <div>
      <h2 id="prediction">Prediction</h2>
      <p>{message}</p>
    </div>
  );
};

export default TradingSignals;
