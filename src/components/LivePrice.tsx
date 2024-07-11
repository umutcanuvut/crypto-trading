import React from "react";
import useTickerData from "../hooks/useTickerData";

interface LivePriceProps {
  pair: string;
}

const LivePrice: React.FC<LivePriceProps> = ({ pair }) => {
  const price = useTickerData(pair);

  return (
    <div className="w-[250px] rounded-lg border border-gray-700 bg-gray-800 p-4 text-white shadow-md">
      <h2 className="mb-2 text-xl font-semibold">{pair}</h2>
      {price ? (
        <p className="text-2xl font-bold">{price}</p>
      ) : (
        <p className="text-2xl">Loading...</p>
      )}
    </div>
  );
};

export default LivePrice;
