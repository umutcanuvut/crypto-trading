import React, { useState } from "react";
import ApexCharts from "react-apexcharts";
import useCandlestickData from "../hooks/useCandlestickData";

interface CandlestickChartProps {
  pair: string;
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ pair }) => {
  const [timeframe, setTimeframe] = useState("1m");
  const series = useCandlestickData(pair, timeframe);

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
      text: `${pair} Candlestick Chart (${timeframe})`,
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
    <div>
      <div>
        <label htmlFor="timeframe">Timeframe:</label>
        <select
          id="timeframe"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
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
      />
    </div>
  );
};

export default CandlestickChart;
