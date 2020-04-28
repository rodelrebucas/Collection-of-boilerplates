import {
  fork,
  call,
  put,
  take,
  delay,
  all,
  debounce,
  actionChannel,
} from 'redux-saga/effects';
import { channel, buffers } from 'redux-saga';

function* retry(count, msDelay, method, route, payload) {
  let error;
  for (let i = 0; i < count; i += 1) {
    try {
      const apiResponse = yield call(method, route, payload);
      return apiResponse;
    } catch (err) {
      if (i < count - 1) {
        yield delay(msDelay);
      }
      error = err;
    }
  }
  // Throw the final catched error so
  // reducers that rely on error responses
  // can received the response data
  throw error;
}

export function* returnErrorResponseAction(err, action) {
  const { response } = err;
  if (response) {
    yield put(
      action({
        loading: false,
        error: true,
        errorMsg: '',
        response,
      }),
    );
  } else {
    yield put(
      action({
        loading: false,
        response: null,
        error: true,
        errorMsg: err.message || '',
      }),
    );
  }
}

function* handler(action) {
  const { resultReducerAction } = action;
  const { method, payload, route } = action;
  try {
    let result;
    if (payload) result = yield retry(2, 4000, method, route, payload);
    else result = yield retry(2, 4000, method, route);
    const { response } = result;
    yield put(
      resultReducerAction({
        loading: false,
        error: false,
        errorMsg: '',
        response,
      }),
    );
  } catch (err) {
    yield call(returnErrorResponseAction, err, resultReducerAction);
  }
}

function* requestHandler(chan) {
  while (true) {
    const apiAction = yield take(chan);
    yield call(handler, apiAction);
  }
}

function* requestFlow() {
  // create 5 workers
  // to handle 5 request max
  const chan = yield call(channel);
  for (let i = 0; i < 5; i += 1) {
    yield fork(requestHandler, chan);
  }
  while (true) {
    const requestAction = yield take('REQUEST');
    const { resultReducerAction } = requestAction;
    yield put(
      resultReducerAction({
        loading: true,
        error: false,
        errorMsg: '',
        response: null,
      }),
    );
    yield put(chan, requestAction);
  }
}

/** Delay the search request to an api for 1 second */
function* searchRequest() {
  yield debounce(1000, 'SEARCH_REQUEST', handler);
}

/** Queue up to 5 request and handle each one of them in order */
function* requestQueue() {
  const requestChan = yield actionChannel('REQUEST_QUEUE', buffers.sliding(5));
  while (true) {
    const requestAction = yield take(requestChan);
    const { startReducerAction } = requestAction;
    yield put(startReducerAction());
    yield call(handler, requestAction);
  }
}

function* root() {
  yield all([fork(requestFlow), fork(searchRequest), fork(requestQueue)]);
}

export default root;
