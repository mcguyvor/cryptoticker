import { call, put, takeEvery } from "redux-saga/effects";
import getTicker from "../api/getTicker";
import { addTicker } from "../tickerSlice";

type FetchTickerAction = {
  type: string;
  payload: { symbol: string };
};

export function* fetchTicker(action: FetchTickerAction) {
  try {
    const res = yield call(() => getTicker(action.payload.symbol));
    console.log(res);
    yield put(addTicker(res));

    // yield put(incrementByAmount(result.data[0]))
  } catch (e) {}
}
//evert action that call FETCH_TICKER
export default function* rootSaga() {
  yield takeEvery("FETCH_TICKER", fetchTicker);
}
