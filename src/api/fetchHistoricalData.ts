import { Candle, BinanceCandle } from "../types";

export const fetchHistoricalData = async (
  timeframe: string,
): Promise<Candle[]> => {
  const response = await fetch(
    `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${timeframe}&limit=24`,
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
