import { create } from "zustand";

interface Order {
  id: number;
  type: "Buy" | "Sell";
  orderType: "Limit" | "Market";
  price: string;
  priceUnit: string;
  amount: string;
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
}

const initialOrders: Order[] = [
  {
    id: 1,
    type: "Buy",
    orderType: "Limit",
    price: "50000.00",
    priceUnit: "USDT",
    amount: "0.1",
    amountUnit: "BTC",
    orderCreationDate: "01/01/2023 12:00:00",
    orderCompleteDate: "02/01/2023 12:00:00",
    status: "Completed",
  },
  {
    id: 2,
    type: "Sell",
    orderType: "Market",
    price: "51000.00",
    priceUnit: "USDT",
    amount: "0.05",
    amountUnit: "BTC",
    orderCreationDate: "05/01/2023 14:00:00",
    orderCompleteDate: "05/01/2023 14:30:00",
    status: "Pending",
  },
  {
    id: 3,
    type: "Buy",
    orderType: "Limit",
    price: "49500.00",
    priceUnit: "USDT",
    amount: "0.2",
    amountUnit: "BTC",
    orderCreationDate: "03/01/2023 09:00:00",
    orderCompleteDate: "03/01/2023 09:15:00",
    status: "Cancelled",
  },
];

const useStore = create<AppState>((set) => ({
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
  orderHistory: initialOrders,
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
}));

export default useStore;
