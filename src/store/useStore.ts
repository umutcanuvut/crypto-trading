import useSelectedPairStore from "./useSelectedPairStore";
import useOrderBookStore from "./useOrderBookStore";
import useOrderHistoryStore from "./useOrderHistoryStore";
import useBalanceStore from "./useBalanceStore";

const useStore = () => ({
  ...useSelectedPairStore(),
  ...useOrderBookStore(),
  ...useOrderHistoryStore(),
  ...useBalanceStore(),
});

export default useStore;
