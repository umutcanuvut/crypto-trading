import { create } from "zustand";
import { OrderBookData } from "../types";
import { updateCompletedOrders } from "../utils/updateCompletedOrders";
import useOrderHistoryStore from "./useOrderHistoryStore";

interface OrderBookState {
  orderBooks: Record<string, OrderBookData>;
  setOrderBook: (pair: string, orderBook: OrderBookData) => void;
  selectedBuyPriceFromOrderBook: number | null;
  setSelectedBuyPriceFromOrderBook: (price: number | null) => void;
  selectedSellPriceFromOrderBook: number | null;
  setSelectedSellPriceFromOrderBook: (price: number | null) => void;
}

const useOrderBookStore = create<OrderBookState>((set, get) => ({
  orderBooks: {
    "BTC/USDT": { lastUpdateId: 0, bids: [], asks: [] },
    "ETH/USDT": { lastUpdateId: 0, bids: [], asks: [] },
    "LTC/USDT": { lastUpdateId: 0, bids: [], asks: [] },
    "XRP/USDT": { lastUpdateId: 0, bids: [], asks: [] },
  },
  setOrderBook: (pair, orderBook) => {
    set((state) => ({
      orderBooks: {
        ...state.orderBooks,
        [pair]: orderBook,
      },
    }));

    const { orderHistory, setOrderHistory } = useOrderHistoryStore.getState();

    updateCompletedOrders(orderHistory, get().orderBooks, setOrderHistory);
  },
  selectedBuyPriceFromOrderBook: null,
  setSelectedBuyPriceFromOrderBook: (price) =>
    set({ selectedBuyPriceFromOrderBook: price }),
  selectedSellPriceFromOrderBook: null,
  setSelectedSellPriceFromOrderBook: (price) =>
    set({ selectedSellPriceFromOrderBook: price }),
}));

export default useOrderBookStore;
