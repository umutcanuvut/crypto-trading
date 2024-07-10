interface Candle {
  x: Date;
  y: [number, number, number, number]; // [open, high, low, close]
}

type BinanceCandle = [
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

export const fetchHistoricalData = async (): Promise<Candle[]> => {
  const response = await fetch(
    "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=24",
  );
  const data: BinanceCandle[] = await response.json();
  return data.map((candle) => ({
    x: new Date(candle[0]),
    y: [
      parseFloat(candle[1]),
      parseFloat(candle[2]),
      parseFloat(candle[3]),
      parseFloat(candle[4]),
    ],
  }));
};
