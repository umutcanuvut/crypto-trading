import React from "react";
import useOrderBookData from "../hooks/useOrderBookData";

interface OrderBookProps {
  pair: string;
}

const OrderBook: React.FC<OrderBookProps> = ({ pair }) => {
  const orderBook = useOrderBookData(pair);

  const [baseCurrency, quoteCurrency] = pair.split("/");

  return (
    <div>
      <h2>{pair} Order Book</h2>
      <div className="order-book">
        <div className="order-book-bids">
          <h3>Bids</h3>
          <table>
            <thead>
              <tr>
                <th>Price ({quoteCurrency})</th>
                <th>Amount ({baseCurrency})</th>
                <th>Total ({quoteCurrency})</th>
              </tr>
            </thead>
            <tbody>
              {orderBook.bids.map((bid, index) => (
                <tr key={index}>
                  <td>{bid.price}</td>
                  <td>{bid.quantity}</td>
                  <td>{bid.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="order-book-asks">
          <h3>Asks</h3>
          <table>
            <thead>
              <tr>
                <th>Price ({quoteCurrency})</th>
                <th>Amount ({baseCurrency})</th>
                <th>Total ({quoteCurrency})</th>
              </tr>
            </thead>
            <tbody>
              {orderBook.asks.map((ask, index) => (
                <tr key={index}>
                  <td>{ask.price}</td>
                  <td>{ask.quantity}</td>
                  <td>{ask.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
