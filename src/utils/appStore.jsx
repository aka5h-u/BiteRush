import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import locationSlice from "./locationSlice";
const appStore = configureStore({
  reducer: {
    cart: cartSlice,
    location: locationSlice,
  },
});

export default appStore;
