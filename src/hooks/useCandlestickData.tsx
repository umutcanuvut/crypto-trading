import { useState, useEffect } from "react";
import { fetchHistoricalData } from "../api/fetchHistoricalData";
import { subscribeToKline } from "../api/klineSocket";
import { Candle, Kline } from "../types";
import { processKlineData } from "../utils/processKlineData";

const useCandlestickData = (timeframe: string) => {
  const [series, setSeries] = useState<{ data: Candle[] }[]>([]);

  useEffect(() => {
    let unsubscribe: () => void;

    const fetchData = async () => {
      const historicalData = await fetchHistoricalData(timeframe);
      setSeries([{ data: historicalData }]);
    };

    const handleKlineUpdate = (kline: Kline) => {
      setSeries((prevSeries) => {
        const newData = [...prevSeries[0].data];
        const newCandle = processKlineData(kline);
        const lastCandle = newData[newData.length - 1];
        if (lastCandle && lastCandle.x.getTime() === newCandle.x.getTime()) {
          newData[newData.length - 1] = newCandle;
        } else {
          newData.push(newCandle);
          if (newData.length > 24) {
            newData.shift();
          }
        }
        return [{ data: newData }];
      });
    };

    fetchData().then(() => {
      unsubscribe = subscribeToKline("BTCUSDT", timeframe, handleKlineUpdate);
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [timeframe]);

  return series;
};

export default useCandlestickData;