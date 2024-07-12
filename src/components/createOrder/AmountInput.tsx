import React from "react";
import { Currency } from "../../utils/formatPrice";

interface AmountInputProps {
  type: "Buy" | "Sell";
  amount: string;
  handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  baseCurrency: Currency;
}

const AmountInput: React.FC<AmountInputProps> = ({
  type,
  amount,
  handleAmountChange,
  baseCurrency,
}) => (
  <div className="mb-4">
    <label
      htmlFor={`${type.toLowerCase()}Amount`}
      className="block text-sm font-medium text-gray-400"
    >
      Amount ({baseCurrency})
    </label>
    <div className="relative flex items-center">
      <input
        type="number"
        id={`${type.toLowerCase()}Amount`}
        value={amount}
        onChange={handleAmountChange}
        className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 p-2 pr-16 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
      />
      <span className="absolute right-3 text-gray-300">{baseCurrency}</span>
    </div>
  </div>
);

export default AmountInput;
