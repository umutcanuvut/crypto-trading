import React from "react";
import useTickerData from "../hooks/useTickerData";

const BtcUsdtLive: React.FC = () => {
  const price = useTickerData();

  return (
    <div>
      <h2>BTC/USDT Live Price</h2>
      {price ? <p>{price}</p> : <p>Loading...</p>}
    </div>
  );
};

export default BtcUsdtLive;
