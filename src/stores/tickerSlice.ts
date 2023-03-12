import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
  isLoading: false,
  errorMessage: "",
  polling: false,
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
    startPolling: (state: any) => ({ ...state, polling: true }),
    stopPolling: (state: any) => ({ ...state, polling: false }),
  },
});

export const {
  addTicker,
  isLoading,
  errorMessage,
  startPolling,
  stopPolling,
} = tickerSlice.actions;

export const ticker = (state: any) => state.ticker;

export default tickerSlice.reducer;
