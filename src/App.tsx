import CandlestickChart from "./components/CandlestickChart";
import BtcUsdtLive from "./components/BtcUsdtLive";

function App() {
  return (
    <div className="flex min-h-screen flex-col p-4">
      <h1 className="mb-4 text-3xl font-bold">Crypto Trading Simulator</h1>
      <BtcUsdtLive />
      <div className="mt-6 w-full max-w-4xl p-0">
        <CandlestickChart />
      </div>
    </div>
  );
}

export default App;
