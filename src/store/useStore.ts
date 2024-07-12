import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Order {
  id: number;
  type: "Buy" | "Sell";
  orderType: "Limit" | "Market";
  price: string;
  amount: string;
  priceUnit: string;
  amountUnit: string;
  orderCreationDate: string;
  orderCompleteDate: string | null;
  status: "Pending" | "Cancelled" | "Completed";
}

interface AppState {
  selectedPair: string;
  setSelectedPair: (pair: string) => void;
  selectedBuyPriceFromOrderBook: number | null;
  setSelectedBuyPriceFromOrderBook: (price: number | null) => void;
  selectedSellPriceFromOrderBook: number | null;
  setSelectedSellPriceFromOrderBook: (price: number | null) => void;
  balances: {
    USDT: number;
    BTC: number;
    ETH: number;
    LTC: number;
    XRP: number;
  };
  setBalance: (currency: keyof AppState["balances"], amount: number) => void;
  resetBalances: () => void;
  orderHistory: Order[];
  addOrder: (order: Order) => void;
  cancelOrder: (id: number) => void;
  clearOrderHistory: () => void;
}

const useStore = create<AppState>()(
  persist(
    (set) => ({
      selectedPair: "BTC/USDT",
      setSelectedPair: (pair) => set({ selectedPair: pair }),
      selectedBuyPriceFromOrderBook: null,
      setSelectedBuyPriceFromOrderBook: (price) =>
        set({ selectedBuyPriceFromOrderBook: price }),
      selectedSellPriceFromOrderBook: null,
      setSelectedSellPriceFromOrderBook: (price) =>
        set({ selectedSellPriceFromOrderBook: price }),
      balances: {
        USDT: 0,
        BTC: 0,
        ETH: 0,
        LTC: 0,
        XRP: 0,
      },
      setBalance: (currency, amount) =>
        set((state) => ({
          balances: {
            ...state.balances,
            [currency]: amount,
          },
        })),
      resetBalances: () =>
        set({
          balances: {
            USDT: 0,
            BTC: 0,
            ETH: 0,
            LTC: 0,
            XRP: 0,
          },
        }),
      orderHistory: [],
      clearOrderHistory: () =>
        set({
          orderHistory: [],
        }),
      addOrder: (order) =>
        set((state) => ({
          orderHistory: [...state.orderHistory, order],
        })),
      cancelOrder: (id) =>
        set((state) => ({
          orderHistory: state.orderHistory.map((order) =>
            order.id === id ? { ...order, status: "Cancelled" } : order,
          ),
        })),
    }),
    {
      name: "crypto-trading-simulator",
      partialize: (state) => ({
        balances: state.balances,
        orderHistory: state.orderHistory,
      }),
    },
  ),
);

export default useStore;
