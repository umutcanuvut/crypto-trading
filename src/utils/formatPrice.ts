type Currency = "USDT" | "BTC" | "ETH" | "LTC" | "XRP";

const formatPrice = (currency: Currency, price: number): string => {
  let precision: number;

  switch (currency) {
    case "USDT":
      precision = 2;
      break;
    case "BTC":
      precision = 5;
      break;
    case "ETH":
      precision = 4;
      break;
    case "LTC":
      precision = 3;
      break;
    case "XRP":
      precision = 3;
      break;
    default:
      precision = 2;
  }

  return price.toFixed(precision);
};

export default formatPrice;
