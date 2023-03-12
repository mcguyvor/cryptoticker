import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import tickerReducer from "./tickerSlice";
import tickerSaga from "./saga/saga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: {
    ticker: tickerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(tickerSaga);
