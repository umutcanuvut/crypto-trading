import React, { useEffect, useState } from "react";
import { subscribeToTicker } from "../utils/socket";

const BtcUsdtLive: React.FC = () => {
  const [price, setPrice] = useState<string | null>(null);

  useEffect(() => {
    subscribeToTicker((data: { p: string }) => {
      setPrice(data.p);
    });
  }, []);

  return (
    <div>
      <h2>BTC/USDT Live Price</h2>
      {price ? <p>{price}</p> : <p>Loading...</p>}
    </div>
  );
};

export default BtcUsdtLive;
