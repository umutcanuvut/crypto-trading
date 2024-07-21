import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Currency } from "../utils/formatPrice";

interface BalanceState {
  balances: Record<Currency, number>;
  setBalance: (currency: Currency, amount: number) => void;
  resetBalances: () => void;
}

const useBalanceStore = create<BalanceState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "balances-storage",
      partialize: (state) => ({ balances: state.balances }),
    },
  ),
);

export default useBalanceStore;
