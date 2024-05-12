import React, { useState, useEffect } from "react";

const CurrencyConverter = () => {
  const [cryptoData, setCryptoData] = useState({});
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/price?fsym=${selectedCrypto}&tsyms=${selectedCurrency}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedCrypto]);

  const handleCryptoChange = (event) => {
    setSelectedCrypto(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  return (
    <div>
      <h2>Currency Converter</h2>
      <div>
        <label htmlFor="crypto">Select Cryptocurrency: </label>
        <select id="crypto" value={selectedCrypto} onChange={handleCryptoChange}>
          <option value="BTC">Bitcoin</option>
          <option value="ETH">Ethereum</option>
          <option value="USDC">USD Coin</option>
          <option value="SOL">Solana</option>
          <option value="PEPE">Pepe</option>
          <option value="DOGE">Dogecoin</option>
          <option value="FDUSD">First Digital USD</option>
          <option value="BNB">Binance Coin</option>
          <option value="XRP">XRP</option>
          <option value="WLD">Worldcoin</option>
        </select>
      </div>
      <div>
        <label htmlFor="currency">Select Currency: </label>
        <select id="currency" value={selectedCurrency} onChange={handleCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
      <div>
        <h3>Conversion Rate:</h3>
        <p>
          1 {selectedCrypto} = {cryptoData[selectedCurrency]} {selectedCurrency}
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
