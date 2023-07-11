import { create } from "zustand";

const sidebarModes = ["about", "random", "share", "settings", "sound"] as const;
type SidebarMode = (typeof sidebarModes)[number];

type MiscStoreState = {
  sidebarMode: SidebarMode;
  sidebarModes: Array<SidebarMode>;
  setSidebarMode: (value: SidebarMode) => void;
};

export const useMiscStore = create<MiscStoreState>((set, get) => {
  return {
    sidebarModes: [...sidebarModes],
    sidebarMode: sidebarModes[0],
    setSidebarMode: (value) => {
      set(() => {
        return {
          sidebarMode: value,
        };
      });
    },
  };
});
