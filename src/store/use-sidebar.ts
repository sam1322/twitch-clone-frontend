import { create } from "zustand";

type State = {
  collapsed: boolean;
};

type Actions = {
  onCollapse: () => void;
  onExpand: () => void;
};

export const useSidebar = create<State & Actions>((set, get) => ({
  collapsed: false,
  onExpand: () =>
    set({
      collapsed: false,
    }),
  onCollapse: () =>
    set({
      collapsed: true,
    }),
}));
