import { useEffect, useState } from "react";
import { AggTrade } from "../types";

const useTickerData = (pair: string): string | null => {
  const [price, setPrice] = useState<string | null>(null);

  useEffect(() => {
    setPrice(null);
    const formattedPair = pair.replace("/", "").toLowerCase();
    const url = `wss://stream.binance.com:9443/ws/${formattedPair}@aggTrade`;
    const tickerSocket = new WebSocket(url);

    tickerSocket.onopen = () => {
      console.log(`Connected to Binance Ticker WebSocket for ${pair}`);
    };

    tickerSocket.onmessage = (event) => {
      const trade: AggTrade = JSON.parse(event.data);
      setPrice(trade.p);
    };

    tickerSocket.onclose = () => {
      console.log(`Disconnected from Binance Ticker WebSocket for ${pair}`);
    };

    tickerSocket.onerror = (error) => {
      console.error(`Ticker WebSocket error for ${pair}: `, error);
    };

    return () => {
      console.log(`Unsubscribing from Binance Ticker WebSocket for ${pair}`);
      tickerSocket.close();
    };
  }, [pair]);

  return price;
};

export default useTickerData;
