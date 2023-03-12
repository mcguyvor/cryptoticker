import {
  call,
  put,
  takeLatest,
  delay,
  cancelled,
  take,
  cancel,
} from "redux-saga/effects";
import getTicker from "../api/getTicker";
import {
  addTicker,
  isLoading,
  errorMessage,
  startPolling,
  stopPolling,
} from "../stores/tickerSlice";

type FetchTickerAction = {
  type: string;
  payload: { symbol: string };
};

export function* fetchTicker(action: FetchTickerAction) {
  while (true) {
    try {
      yield put(isLoading(true));
      const res = yield call(() => getTicker(action.payload.symbol));
      yield put(addTicker(res));
      yield put(isLoading(false));
      yield put(errorMessage(""));
      yield delay(5000);
    } catch (e) {
      yield put(
        errorMessage("Data not found, Please click on the existing button")
      );
    } finally {
      if (yield cancelled()) {
      }
    }
  }
}

//evert action that call FETCH_TICKER
export default function* rootSaga() {
  while (yield take(startPolling)) {
    const x = yield takeLatest("FETCH_TICKER", fetchTicker);
    yield take(stopPolling);
    yield cancel(x);
  }
}
