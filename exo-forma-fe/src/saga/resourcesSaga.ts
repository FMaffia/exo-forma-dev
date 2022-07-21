import { all, call, put, takeLeading } from "redux-saga/effects";
import { disableLoading, enableLoading, setMessage } from "../store/reducers/uiReducer";
import { performLoadImage } from "../services/ResourcesServices";

export const SAGA_RESOURCES = {
  LOAD_IMAGE: "SAGA_RESOURCES/LOAD_IMAGE"
};

function* loadImage({ payload }: any) {
  try {
    yield put(enableLoading(null));
    // @ts-ignore
    const response: any = yield call(performLoadImage, payload);
    if (response.success) {
      /*yield put(setUser(response.result));*/
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
    takeLeading(SAGA_RESOURCES.LOAD_IMAGE, loadImage)
  ]);
}
