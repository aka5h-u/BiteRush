import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    locCode: [],
  },
  reducers: {
    addLatLng: (state, action) => {
      if (state.locCode.length > 0) {
        state.locCode.shift();
      }
      state.locCode.push(action.payload);
    },
  },
});

export const { addLatLng } = locationSlice.actions;
export default locationSlice.reducer;
