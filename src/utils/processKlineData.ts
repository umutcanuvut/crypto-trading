import { Candle, Kline } from "../types";

export const processKlineData = (kline: Kline): Candle => ({
  x: new Date(kline.t),
  y: [
    parseFloat(kline.o),
    parseFloat(kline.h),
    parseFloat(kline.l),
    parseFloat(kline.c),
  ],
});
