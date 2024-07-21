import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Order } from "../types";
import { updateCompletedOrders } from "../utils/updateCompletedOrders";
import useOrderBookStore from "./useOrderBookStore";
import useBalanceStore from "./useBalanceStore";

interface OrderHistoryState {
  orderHistory: Order[];
  setOrderHistory: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  cancelOrder: (id: number) => void;
  clearOrderHistory: () => void;
}

const useOrderHistoryStore = create<OrderHistoryState>()(
  persist(
    (set, get) => ({
      orderHistory: [],
      setOrderHistory: (orders) => set({ orderHistory: orders }),
      clearOrderHistory: () => set({ orderHistory: [] }),
      addOrder: (order) => {
        set((state) => ({
          orderHistory: [...state.orderHistory, order],
        }));

        const { setBalance, balances } = useBalanceStore.getState();
        const { orderBooks } = useOrderBookStore.getState();

        const priceValue = parseFloat(order.price);
        const amountValue = parseFloat(order.amount);

        if (order.orderType === "Limit" && order.status === "Pending") {
          if (order.type === "Buy") {
            setBalance(
              order.priceUnit,
              balances[order.priceUnit] - priceValue * amountValue,
            );
          } else if (order.type === "Sell") {
            setBalance(
              order.amountUnit,
              balances[order.amountUnit] - amountValue,
            );
          }
        } else if (
          order.orderType === "Market" &&
          order.status === "Completed"
        ) {
          if (order.type === "Buy") {
            setBalance(
              order.priceUnit,
              balances[order.priceUnit] - priceValue * amountValue,
            );
            setBalance(
              order.amountUnit,
              balances[order.amountUnit] + amountValue,
            );
          } else if (order.type === "Sell") {
            setBalance(
              order.amountUnit,
              balances[order.amountUnit] - amountValue,
            );
            setBalance(
              order.priceUnit,
              balances[order.priceUnit] + priceValue * amountValue,
            );
          }
        }

        updateCompletedOrders(
          get().orderHistory,
          orderBooks,
          get().setOrderHistory,
        );
      },
      cancelOrder: (id) => {
        set((state) => {
          const orderToCancel = state.orderHistory.find(
            (order) => order.id === id,
          );

          if (orderToCancel && orderToCancel.status === "Pending") {
            const priceValue = parseFloat(orderToCancel.price);
            const amountValue = parseFloat(orderToCancel.amount);

            const { setBalance, balances } = useBalanceStore.getState();

            if (orderToCancel.type === "Buy") {
              setBalance(
                orderToCancel.priceUnit,
                balances[orderToCancel.priceUnit] + priceValue * amountValue,
              );
            } else if (orderToCancel.type === "Sell") {
              setBalance(
                orderToCancel.amountUnit,
                balances[orderToCancel.amountUnit] + amountValue,
              );
            }

            return {
              orderHistory: state.orderHistory.map((order) =>
                order.id === id ? { ...order, status: "Cancelled" } : order,
              ),
            };
          }

          return {
            orderHistory: state.orderHistory.map((order) =>
              order.id === id ? { ...order, status: "Cancelled" } : order,
            ),
          };
        });
      },
    }),
    {
      name: "order-history-storage",
      partialize: (state) => ({ orderHistory: state.orderHistory }),
    },
  ),
);

export default useOrderHistoryStore;
