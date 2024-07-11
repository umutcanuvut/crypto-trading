import { useEffect, useState } from "react";
import { AggTrade } from "../types";

const useTickerData = (): string | null => {
  const [price, setPrice] = useState<string | null>(null);

  useEffect(() => {
    const url = "wss://stream.binance.com:9443/ws/btcusdt@aggTrade";
    const tickerSocket = new WebSocket(url);

    tickerSocket.onopen = () => {
      console.log("Connected to Binance Ticker WebSocket");
    };

    tickerSocket.onmessage = (event) => {
      const trade: AggTrade = JSON.parse(event.data);
      setPrice(trade.p);
    };

    tickerSocket.onclose = () => {
      console.log("Disconnected from Binance Ticker WebSocket");
    };

    tickerSocket.onerror = (error) => {
      console.error("Ticker WebSocket error: ", error);
    };

    return () => {
      tickerSocket.close();
    };
  }, []);

  return price;
};

export default useTickerData;
