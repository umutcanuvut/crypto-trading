import { useEffect } from "react";
import useStore from "../store/useStore";
import { OrderBookEntry } from "../types";

const useOrderBookData = (pair: string) => {
  const setOrderBook = useStore((state) => state.setOrderBook);

  useEffect(() => {
    const formattedPair = pair.replace("/", "").toLowerCase();
    const url = `wss://stream.binance.com:9443/ws/${formattedPair}@depth10@1000ms`;
    const orderBookSocket = new WebSocket(url);

    console.log(`Connecting to Binance Order Book WebSocket for ${pair}`);

    orderBookSocket.onopen = () => {
      console.log(`Connected to Binance Order Book WebSocket for ${pair}`);
    };

    orderBookSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const sortedBids = data.bids
        .map((bid: string[]) => ({
          price: bid[0],
          quantity: bid[1],
          total: (parseFloat(bid[0]) * parseFloat(bid[1])).toFixed(2),
        }))
        .sort(
          (a: OrderBookEntry, b: OrderBookEntry) =>
            parseFloat(b.price) - parseFloat(a.price),
        );

      const sortedAsks = data.asks
        .map((ask: string[]) => ({
          price: ask[0],
          quantity: ask[1],
          total: (parseFloat(ask[0]) * parseFloat(ask[1])).toFixed(2),
        }))
        .sort(
          (a: OrderBookEntry, b: OrderBookEntry) =>
            parseFloat(b.price) - parseFloat(a.price),
        );

      setOrderBook({
        lastUpdateId: data.lastUpdateId,
        bids: sortedBids,
        asks: sortedAsks,
      });
    };

    orderBookSocket.onclose = () => {
      console.log(`Disconnected from Binance Order Book WebSocket for ${pair}`);
    };

    orderBookSocket.onerror = (error) => {
      console.error(`Order Book WebSocket error for ${pair}: `, error);
    };

    return () => {
      console.log(
        `Unsubscribing from Binance Order Book WebSocket for ${pair}`,
      );
      orderBookSocket.close();
      setOrderBook({
        lastUpdateId: 0,
        bids: [],
        asks: [],
      });
    };
  }, [pair, setOrderBook]);
};

export default useOrderBookData;
