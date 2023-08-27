import { create } from "zustand";

interface useFilterStore {
  value: number;
  increment: () => void;
  isFiltered: boolean;
  onFilterShow: () => void;
  onFilterHide: () => void;
}

const useFilter = create<useFilterStore>((set) => ({
  value: 12,
  isFiltered: true,
  increment: () => set((state) => ({ value: state.value + 12 })),
  onFilterShow: () => set({ isFiltered: true }),
  onFilterHide: () => set({ isFiltered: false }),
}));

export default useFilter;
