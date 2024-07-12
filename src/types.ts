export interface Candle {
  x: Date;
  y: [number, number, number, number]; // [open, high, low, close]
}

export type BinanceCandle = [
  number, // Open time
  string, // Open price
  string, // High price
  string, // Low price
  string, // Close price
  string, // Volume
  number, // Close time
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
  string, // Ignore
];

export interface AggTrade {
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

export interface Kline {
  t: number; // Kline start time
  T: number; // Kline close time
  s: string; // Symbol
  i: string; // Interval
  f: number; // First trade ID
  L: number; // Last trade ID
  o: string; // Open price
  c: string; // Close price
  h: string; // High price
  l: string; // Low price
  v: string; // Base asset volume
  n: number; // Number of trades
  x: boolean; // Is this kline closed?
  q: string; // Quote asset volume
  V: string; // Taker buy base asset volume
  Q: string; // Taker buy quote asset volume
  B: string; // Ignore
}

export interface KlineMessage {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  k: Kline; // Kline data
}

export interface OrderBookEntry {
  price: string;
  quantity: string;
  total: string;
}

export interface OrderBookData {
  lastUpdateId: number;
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
}

export interface Order {
  id: number;
  type: "Buy" | "Sell";
  orderType: "Limit" | "Market";
  price: string;
  amount: string;
  priceUnit: string;
  amountUnit: string;
  orderCreationDate: string;
  orderCompleteDate: string | null;
  status: "Pending" | "Cancelled" | "Completed";
}
