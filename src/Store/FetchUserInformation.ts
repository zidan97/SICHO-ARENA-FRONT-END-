import { create } from "zustand";

export const useFetchUserDataForStore = create((set) => ({
  userDataAfterFetching: [],
  updateUserData: (ud) =>
    set(() => ({
      userDataAfterFetching: ud,
    })),
}));
