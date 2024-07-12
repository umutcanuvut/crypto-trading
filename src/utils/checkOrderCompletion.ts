import { Order, OrderBookData } from "../types";

export const checkOrderCompletion = (
  pendingOrders: Order[],
  orderBook: OrderBookData,
): Order[] => {
  const completedOrders: Order[] = [];

  pendingOrders.forEach((order) => {
    if (order.status === "Pending" && order.orderType === "Limit") {
      const price = parseFloat(order.price);

      if (order.type === "Buy") {
        const matchingAsks = orderBook.asks.filter(
          (ask) => parseFloat(ask.price) <= price,
        );
        if (matchingAsks.length > 0) {
          order.status = "Completed";
          order.orderCompleteDate = new Date().toLocaleString("en-GB");
          completedOrders.push(order);
        }
      } else if (order.type === "Sell") {
        const matchingBids = orderBook.bids.filter(
          (bid) => parseFloat(bid.price) >= price,
        );
        if (matchingBids.length > 0) {
          order.status = "Completed";
          order.orderCompleteDate = new Date().toLocaleString("en-GB");
          completedOrders.push(order);
        }
      }
    }
  });

  return completedOrders;
};
