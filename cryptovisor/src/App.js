import "./App.css";
import React, { useState} from "react";
import TradingSignals from "./components/tradingSignals";
import HistoricalData from "./components/historical";
import CurrencyConverter from "./components/converter";

function App() {
  
  const [symbol, setSymbol] = useState("BTC");
  
  return (
      <div className="App">
      <header className="App-header">
        <div className="historical">
          <HistoricalData vsCurrency="eur" days={1} onChangeSymbol={setSymbol} />
        </div>
        <div className="tradingSignals">
        <TradingSignals symbol={symbol} />
        </div>
        <div className="converter">
          <CurrencyConverter />
        </div>
      </header>
    </div>
  );
}

export default App;
