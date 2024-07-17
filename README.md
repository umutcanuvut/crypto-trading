# Crypto Trader Simulator

You can view the live application [here](https://crypto-trading-simulator.netlify.app/)

## Introduction

This project is a cryptocurrency trading simulator built with React, TypeScript, Zustand, and Tailwind CSS. It fetches live market data from the Binance API and allows users to place buy and sell orders for various cryptocurrency pairs. The application includes a live order book, balance management, and historical order tracking.

## Features

- Live market data for multiple cryptocurrency pairs.
- Order book display with real-time updates.
- Place limit and market buy/sell orders.
- Balance management for different cryptocurrencies.
- Historical order tracking.
- Responsive design with Tailwind CSS.
- State management with Zustand.

## Technology Stack

- **React**: Frontend library for building user interfaces.
- **TypeScript**: Superset of JavaScript for type safety.
- **Zustand**: State management library.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Binance API**: Source for live market data.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/umutcanuvut/crypto-trading.git
   cd crypto-trading
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

## File Structure

- **src**
  - **api**
    - `fetchHistoricalData.ts`: Fetches historical data for candlestick charts.
    - `klineSocket.ts`: Manages WebSocket connections for live candlestick data.
  - **components**
    - `BalanceInfo.tsx`: Displays user balance information.
    - `CandlestickChart.tsx`: Displays candlestick chart with live data.
    - `LivePrice.tsx`: Displays the live price of a selected cryptocurrency.
    - `OrderBook.tsx`: Displays the order book with buy and sell orders.
    - **createOrder**
      - `AmountInput.tsx`: Input component for order amount.
      - `AmountRange.tsx`: Slider component for selecting order amount.
      - `CreateOrder.tsx`: Main component for creating orders.
      - `OrderForm.tsx`: Form component for entering order details.
      - `OrderSection.tsx`: Section component for organizing order-related inputs.
      - `PriceInput.tsx`: Input component for order price.
    - `OrderHistory.tsx`: Displays historical orders.
  - **hooks**
    - `useCandlestickData.tsx`: Custom hook for managing candlestick data.
    - `useOrderBookData.tsx`: Custom hook for managing order book data.
    - `useOrderForm.tsx`: Custom hook for managing the order form state.
    - `useTickerData.tsx`: Custom hook for managing live ticker data.
  - **store**
    - `useStore.ts`: Zustand store for managing global state.
  - **utils**
    - `checkOrderCompletion.ts`: Utility function to check order completion.
    - `formatPrice.ts`: Utility function to format prices.
    - `processKlineData.ts`: Utility function to process candlestick data.
    - `validateBalance.ts`: Utility function to validate user balance.
  - `App.tsx`: Main application component.
  - `index.css`: Global CSS styles.
  - `main.tsx`: Entry point of the application.
  - `types.ts`: TypeScript type definitions.
