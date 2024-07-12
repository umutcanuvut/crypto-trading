import React from "react";
import useOrderBookData from "../hooks/useOrderBookData";
import formatPrice from "../utils/formatPrice";

interface OrderBookProps {
  pair: string;
}

const OrderBook: React.FC<OrderBookProps> = ({ pair }) => {
  const orderBook = useOrderBookData(pair);

  const [baseCurrency, quoteCurrency] = pair.split("/") as [
    "USDT" | "BTC" | "ETH" | "LTC" | "XRP",
    "USDT" | "BTC" | "ETH" | "LTC" | "XRP",
  ];

  return (
    <div className="w-[400px] rounded-lg border border-gray-700 bg-gray-800 p-4 text-white shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">{pair} Order Book</h2>
      <div className="order-book">
        <div className="order-book-asks mb-8">
          <h3 className="mb-2 text-xl font-semibold">Asks</h3>
          <div className="overflow-hidden rounded-lg">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">
                    Price ({quoteCurrency})
                  </th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-300">
                    Amount ({baseCurrency})
                  </th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-300">
                    Total ({quoteCurrency})
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700 bg-gray-800">
                {orderBook.asks.map((ask, index) => (
                  <tr key={index} className="bg-red-900 hover:bg-red-700">
                    <td className="px-4 py-2 text-sm text-red-400">
                      {formatPrice(quoteCurrency, parseFloat(ask.price))}
                    </td>
                    <td className="px-4 py-2 text-right text-sm text-gray-300">
                      {formatPrice(baseCurrency, parseFloat(ask.quantity))}
                    </td>
                    <td className="px-4 py-2 text-right text-sm text-gray-300">
                      {formatPrice(quoteCurrency, parseFloat(ask.total))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="order-book-bids">
          <h3 className="mb-2 text-xl font-semibold">Bids</h3>
          <div className="overflow-hidden rounded-lg">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">
                    Price ({quoteCurrency})
                  </th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-300">
                    Amount ({baseCurrency})
                  </th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-300">
                    Total ({quoteCurrency})
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700 bg-gray-800">
                {orderBook.bids.map((bid, index) => (
                  <tr key={index} className="bg-green-900 hover:bg-green-700">
                    <td className="px-4 py-2 text-sm text-green-400">
                      {formatPrice(quoteCurrency, parseFloat(bid.price))}
                    </td>
                    <td className="px-4 py-2 text-right text-sm text-gray-300">
                      {formatPrice(baseCurrency, parseFloat(bid.quantity))}
                    </td>
                    <td className="px-4 py-2 text-right text-sm text-gray-300">
                      {formatPrice(quoteCurrency, parseFloat(bid.total))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
