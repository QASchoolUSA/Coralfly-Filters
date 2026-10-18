import { createJSONStorage } from "zustand/middleware";

const dummyStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const safeLocalStorage = createJSONStorage(() =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined"
    ? window.localStorage
    : dummyStorage
);
