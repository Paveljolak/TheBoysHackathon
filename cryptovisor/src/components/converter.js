import React, { useState, useEffect } from "react";

const CurrencyConverter = () => {
  const [cryptoData, setCryptoData] = useState({});
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1); // Default amount to convert

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
  }, [selectedCrypto, selectedCurrency]); // Include selectedCurrency as a dependency

  const handleCryptoChange = (event) => {
    setSelectedCrypto(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    const newAmount = parseFloat(event.target.value);
    setAmount(newAmount);
  };

  return (
    <div className="converter-container">
      <h2>Currency Converter</h2>
      <div className="converteraha">
        <label htmlFor="crypto">Select Cryptocurrency: </label>
        <select
          id="crypto"
          value={selectedCrypto}
          onChange={handleCryptoChange}
        >
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
        <label htmlFor="currency">Select Currency to convert to:</label>
        <select
          id="currency"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        {/* Input field for specifying the amount */}
        <div className="amount">
          <label htmlFor="amount">Amount: </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        {/* Conversion result */}
        <h3>Conversion Result:</h3>
        <p>
          {amount} {selectedCrypto} = {cryptoData[selectedCurrency] * amount}{" "}
          {selectedCurrency}
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
