import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Order, OrderBookData } from "../types";
import { Currency } from "../utils/formatPrice";
import { checkOrderCompletion } from "../utils/checkOrderCompletion";

interface AppState {
  selectedPair: string;
  setSelectedPair: (pair: string) => void;
  selectedBuyPriceFromOrderBook: number | null;
  setSelectedBuyPriceFromOrderBook: (price: number | null) => void;
  selectedSellPriceFromOrderBook: number | null;
  setSelectedSellPriceFromOrderBook: (price: number | null) => void;
  balances: Record<Currency, number>;
  setBalance: (currency: Currency, amount: number) => void;
  resetBalances: () => void;
  orderHistory: Order[];
  addOrder: (order: Order) => void;
  cancelOrder: (id: number) => void;
  clearOrderHistory: () => void;
  orderBook: OrderBookData;
  setOrderBook: (orderBook: OrderBookData) => void;
}

const useStore = create<AppState>()(
  persist(
    (set, get) => ({
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
      addOrder: (order) => {
        set((state) => ({
          orderHistory: [...state.orderHistory, order],
        }));

        if (order.orderType === "Limit") {
          const priceValue = parseFloat(order.price);
          const amountValue = parseFloat(order.amount);

          if (order.type === "Buy") {
            set((state) => ({
              balances: {
                ...state.balances,
                [order.priceUnit as Currency]:
                  state.balances[order.priceUnit as Currency] -
                  priceValue * amountValue,
              },
            }));
          } else if (order.type === "Sell") {
            set((state) => ({
              balances: {
                ...state.balances,
                [order.amountUnit as Currency]:
                  state.balances[order.amountUnit as Currency] - amountValue,
              },
            }));
          }
        }

        const completedOrders = checkOrderCompletion(
          get().orderHistory,
          get().orderBook,
        );
        set((state) => ({
          orderHistory: state.orderHistory.map((order) =>
            completedOrders.includes(order)
              ? {
                  ...order,
                  status: "Completed",
                  orderCompleteDate: new Date().toLocaleString("en-GB"),
                }
              : order,
          ),
        }));
      },
      cancelOrder: (id) => {
        set((state) => {
          const orderToCancel = state.orderHistory.find(
            (order) => order.id === id,
          );

          if (orderToCancel && orderToCancel.status === "Pending") {
            const priceValue = parseFloat(orderToCancel.price);
            const amountValue = parseFloat(orderToCancel.amount);

            if (orderToCancel.type === "Buy") {
              return {
                balances: {
                  ...state.balances,
                  [orderToCancel.priceUnit as Currency]:
                    state.balances[orderToCancel.priceUnit as Currency] +
                    priceValue * amountValue,
                },
                orderHistory: state.orderHistory.map((order) =>
                  order.id === id ? { ...order, status: "Cancelled" } : order,
                ),
              };
            } else if (orderToCancel.type === "Sell") {
              return {
                balances: {
                  ...state.balances,
                  [orderToCancel.amountUnit as Currency]:
                    state.balances[orderToCancel.amountUnit as Currency] +
                    amountValue,
                },
                orderHistory: state.orderHistory.map((order) =>
                  order.id === id ? { ...order, status: "Cancelled" } : order,
                ),
              };
            }
          }

          return {
            orderHistory: state.orderHistory.map((order) =>
              order.id === id ? { ...order, status: "Cancelled" } : order,
            ),
          };
        });
      },

      orderBook: {
        lastUpdateId: 0,
        bids: [],
        asks: [],
      },
      setOrderBook: (orderBook) => {
        set({
          orderBook,
        });
        const completedOrders = checkOrderCompletion(
          get().orderHistory,
          orderBook,
        );
        set((state) => ({
          orderHistory: state.orderHistory.map((order) =>
            completedOrders.includes(order)
              ? {
                  ...order,
                  status: "Completed",
                  orderCompleteDate: new Date().toLocaleString("en-GB"),
                }
              : order,
          ),
        }));
      },
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
