import { create } from 'zustand';

interface Store {
  menuActive: string;
  setMenuActive: (menuActive: string) => void;
}

const useStore = create<Store>((set) => ({
  menuActive: 'app',
  setMenuActive: (menuActive) => {
    set({ menuActive });
  },
}));

export default useStore;