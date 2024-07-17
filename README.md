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

## Order Completion Check

In this project, the order completion logic is handled on the frontend using a utility function. Every time a new order is added or the order book data changes, this function is invoked to check for matching orders. This approach is used for simplicity and immediate feedback within the application.

**Frontend Approach**:
- **Utility Function**: Checks for matching orders whenever a new order is added or order book data changes.
- **Advantages**: Simple to implement and provides real-time feedback.
- **Disadvantages**: Not scalable, can lead to performance issues, and lacks reliability for a large-scale application.

**Real-World Implementation**:
In a real-world scenario, order completion should be handled on the backend to ensure scalability, performance, and reliability. Here's how it can be implemented:

1. **Order Management Service**: A dedicated backend service for managing orders.
2. **Message Queue (e.g., RabbitMQ)**: To handle high throughput of order messages and decouple processing logic.
3. **Database**: For reliable storage of orders and order book data.
4. **WebSocket**: To push real-time updates to the frontend.

**Workflow**:
1. User places an order via the frontend.
2. The order is sent to the backend and published to a message queue.
3. The order management service processes orders from the queue and matches them.
4. Order statuses and balances are updated in the database.
5. Real-time updates are sent to the frontend via WebSocket.

This approach ensures that the system can handle a large number of concurrent users and orders efficiently while maintaining consistency and reliability.
