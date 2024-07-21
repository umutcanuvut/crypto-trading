import { create } from "zustand";

interface SelectedPairState {
  selectedPair: string;
  setSelectedPair: (pair: string) => void;
}

const useSelectedPairStore = create<SelectedPairState>((set) => ({
  selectedPair: "BTC/USDT",
  setSelectedPair: (pair) => set({ selectedPair: pair }),
}));

export default useSelectedPairStore;
