import { Currency } from "./formatPrice";

interface Balances extends Record<Currency, number> {}

const validateBalance = (
  transactionType: "Buy" | "Sell",
  pair: string,
  price: number,
  amount: number,
  balances: Balances,
): boolean => {
  const [baseCurrency, quoteCurrency] = pair.split("/") as [Currency, Currency];

  if (transactionType === "Buy") {
    const totalCost = price * amount;
    return balances[quoteCurrency] >= totalCost;
  } else if (transactionType === "Sell") {
    return balances[baseCurrency] >= amount;
  }
  return false;
};

export default validateBalance;
