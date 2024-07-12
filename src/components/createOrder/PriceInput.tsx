import React from "react";
import { Currency } from "../../utils/formatPrice";

interface PriceInputProps {
  type: "Buy" | "Sell";
  orderType: "Limit" | "Market";
  price: string;
  setPrice: (price: string) => void;
  quoteCurrency: Currency;
}

const PriceInput: React.FC<PriceInputProps> = ({
  type,
  orderType,
  price,
  setPrice,
  quoteCurrency,
}) => (
  <div className="mb-4">
    <label
      htmlFor={`${type.toLowerCase()}Price`}
      className="block text-sm font-medium text-gray-400"
    >
      Price ({quoteCurrency})
    </label>
    {orderType === "Limit" ? (
      <div className="relative flex items-center">
        <input
          type="number"
          id={`${type.toLowerCase()}Price`}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 p-2 pr-16 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        />
        <span className="absolute right-3 text-gray-300">{quoteCurrency}</span>
      </div>
    ) : (
      <div className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm sm:text-sm">
        Market Price ({quoteCurrency})
      </div>
    )}
  </div>
);

export default PriceInput;
