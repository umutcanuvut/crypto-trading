import { useState } from "react";
import CandlestickChart from "./components/CandlestickChart";
import LivePrice from "./components/LivePrice";
import OrderBook from "./components/OrderBook";
import CreateOrder from "./components/createOrder/CreateOrder";
import BalanceInfo from "./components/BalanceInfo";

function App() {
  const [selectedPair, setSelectedPair] = useState("BTC/USDT");

  return (
    <div className="bg-gray-900 text-white">
      <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col py-4">
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="mb-4 text-3xl font-bold text-white">
              Crypto Trading Simulator
            </h1>
            <div className="mb-4">
              <label htmlFor="pair" className="mr-2">
                Select Pair:
              </label>
              <select
                id="pair"
                value={selectedPair}
                onChange={(e) => setSelectedPair(e.target.value)}
                className="rounded-md border border-gray-600 bg-gray-700 p-2 text-white"
              >
                <option value="BTC/USDT">BTC/USDT</option>
                <option value="ETH/BTC">ETH/BTC</option>
                <option value="LTC/USDT">LTC/USDT</option>
                <option value="XRP/USDT">XRP/USDT</option>
              </select>
            </div>
            <LivePrice pair={selectedPair} />
          </div>
          <BalanceInfo />
        </div>
        <div className="flex flex-row gap-7">
          <div className="mt-6 flex w-full max-w-4xl flex-col space-y-8">
            <CandlestickChart pair={selectedPair} />
            <CreateOrder />
          </div>
          <div className="mt-6 w-full max-w-4xl">
            <OrderBook pair={selectedPair} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
