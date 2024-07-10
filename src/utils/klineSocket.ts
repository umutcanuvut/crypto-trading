import { Kline, KlineMessage } from "../types";

export const subscribeToKline = (
  symbol: string,
  interval: string,
  callback: (data: Kline) => void,
) => {
  const url = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`;
  const klineSocket = new WebSocket(url);

  klineSocket.onopen = () => {
    console.log(`Connected to Binance ${interval} Kline WebSocket`);
  };

  klineSocket.onmessage = (event) => {
    const message: KlineMessage = JSON.parse(event.data);
    if (message.e === "kline" && message.k.x) {
      callback(message.k);
    }
  };

  klineSocket.onclose = () => {
    console.log(`Disconnected from Binance ${interval} Kline WebSocket`);
  };

  klineSocket.onerror = (error) => {
    console.error("Kline WebSocket error: ", error);
  };

  return () => {
    klineSocket.close();
  };
};
