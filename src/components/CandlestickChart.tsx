import React from "react";
import ApexCharts from "react-apexcharts";
import useCandlestickData from "../hooks/useCandlestickData";

const CandlestickChart: React.FC = () => {
  const series = useCandlestickData();

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
