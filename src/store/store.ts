import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./symbol";

export default configureStore({
  reducer: {
    selectingSymbol: counterReducer,
  },
});
