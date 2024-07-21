import React, { useEffect } from "react";
import useOrderForm from "../../hooks/useOrderForm";
import PriceInput from "./PriceInput";
import AmountInput from "./AmountInput";
import AmountRange from "./AmountRange";
import useOrderBookStore from "../../store/useOrderBookStore";
import useOrderHistoryStore from "../../store/useOrderHistoryStore";

interface OrderSectionProps {
  type: "Buy" | "Sell";
  color: string;
  orderType: "Limit" | "Market";
}

const OrderSection: React.FC<OrderSectionProps> = ({
  type,
  color,
  orderType,
}) => {
  const {
    price,
    setPrice,
    amount,
    rangeValue,
    handleRangeChange,
    handleAmountChange,
    isBalanceValid,
    baseCurrency,
    quoteCurrency,
  } = useOrderForm(type, orderType);

  const selectedBuyPriceFromOrderBook = useOrderBookStore(
    (state) => state.selectedBuyPriceFromOrderBook,
  );
  const setSelectedBuyPriceFromOrderBook = useOrderBookStore(
    (state) => state.setSelectedBuyPriceFromOrderBook,
  );
  const selectedSellPriceFromOrderBook = useOrderBookStore(
    (state) => state.selectedSellPriceFromOrderBook,
  );
  const setSelectedSellPriceFromOrderBook = useOrderBookStore(
    (state) => state.setSelectedSellPriceFromOrderBook,
  );

  const orderBooks = useOrderBookStore((state) => state.orderBooks);
  const addOrder = useOrderHistoryStore((state) => state.addOrder);
  const pair = `${baseCurrency}/${quoteCurrency}`;
  const orderBook = orderBooks[pair];

  useEffect(() => {
    if (orderType === "Limit") {
      if (type === "Buy" && selectedBuyPriceFromOrderBook !== null) {
        setPrice(selectedBuyPriceFromOrderBook.toString());
      } else if (type === "Sell" && selectedSellPriceFromOrderBook !== null) {
        setPrice(selectedSellPriceFromOrderBook.toString());
      }
    } else if (orderType === "Market") {
      if (type === "Buy" && orderBook.asks.length > 0) {
        setPrice(orderBook.asks[orderBook.asks.length - 1].price);
      } else if (type === "Sell" && orderBook.bids.length > 0) {
        setPrice(orderBook.bids[0].price);
      }
    }
  }, [
    selectedBuyPriceFromOrderBook,
    selectedSellPriceFromOrderBook,
    orderBook,
    orderType,
    type,
    setPrice,
  ]);

  const handlePriceChange = (newPrice: string) => {
    setSelectedBuyPriceFromOrderBook(null);
    setSelectedSellPriceFromOrderBook(null);
    setPrice(newPrice);
  };

  const handleSubmit = () => {
    if (!isBalanceValid) return;

    const newOrder = {
      id: Date.now(),
      type,
      orderType,
      price,
      amount,
      priceUnit: quoteCurrency,
      amountUnit: baseCurrency,
      orderCreationDate: new Date().toISOString(),
      orderCompleteDate: orderType === "Market" ? new Date().toISOString() : "",
      status:
        orderType === "Market" ? ("Completed" as const) : ("Pending" as const),
    };

    addOrder(newOrder);
  };

  return (
    <div className="rounded bg-gray-800 p-4 text-white shadow-md">
      <h3 className="mb-4 text-lg font-semibold">{type}</h3>
      <PriceInput
        type={type}
        orderType={orderType}
        price={price}
        setPrice={handlePriceChange}
        quoteCurrency={quoteCurrency}
      />
      <AmountInput
        type={type}
        amount={amount}
        handleAmountChange={handleAmountChange}
        baseCurrency={baseCurrency}
      />
      <AmountRange
        rangeValue={rangeValue}
        handleRangeChange={handleRangeChange}
        disabled={!price}
      />
      <button
        className={`mt-4 w-full rounded py-2 text-white ${
          !isBalanceValid || parseFloat(amount) <= 0
            ? "cursor-not-allowed opacity-50"
            : "hover:opacity-75"
        } ${color}`}
        disabled={!isBalanceValid}
        onClick={handleSubmit}
      >
        {type} {orderType}
      </button>
      {!isBalanceValid && price && amount && (
        <div className="mt-2 text-sm text-red-500">Insufficient balance</div>
      )}
    </div>
  );
};

export default OrderSection;
