import { create } from "zustand";

// This code is just example of how to use Zustand for state management in a React application. It defines a store that manages the state of the application, including the workplace ID, branch ID, and whether the sidebar is open or closed. The store provides methods to update these values and toggle the sidebar state.

interface AppState {
  workplaceId: number | null;
  branchId: number | null;
  sidebarOpen: boolean;

  setWorkplace: (id: number) => void;
  setBranch: (id: number) => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  workplaceId: null,
  branchId: null,
  sidebarOpen: true,

  setWorkplace: (id) => set({ workplaceId: id }),
  setBranch: (id) => set({ branchId: id }),
  toggleSidebar: () =>
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    })),
}));