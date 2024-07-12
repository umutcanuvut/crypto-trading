import { create } from "zustand";

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
}

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
}));

export default useStore;
