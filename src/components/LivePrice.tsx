import React from "react";
import useTickerData from "../hooks/useTickerData";
import formatPrice from "../utils/formatPrice";

interface LivePriceProps {
  pair: string;
}

const LivePrice: React.FC<LivePriceProps> = ({ pair }) => {
  const price = useTickerData(pair);

  const quoteCurrency = pair.split("/")[1] as
    | "USDT"
    | "BTC"
    | "ETH"
    | "LTC"
    | "XRP";

  return (
    <div className="w-[250px] rounded-lg border border-gray-700 bg-gray-800 p-4 text-white shadow-md">
      <h2 className="mb-2 text-xl font-semibold">{pair}</h2>
      {price ? (
        <p className="text-2xl font-bold">
          {formatPrice(quoteCurrency, parseFloat(price))} {quoteCurrency}
        </p>
      ) : (
        <p className="text-2xl">Loading...</p>
      )}
    </div>
  );
};

export default LivePrice;
