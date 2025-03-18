import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item?.card?.info?.id == action.payload.card.info.id
      );

      if (!existingItem) {
        state.items.push({ ...action.payload, quantity: 1 });
      } else {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      }
    },
    clearCart: (state) => {
      state.items.length = 0;
    },
    removeItem: (state, action) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.card?.info?.id === action.payload.card?.info?.id
      );
      if (existingItemIndex !== -1) {
        if (state.items[existingItemIndex].quantity > 1) {
          state.items[existingItemIndex].quantity -= 1;
        } else {
          state.items.splice(existingItemIndex, 1); // Correctly removes the clicked item
        }
      }
    },
  },
});

export const { addItem, clearCart, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
