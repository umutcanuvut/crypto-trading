import React, { useEffect } from "react";
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

  const addOrder = useStore((state) => state.addOrder);

  useEffect(() => {
    if (orderType === "Limit") {
      if (type === "Buy" && selectedBuyPriceFromOrderBook !== null) {
        setPrice(selectedBuyPriceFromOrderBook.toString());
      } else if (type === "Sell" && selectedSellPriceFromOrderBook !== null) {
        setPrice(selectedSellPriceFromOrderBook.toString());
      }
    }
  }, [
    selectedBuyPriceFromOrderBook,
    selectedSellPriceFromOrderBook,
    orderType,
    type,
    setPrice,
  ]);

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
      orderCompleteDate: null,
      status: "Pending" as const,
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
        setPrice={setPrice}
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
