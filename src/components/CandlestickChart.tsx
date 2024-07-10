import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { fetchHistoricalData } from "../utils/fetchHistoricalData";

interface Candle {
  x: Date;
  y: [number, number, number, number];
}

const CandlestickChart: React.FC = () => {
  const [series, setSeries] = useState<{ data: Candle[] }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const historicalData = await fetchHistoricalData();
      setSeries([{ data: historicalData }]);
    };

    fetchData();
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
    // grid: {
    //   padding: {
    //     left: -10,
    //     right: 10,
    //   },
    // },
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
