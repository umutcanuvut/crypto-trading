import useSelectedPairStore from "../store/useSelectedPairStore";

const SelectPair = () => {
  const selectedPair = useSelectedPairStore((state) => state.selectedPair);
  const setSelectedPair = useSelectedPairStore(
    (state) => state.setSelectedPair,
  );

  return (
    <div className="mb-4">
      <label htmlFor="pair" className="mr-2">
        Select Pair:
      </label>
      <select
        id="pair"
        value={selectedPair}
        onChange={(e) => setSelectedPair(e.target.value)}
        className="rounded-md border border-gray-600 bg-gray-700 p-2 text-white"
      >
        <option value="BTC/USDT">BTC/USDT</option>
        <option value="ETH/BTC">ETH/BTC</option>
        <option value="LTC/USDT">LTC/USDT</option>
        <option value="XRP/USDT">XRP/USDT</option>
      </select>
    </div>
  );
};

export default SelectPair;
