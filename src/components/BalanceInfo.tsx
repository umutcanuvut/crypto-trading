import React, { useState } from "react";

const BalanceInfo: React.FC = () => {
  const [initialBalance, setInitialBalance] = useState("");
  const [confirmedBalance, setConfirmedBalance] = useState("0.0000");

  const handleConfirm = () => {
    setConfirmedBalance(initialBalance);
  };

  const handleReset = () => {
    setInitialBalance("");
    setConfirmedBalance("0.0000");
  };

  return (
    <div className="flex w-[400px] space-x-8 rounded-lg border border-gray-700 bg-gray-800 p-4 text-white shadow-md">
      <div className="flex w-1/2 flex-col">
        <label
          htmlFor="initialBalance"
          className="mb-2 text-lg font-semibold text-gray-300"
        >
          Set USDT Balance
        </label>
        <div className="relative flex items-center">
          <input
            type="number"
            id="initialBalance"
            value={initialBalance}
            onChange={(e) => setInitialBalance(e.target.value)}
            className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 pr-16 text-white focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
          <span className="absolute right-3 text-gray-300">USDT</span>
        </div>
        <button
          onClick={handleConfirm}
          className="mt-4 w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
        >
          Confirm
        </button>
        <button
          onClick={handleReset}
          className="mt-2 w-full rounded bg-red-500 py-2 text-white hover:bg-red-600"
        >
          Reset
        </button>
      </div>

      <div className="flex w-1/2 flex-col space-y-2">
        <h3 className="text-lg font-semibold text-gray-300">Balance Info</h3>
        <div className="flex justify-between">
          <span>USDT:</span>
          <span>{confirmedBalance}</span>
        </div>
        <div className="flex justify-between">
          <span>BTC:</span>
          <span>0.0000</span>
        </div>
        <div className="flex justify-between">
          <span>ETH:</span>
          <span>0.0000</span>
        </div>
        <div className="flex justify-between">
          <span>LTC:</span>
          <span>0.0000</span>
        </div>
        <div className="flex justify-between">
          <span>XRP:</span>
          <span>0.0000</span>
        </div>
      </div>
    </div>
  );
};

export default BalanceInfo;
