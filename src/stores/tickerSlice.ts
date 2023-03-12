import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { TickerResponse } from "../types/ticker";

type tickerStore = {
  value: TickerResponse;
  isLoading: boolean;
  errorMessage: string;
  polling: boolean;
};
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
    addTicker: (state: tickerStore, action: PayloadAction<TickerResponse>) => {
      state.value = action.payload;
    },
    isLoading: (state: tickerStore, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    errorMessage: (state: tickerStore, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    startPolling: (state: tickerStore) => ({ ...state, polling: true }),
    stopPolling: (state: tickerStore) => ({ ...state, polling: false }),
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
