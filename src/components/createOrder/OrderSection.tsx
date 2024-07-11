interface OrderSectionProps {
  type: "Buy" | "Sell";
  color: string;
  orderType: "Limit" | "Market";
}

const OrderSection: React.FC<OrderSectionProps> = ({
  type,
  color,
  orderType,
}) => (
  <div className="rounded bg-gray-800 p-4 text-white shadow-md">
    <h3 className="mb-4 text-lg font-semibold">{type}</h3>
    <div className="mb-4">
      <label
        htmlFor={`${type.toLowerCase()}Price`}
        className="block text-sm font-medium text-gray-400"
      >
        Price
      </label>
      {orderType === "Limit" ? (
        <input
          type="number"
          id={`${type.toLowerCase()}Price`}
          className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        />
      ) : (
        <div className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm sm:text-sm">
          Market Price
        </div>
      )}
    </div>
    <div className="mb-4">
      <label
        htmlFor={`${type.toLowerCase()}Amount`}
        className="block text-sm font-medium text-gray-400"
      >
        Amount
      </label>
      <input
        type="number"
        id={`${type.toLowerCase()}Amount`}
        className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
      />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-400">
        Amount Range
      </label>
      <input
        type="range"
        id={`${type.toLowerCase()}Range`}
        className="w-full cursor-pointer"
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
    <button
      className={`mt-4 w-full rounded py-2 text-white ${color} hover:opacity-75`}
    >
      {type} {orderType}
    </button>
  </div>
);

export default OrderSection;
