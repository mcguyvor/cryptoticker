import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import getTicker from "../api/getTicker";
import { addTicker, isLoading } from "../tickerSlice";

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
  } catch (e) {}
}

//evert action that call FETCH_TICKER
export default function* rootSaga() {
  yield takeLatest("FETCH_TICKER", fetchTicker);
}
