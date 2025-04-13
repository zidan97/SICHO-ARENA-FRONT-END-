import { create } from "zustand";

export const useFetchSportsDataForStore = create((set) => ({
  sportsData: [],
  updateSportsData: (sd) =>
    set(() => ({
      sportsData: sd,
    })),
}));
