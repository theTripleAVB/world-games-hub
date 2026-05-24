import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "dark" | "light";

type State = {
  theme: Theme;
  toggleTheme: () => void;
  selectedPlanId: string;
  setPlan: (id: string) => void;
  isLoggedIn: boolean;
  setLoggedIn: (v: boolean) => void;
  user: { name: string; email: string } | null;
  setUser: (u: { name: string; email: string } | null) => void;
};

export const useApp = create<State>()(
  persist(
    (set) => ({
      theme: "dark",
      toggleTheme: () => set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),
      selectedPlanId: "quarterly",
      setPlan: (id) => set({ selectedPlanId: id }),
      isLoggedIn: false,
      setLoggedIn: (v) => set({ isLoggedIn: v }),
      user: null,
      setUser: (u) => set({ user: u }),
    }),
    { name: "wgra-store" }
  )
);
