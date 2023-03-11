import {
  call,
  put,
  takeEvery,
  takeLatest,
  delay,
  cancelled,
  take,
  fork,
  cancel,
} from "redux-saga/effects";
import getTicker from "../api/getTicker";
import {
  addTicker,
  isLoading,
  errorMessage,
  START_POLLING,
  STOP_POLLING,
} from "../tickerSlice";

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

// function* fetchTicker(action: FetchTickerAction) {
//   while (true)
//     try {
//       yield put(isLoading(true));

//       const res = yield call(() => getTicker(action.payload.symbol));
//       yield put(addTicker(res));
//       yield put(isLoading(false));
//       yield put(errorMessage(""));
//       yield delay(5000);
//       //adds a delay of 3 seconds
//     } catch (e) {
//       yield put(
//         errorMessage("Data not found, Please click on the existing button")
//       );
//     } finally {
//       if (yield cancelled()) {
//       }
//     }
// }

// export default function* quotePollSaga() {
//   while (yield take(START_POLLING)) {
//     // starts the task in the background
//     const quotePollTask = yield fork(fetchTicker);
//     // Fork: makes a non-blocking call to a function that produces a promise.

//     // wait for the user stop action (button click in our case)
//     yield take(STOP_POLLING);

//     // user clicked stop. cancel the background task
//     // this will cause the forked quotePollTask task to jump into its finally block
//     yield cancel(quotePollTask);
//     // Cancel: cancels the saga execution.
//   }
// }
