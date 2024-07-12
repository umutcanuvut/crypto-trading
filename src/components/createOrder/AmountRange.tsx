import React from "react";

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
      min="0"
      max="100"
      step="20"
    />
    <div className="mt-2 flex justify-between text-sm text-gray-400">
      <span>0%</span>
      <span>20%</span>
      <span>40%</span>
      <span>60%</span>
      <span>80%</span>
      <span>100%</span>
    </div>
  </div>
);

export default AmountRange;
