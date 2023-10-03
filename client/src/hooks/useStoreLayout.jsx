import create from "zustand";
import Debug from "debug";

const debug = new Debug(`caams:hooks:useStoreLayout.js`);

const useStoreLayout = create((set) => ({
  openSidebar: false,
  toggleOpenSidebar: (value) => {
    debug("Updating the openSidebar...");
    set((state) => ({
      openSidebar: value || !state.openSidebar,
    }));
  },
}));

export default useStoreLayout;
