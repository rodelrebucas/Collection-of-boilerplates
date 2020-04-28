import { call, all, spawn } from 'redux-saga/effects';
import requestSaga from './request/request.saga';

export default function* rootSaga() {
  const sagas = [requestSaga];
  yield all(
    sagas.map(saga =>
      // eslint-disable-next-line func-names
      spawn(function*() {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.error(e);
          }
        }
      }),
    ),
  );
}
