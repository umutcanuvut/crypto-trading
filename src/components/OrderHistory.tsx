import React from "react";
import useStore from "../store/useStore";
import { format } from "date-fns";
import formatPrice, { Currency } from "../utils/formatPrice";

const OrderHistory: React.FC = () => {
  const orderHistory = useStore((state) => state.orderHistory);
  const cancelOrder = useStore((state) => state.cancelOrder);
  const clearOrderHistory = useStore((state) => state.clearOrderHistory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-500";
      case "Pending":
        return "text-yellow-500";
      case "Cancelled":
        return "text-red-500";
      default:
        return "text-gray-300";
    }
  };

  const formatDate = (date: string) => {
    return format(new Date(date), "dd/MM/yyyy HH:mm:ss");
  };

  const sortedOrderHistory = [...orderHistory].sort(
    (a, b) =>
      new Date(b.orderCreationDate).getTime() -
      new Date(a.orderCreationDate).getTime(),
  );

  return (
    <div className="mt-6 w-full rounded-lg border border-gray-700 bg-gray-800 p-4 text-white shadow-md">
      <div className="mb-2 flex flex-row justify-between">
        <h2 className="mb-4 text-2xl font-semibold">Order History</h2>
        <button
          className="rounded bg-red-500 px-2 text-xs text-white hover:bg-red-600"
          onClick={clearOrderHistory}
        >
          Clear Order History
        </button>
      </div>
      <div className="overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">
                Type
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">
                Order Type
              </th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-300">
                Price
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">
                Unit
              </th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-300">
                Amount
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">
                Unit
              </th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-300">
                Order Creation Date
              </th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-300">
                Order Complete Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700 bg-gray-800">
            {sortedOrderHistory.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="px-4 py-2 text-center text-sm text-gray-300"
                >
                  You don't have any orders. Start by creating an order.
                </td>
              </tr>
            ) : (
              sortedOrderHistory.map((order) => (
                <tr key={order.id} className="hover:bg-gray-700">
                  <td
                    className={`px-4 py-2 text-sm ${
                      order.type === "Buy" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {order.type}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-300">
                    {order.orderType}
                  </td>
                  <td className="px-4 py-2 text-right text-sm text-gray-300">
                    {formatPrice(
                      order.priceUnit as Currency,
                      parseFloat(order.price),
                    )}
                  </td>
                  <td className="px-4 py-2 text-left text-sm text-gray-300">
                    {order.priceUnit}
                  </td>
                  <td className="px-4 py-2 text-right text-sm text-gray-300">
                    {formatPrice(
                      order.amountUnit as Currency,
                      parseFloat(order.amount),
                    )}
                  </td>
                  <td className="px-4 py-2 text-left text-sm text-gray-300">
                    {order.amountUnit}
                  </td>
                  <td className="px-4 py-2 text-right text-sm text-gray-300">
                    {formatDate(order.orderCreationDate)}
                  </td>
                  <td className="px-4 py-2 text-right text-sm text-gray-300">
                    {order.orderCompleteDate
                      ? formatDate(order.orderCompleteDate)
                      : "N/A"}
                  </td>
                  <td
                    className={`px-4 py-2 text-sm ${getStatusColor(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-300">
                    {order.status === "Pending" && (
                      <button
                        className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                        onClick={() => cancelOrder(order.id)}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
