import { useState, useEffect } from "react";
import useSelectedPairStore from "../store/useSelectedPairStore";
import useBalanceStore from "../store/useBalanceStore";
import validateBalance from "../utils/validateBalance";
import formatPrice, { Currency } from "../utils/formatPrice";

const useOrderForm = (type: "Buy" | "Sell", orderType: "Limit" | "Market") => {
  const selectedPair = useSelectedPairStore((state) => state.selectedPair);
  const balances = useBalanceStore((state) => state.balances);
  const [price, setPrice] = useState(orderType === "Market" ? "0" : "");
  const [amount, setAmount] = useState("");
  const [rangeValue, setRangeValue] = useState(0);

  const [baseCurrency, quoteCurrency] = selectedPair.split("/") as [
    Currency,
    Currency,
  ];

  const priceValue = parseFloat(price);
  const amountValue = parseFloat(amount);
  const isBalanceValid =
    !isNaN(priceValue) &&
    !isNaN(amountValue) &&
    validateBalance(type, selectedPair, priceValue, amountValue, balances);

  useEffect(() => {
    if (!amount) {
      setRangeValue(0);
    }
  }, [amount]);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setRangeValue(newValue);

    if (!isNaN(priceValue) && priceValue > 0) {
      const totalBalance =
        type === "Buy" ? balances[quoteCurrency] : balances[baseCurrency];
      const maxAmount = totalBalance / priceValue;
      const newAmount = (newValue / 100) * maxAmount;
      setAmount(formatPrice(baseCurrency, newAmount));
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = e.target.value;
    setAmount(newAmount);

    if (!isNaN(priceValue) && priceValue > 0) {
      const totalBalance =
        type === "Buy" ? balances[quoteCurrency] : balances[baseCurrency];
      const maxAmount = totalBalance / priceValue;
      const percentage =
        totalBalance > 0 ? (parseFloat(newAmount) / maxAmount) * 100 : 0;
      setRangeValue(percentage);
    }
  };

  return {
    price,
    setPrice,
    amount,
    rangeValue,
    handleRangeChange,
    handleAmountChange,
    isBalanceValid,
    baseCurrency,
    quoteCurrency,
  };
};

export default useOrderForm;
