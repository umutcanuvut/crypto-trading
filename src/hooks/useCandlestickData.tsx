import { useState, useEffect } from "react";
import { fetchHistoricalData } from "../api/fetchHistoricalData";
import { subscribeToKline } from "../api/klineSocket";
import { Candle, Kline } from "../types";
import { processKlineData } from "../utils/processKlineData";
import { DATA_LIMIT } from "../constants";

const useCandlestickData = (pair: string, timeframe: string) => {
  const [series, setSeries] = useState<{ data: Candle[] }[]>([]);

  useEffect(() => {
    let unsubscribe: () => void;

    const fetchData = async () => {
      const historicalData = await fetchHistoricalData(pair, timeframe);
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
          if (newData.length > DATA_LIMIT) {
            newData.shift();
          }
        }
        return [{ data: newData }];
      });
    };

    fetchData().then(() => {
      unsubscribe = subscribeToKline(pair, timeframe, handleKlineUpdate);
    });

    setSeries([{ data: [] }]);

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [pair, timeframe]);

  return series;
};

export default useCandlestickData;
