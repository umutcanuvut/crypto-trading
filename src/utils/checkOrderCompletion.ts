import { toast } from "react-toastify";
import { format } from "date-fns";
import { Order, OrderBookData } from "../types";

export const checkOrderCompletion = (
  pendingOrders: Order[],
  orderBooks: Record<string, OrderBookData>,
): Order[] => {
  const completedOrders: Order[] = [];

  pendingOrders.forEach((order) => {
    if (order.status === "Pending" && order.orderType === "Limit") {
      const price = parseFloat(order.price);
      const pair = `${order.amountUnit}/${order.priceUnit}`;

      const orderBook = orderBooks[pair];
      if (!orderBook) return;

      if (order.type === "Buy") {
        const matchingAsks = orderBook.asks.filter(
          (ask) => parseFloat(ask.price) <= price,
        );
        if (matchingAsks.length > 0) {
          const completedOrder: Order = {
            ...order,
            status: "Completed",
            orderCompleteDate: new Date().toISOString(),
          };
          completedOrders.push(completedOrder);
          toast.success(
            `Your ${completedOrder.type} Limit Order created at ${format(completedOrder.orderCreationDate, "dd/MM/yyyy HH:mm:ss")} is completed!`,
          );
        }
      } else if (order.type === "Sell") {
        const matchingBids = orderBook.bids.filter(
          (bid) => parseFloat(bid.price) >= price,
        );
        if (matchingBids.length > 0) {
          const completedOrder: Order = {
            ...order,
            status: "Completed",
            orderCompleteDate: new Date().toISOString(),
          };
          completedOrders.push(completedOrder);
          toast.success(
            `Your ${completedOrder.type} Limit Order created at ${format(completedOrder.orderCreationDate, "dd/MM/yyyy HH:mm:ss")} is completed!`,
          );
        }
      }
    }
  });

  return completedOrders;
};
