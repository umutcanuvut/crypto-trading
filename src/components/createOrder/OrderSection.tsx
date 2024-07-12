import React, { useEffect, useState } from "react";
import useOrderForm from "../../hooks/useOrderForm";
import PriceInput from "./PriceInput";
import AmountInput from "./AmountInput";
import AmountRange from "./AmountRange";
import useStore from "../../store/useStore";

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

  const selectedBuyPriceFromOrderBook = useStore(
    (state) => state.selectedBuyPriceFromOrderBook,
  );
  const selectedSellPriceFromOrderBook = useStore(
    (state) => state.selectedSellPriceFromOrderBook,
  );

  const orderBook = useStore((state) => state.orderBook);
  const addOrder = useStore((state) => state.addOrder);
  const setBalance = useStore((state) => state.setBalance);

  const [isUserSetPrice, setIsUserSetPrice] = useState(false);

  useEffect(() => {
    if (!isUserSetPrice) {
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
    }
  }, [
    selectedBuyPriceFromOrderBook,
    selectedSellPriceFromOrderBook,
    orderBook,
    orderType,
    type,
    setPrice,
    isUserSetPrice,
  ]);

  // Handle manual price changes
  const handlePriceChange = (newPrice: string) => {
    setIsUserSetPrice(true);
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
      orderCreationDate: new Date().toLocaleString("en-GB"),
      orderCompleteDate:
        orderType === "Market" ? new Date().toLocaleString("en-GB") : null,
      status:
        orderType === "Market" ? ("Completed" as const) : ("Pending" as const),
    };

    const priceValue = parseFloat(price);
    const amountValue = parseFloat(amount);

    if (orderType === "Market") {
      if (type === "Buy") {
        setBalance(
          quoteCurrency,
          useStore.getState().balances[quoteCurrency] -
            priceValue * amountValue,
        );
        setBalance(
          baseCurrency,
          useStore.getState().balances[baseCurrency] + amountValue,
        );
      } else if (type === "Sell") {
        setBalance(
          baseCurrency,
          useStore.getState().balances[baseCurrency] - amountValue,
        );
        setBalance(
          quoteCurrency,
          useStore.getState().balances[quoteCurrency] +
            priceValue * amountValue,
        );
      }
    }

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
          !isBalanceValid ? "cursor-not-allowed opacity-50" : "hover:opacity-75"
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
