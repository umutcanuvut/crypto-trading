import React from "react";
import { AMOUNT_RANGE_STEPS } from "../../constants";

interface AmountRangeProps {
  rangeValue: number;
  handleRangeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const AmountRange: React.FC<AmountRangeProps> = ({
  rangeValue,
  handleRangeChange,
  disabled,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-400">
      Amount Range
    </label>
    <input
      type="range"
      id="amountRange"
      value={rangeValue}
      onChange={handleRangeChange}
      disabled={disabled}
      className={`w-full cursor-pointer ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
      min={AMOUNT_RANGE_STEPS[0]}
      max={AMOUNT_RANGE_STEPS[AMOUNT_RANGE_STEPS.length - 1]}
      step={AMOUNT_RANGE_STEPS[1] - AMOUNT_RANGE_STEPS[0]}
    />
    <div className="mt-2 flex justify-between text-sm text-gray-400">
      {AMOUNT_RANGE_STEPS.map((step) => (
        <span key={step}>{step}%</span>
      ))}
    </div>
  </div>
);

export default AmountRange;
