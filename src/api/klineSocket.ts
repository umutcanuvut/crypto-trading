import { Kline, KlineMessage } from "../types";

export const subscribeToKline = (
  pair: string,
  interval: string,
  callback: (data: Kline) => void,
) => {
  const formattedPair = pair.replace("/", "").toLowerCase();
  const url = `wss://stream.binance.com:9443/ws/${formattedPair}@kline_${interval}`;
  const klineSocket = new WebSocket(url);

  klineSocket.onopen = () => {
    // console.log(`Connected to Binance ${pair} ${interval} Kline WebSocket`);
  };

  klineSocket.onmessage = (event) => {
    const message: KlineMessage = JSON.parse(event.data);
    if (message.e === "kline") {
      callback(message.k);
    }
  };

  klineSocket.onclose = () => {
    // console.log(
    //   `Disconnected from Binance ${pair} ${interval} Kline WebSocket`,
    // );
  };

  klineSocket.onerror = (error) => {
    console.error("Kline WebSocket error: ", error);
  };

  return () => {
    // console.log(
    //   `Unsubscribing from Binance ${pair} ${interval} Kline WebSocket`,
    // );
    klineSocket.close();
  };
};
