import create from "zustand";
import { persist } from "zustand/middleware";
import Debug from "debug";

const debug = new Debug(`caams:hooks:useStoreTheme.js`);

const useStoreTheme = create(
  persist(
    (set) => ({
      colorScheme: "light",
      toggleColorScheme: (value) => {
        debug("Updating the colotScheme...");
        set((state) => ({
          colorScheme:
            value || (state.colorScheme === "dark" ? "light" : "dark"),
        }));
      },
    }),
    {
      name: "caams:theme",
      getStorage: () => localStorage,
      partialize: (state) => ({
        colorScheme: state.colorScheme,
      }),
    }
  )
);

export default useStoreTheme;
