import React from "react";
import useTickerData from "../hooks/useTickerData";

interface LivePriceProps {
  pair: string;
}

const LivePrice: React.FC<LivePriceProps> = ({ pair }) => {
  const price = useTickerData(pair);

  return (
    <div>
      <h2>{pair} Live Price</h2>
      {price ? <p>{price}</p> : <p>Loading...</p>}
    </div>
  );
};

export default LivePrice;
