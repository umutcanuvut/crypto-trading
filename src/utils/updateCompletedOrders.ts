import { Order, OrderBookData } from "../types";
import { checkOrderCompletion } from "./checkOrderCompletion";
import useBalanceStore from "../store/useBalanceStore";

export const updateCompletedOrders = (
  orderHistory: Order[],
  orderBooks: Record<string, OrderBookData>,
  setOrderHistory: (orders: Order[]) => void,
) => {
  const { balances, setBalance } = useBalanceStore.getState();

  const completedOrders = checkOrderCompletion(orderHistory, orderBooks);

  completedOrders.forEach((completedOrder) => {
    const priceValue = parseFloat(completedOrder.price);
    const amountValue = parseFloat(completedOrder.amount);

    if (completedOrder.type === "Buy") {
      setBalance(
        completedOrder.amountUnit,
        balances[completedOrder.amountUnit] + amountValue,
      );
    } else if (completedOrder.type === "Sell") {
      setBalance(
        completedOrder.priceUnit,
        balances[completedOrder.priceUnit] + priceValue * amountValue,
      );
    }
  });

  const updatedOrderHistory = orderHistory.map(
    (order) =>
      completedOrders.find(
        (completedOrder) => completedOrder.id === order.id,
      ) || order,
  );

  setOrderHistory(updatedOrderHistory);
};
