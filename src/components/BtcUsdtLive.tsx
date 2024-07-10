import React, { useEffect, useState } from "react";
import { subscribeToTicker } from "../api/aggTradeSocket";

const BtcUsdtLive: React.FC = () => {
  const [price, setPrice] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToTicker((data) => {
      setPrice(data.p);
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <div>
      <h2>BTC/USDT Live Price</h2>
      {price ? <p>{price}</p> : <p>Loading...</p>}
    </div>
  );
};

export default BtcUsdtLive;
