import "./App.css";
import TradingSignals from "./components/tradingSignals";
import HistoricalData from "./components/historical";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="historical">
          <HistoricalData symbol="ethereum" vsCurrency="eur" days={1} />
        </div>
        <div className="tradingSignals">
          <TradingSignals symbol="ETH" />
        </div>
      </header>
    </div>
  );
}

export default App;
