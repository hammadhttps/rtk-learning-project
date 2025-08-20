import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 1 },
  reducers: {
    add: (state) => {
      state.value += 1;
    },
    subtract: (state) => {
      if (state.value > 0) {
        state.value -= 1;
      } else {
        state.value = 0;
      }
    },
  },
});

export const { add, subtract } = counterSlice.actions;
export default counterSlice.reducer;
