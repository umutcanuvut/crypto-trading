import { PricePrecision } from "../constants";

export type Currency = keyof typeof PricePrecision;

const formatPrice = (currency: Currency, price: number): string => {
  const precision = PricePrecision[currency] || 2;
  return price.toFixed(precision);
};

export default formatPrice;
