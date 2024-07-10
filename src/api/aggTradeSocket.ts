import { AggTrade } from "../types";

const aggTradeSocket = new WebSocket(
  "wss://stream.binance.com:9443/ws/btcusdt@aggTrade",
);

aggTradeSocket.onopen = () => {
  console.log("Connected to Binance WebSocket");
};

aggTradeSocket.onclose = () => {
  console.log("Disconnected from Binance WebSocket");
};

export const subscribeToTicker = (callback: (data: AggTrade) => void) => {
  const messageHandler = (event: MessageEvent) => {
    const trade: AggTrade = JSON.parse(event.data);
    callback(trade);
  };

  aggTradeSocket.addEventListener("message", messageHandler);

  return () => {
    aggTradeSocket.removeEventListener("message", messageHandler);
  };
};

export default aggTradeSocket;
