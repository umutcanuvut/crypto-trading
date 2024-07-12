import React, { useState } from "react";
import ApexCharts from "react-apexcharts";
import useCandlestickData from "../hooks/useCandlestickData";
import formatPrice from "../utils/formatPrice";

interface CandlestickChartProps {
  pair: string;
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ pair }) => {
  const [timeframe, setTimeframe] = useState("1m");
  const series = useCandlestickData(pair, timeframe);

  const quoteCurrency = pair.split("/")[1] as
    | "USDT"
    | "BTC"
    | "ETH"
    | "LTC"
    | "XRP";

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
      background: "#1f2937",
      foreColor: "#e5e7eb",
    },
    title: {
      text: `${pair} Candlestick Chart (${timeframe})`,
      align: "left" as const,
      style: {
        color: "#e5e7eb",
      },
    },
    xaxis: {
      type: "datetime" as const,
      labels: {
        style: {
          colors: "#e5e7eb",
        },
      },
    },
    yaxis: {
      labels: {
        offsetX: -6,
        style: {
          colors: "#e5e7eb",
        },
        formatter: (value: number) => formatPrice(quoteCurrency, value), // Format y-axis labels
      },
    },
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "12px",
        backgroundColor: "#1f2937",
        color: "#e5e7eb",
      },
      onDatasetHover: {
        highlightDataSeries: true,
      },
      x: {
        show: false,
      },
    },
  };

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 text-white shadow-md">
      <div className="mb-4">
        <label
          htmlFor="timeframe"
          className="block text-sm font-medium text-gray-400"
        >
          Timeframe:
        </label>
        <select
          id="timeframe"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="mt-1 block w-fit rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        >
          <option value="1m">1m</option>
          <option value="5m">5m</option>
          <option value="15m">15m</option>
          <option value="1h">1h</option>
          <option value="12h">12h</option>
        </select>
      </div>
      <ApexCharts
        options={options}
        series={series}
        type="candlestick"
        height={350}
        width={820}
      />
    </div>
  );
};

export default CandlestickChart;
