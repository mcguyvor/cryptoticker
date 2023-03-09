import { createSlice } from "@reduxjs/toolkit";
import { TickerResponse } from "./types/ticker";

const initialState = {
  value: null,
};

export const tickerSlice = createSlice({
  name: "ticker",
  initialState,
  reducers: {
    addTicker: (state, action: any) => {
      console.log("payload", action.payload);
      state.value = action.payload;
    },
  },
});

export const { addTicker } = tickerSlice.actions;

export const selectTicker = (state) => state.ticker.value;

export default tickerSlice.reducer;
