import { useState } from "react";
import CandlestickChart from "./components/CandlestickChart";
import LivePrice from "./components/LivePrice";
import OrderBook from "./components/OrderBook";

function App() {
  const [selectedPair, setSelectedPair] = useState("BTC/USDT");

  return (
    <div className="flex min-h-screen flex-col p-4">
      <h1 className="mb-4 text-3xl font-bold">Crypto Trading Simulator</h1>
      <div className="mb-4">
        <label htmlFor="pair" className="mr-2">
          Select Pair:
        </label>
        <select
          id="pair"
          value={selectedPair}
          onChange={(e) => setSelectedPair(e.target.value)}
        >
          <option value="BTC/USDT">BTC/USDT</option>
          <option value="ETH/BTC">ETH/BTC</option>
          <option value="LTC/USDT">LTC/USDT</option>
          <option value="XRP/USDT">XRP/USDT</option>
        </select>
      </div>
      <LivePrice pair={selectedPair} />
      <div className="flex flex-row">
        <div className="mt-6 w-full max-w-4xl p-0">
          <CandlestickChart pair={selectedPair} />
        </div>
        <div className="mt-6 w-full max-w-4xl p-0">
          <OrderBook pair={selectedPair} />
        </div>
      </div>
    </div>
  );
}

export default App;
