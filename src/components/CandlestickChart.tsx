import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { fetchHistoricalData } from "../utils/fetchHistoricalData";
import { subscribeToKline } from "../utils/klineSocket";
import { Candle, Kline } from "../types";

const CandlestickChart: React.FC = () => {
  const [series, setSeries] = useState<{ data: Candle[] }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const historicalData = await fetchHistoricalData();
      setSeries([{ data: historicalData }]);
    };

    const handleKlineUpdate = (kline: Kline) => {
      setSeries((prevSeries) => {
        const newData = [...prevSeries[0].data];
        const newCandle: Candle = {
          x: new Date(kline.t),
          y: [
            parseFloat(kline.o),
            parseFloat(kline.h),
            parseFloat(kline.l),
            parseFloat(kline.c),
          ],
        };
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
      const unsubscribe = subscribeToKline("BTCUSDT", "1m", handleKlineUpdate);
      return () => {
        unsubscribe();
      };
    });
  }, []);

  const options = {
    chart: {
      type: "candlestick" as const,
      offsetX: -10,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    title: {
      text: "BTC/USDT Candlestick Chart",
      align: "left" as const,
    },
    xaxis: {
      type: "datetime" as const,
    },
    yaxis: {
      labels: {
        offsetX: -6,
      },
    },
  };

  return (
    <ApexCharts
      options={options}
      series={series}
      type="candlestick"
      height={350}
    />
  );
};

export default CandlestickChart;
