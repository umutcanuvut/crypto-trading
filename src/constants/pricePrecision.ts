// Price precision values sourced from Binance API documentation:
// https://binance-docs.github.io/apidocs/spot/en/#exchange-information

export const PricePrecision: Record<string, number> = {
  USDT: 2,
  BTC: 5,
  ETH: 4,
  LTC: 3,
  XRP: 3,
};
