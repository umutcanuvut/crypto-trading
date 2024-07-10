// src/utils/socket.ts
interface AggTrade {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  a: number; // Aggregate trade ID
  p: string; // Price
  q: string; // Quantity
  f: number; // First trade ID
  l: number; // Last trade ID
  T: number; // Trade time
  m: boolean; // Is the buyer the market maker?
  M: boolean; // Ignore
}

const socket = new WebSocket(
  "wss://stream.binance.com:9443/ws/btcusdt@aggTrade",
);

socket.onopen = () => {
  console.log("Connected to Binance WebSocket");
};

socket.onclose = () => {
  console.log("Disconnected from Binance WebSocket");
};

export const subscribeToTicker = (callback: (data: AggTrade) => void) => {
  socket.onmessage = (event) => {
    const trade: AggTrade = JSON.parse(event.data);
    callback(trade);
  };
};

export default socket;
