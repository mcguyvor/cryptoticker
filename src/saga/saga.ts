import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import getTicker from "../api/getTicker";
import { addTicker, isLoading, errorMessage } from "../tickerSlice";

type FetchTickerAction = {
  type: string;
  payload: { symbol: string };
};

export function* fetchTicker(action: FetchTickerAction) {
  try {
    yield put(isLoading(true));
    const res = yield call(() => getTicker(action.payload.symbol));
    yield put(addTicker(res));
    yield put(isLoading(false));
    yield put(errorMessage(""));
  } catch (e) {
    yield put(
      errorMessage("Data not found, Please click on the existing button")
    );
  }
}

//evert action that call FETCH_TICKER
export default function* rootSaga() {
  yield takeLatest("FETCH_TICKER", fetchTicker);
}
