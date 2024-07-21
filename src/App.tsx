import CandlestickChart from "./components/CandlestickChart";
import LivePrice from "./components/LivePrice";
import OrderBook from "./components/OrderBook";
import CreateOrder from "./components/createOrder/CreateOrder";
import BalanceInfo from "./components/BalanceInfo";
import OrderHistory from "./components/OrderHistory";
import SelectPair from "./components/SelectPair";

const App = () => {
  return (
    <div className="bg-gray-900 text-white">
      <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col py-4">
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="mb-4 text-3xl font-bold text-white">
              Crypto Trading Simulator
            </h1>
            <SelectPair />
            <LivePrice />
          </div>
          <BalanceInfo />
        </div>
        <div className="flex flex-row gap-7">
          <div className="mt-6 flex w-full max-w-4xl flex-col space-y-8">
            <CandlestickChart />
            <CreateOrder />
          </div>
          <div className="mt-6 w-full max-w-4xl">
            <OrderBook />
          </div>
        </div>
        <OrderHistory />
      </div>
    </div>
  );
};

export default App;
