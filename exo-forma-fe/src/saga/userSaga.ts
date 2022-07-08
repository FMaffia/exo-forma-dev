import { all, call, put, takeLeading } from "redux-saga/effects";
import { disableLoading, enableLoading, setMessage } from "../store/reducers/uiReducer";
import { performReceiveUser } from "../services/UserServices";
import { setUser } from "../store/reducers/userReducer";

export const SAGA_USER = {
  CHECK_USER: "SAGA_USER/CHECK_USER"
};

function* checkUser({ payload }: any) {
  try {
    yield put(enableLoading(null));
    // @ts-ignore
    const response: any = yield call(performReceiveUser, payload);
    if (response.success) {
      yield put(setUser(response.result));
    } else {
      yield put(setMessage({ show: true, body: response.errorCode }));
    }
  } catch (e: any) {
    yield put(setMessage({ show: true, body: e.message }));
  }
  yield put(disableLoading(null));
}

export function* userSaga() {
  yield all([
    // @ts-ignore
    takeLeading(SAGA_USER.CHECK_USER, checkUser)
  ]);
}
