import { useEffect, useState } from "react";

interface OrderBookEntry {
  price: string;
  quantity: string;
  total: string;
}

interface OrderBookData {
  lastUpdateId: number;
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
}

const useOrderBookData = (): OrderBookData => {
  const [orderBook, setOrderBook] = useState<OrderBookData>({
    lastUpdateId: 0,
    bids: [],
    asks: [],
  });

  useEffect(() => {
    const url = `wss://stream.binance.com:9443/ws/btcusdt@depth20@1000ms`;
    const orderBookSocket = new WebSocket(url);

    orderBookSocket.onopen = () => {
      console.log("Connected to Binance Order Book WebSocket");
    };

    orderBookSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setOrderBook({
        lastUpdateId: data.lastUpdateId,
        bids: data.bids.map((bid: string[]) => ({
          price: bid[0],
          quantity: bid[1],
          total: (parseFloat(bid[0]) * parseFloat(bid[1])).toFixed(2),
        })),
        asks: data.asks.map((ask: string[]) => ({
          price: ask[0],
          quantity: ask[1],
          total: (parseFloat(ask[0]) * parseFloat(ask[1])).toFixed(2),
        })),
      });
    };

    orderBookSocket.onclose = () => {
      console.log("Disconnected from Binance Order Book WebSocket");
    };

    orderBookSocket.onerror = (error) => {
      console.error("Order Book WebSocket error: ", error);
    };

    return () => {
      orderBookSocket.close();
    };
  }, []);

  return orderBook;
};

export default useOrderBookData;
