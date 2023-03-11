import { createSlice } from "@reduxjs/toolkit";
import { TickerResponse } from "./types/ticker";

const initialState = {
  value: null,
  isLoading: false,
  errorMessage: "",
};

export const tickerSlice = createSlice({
  name: "ticker",
  initialState,
  reducers: {
    addTicker: (state: any, action: any) => {
      state.value = action.payload;
    },
    isLoading: (state: any, action: any) => {
      state.isLoading = action.payload;
    },
    errorMessage: (state: any, action: any) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { addTicker, isLoading, errorMessage } = tickerSlice.actions;

export const selectTicker = (state: any) => state.ticker.value;

export const loading = (state: any) => state.ticker.isLoading;

export const errMsg = (state: any) => state.ticker.errorMessage;

export default tickerSlice.reducer;
