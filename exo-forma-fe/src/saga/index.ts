import "regenerator-runtime/runtime";
import { all } from "redux-saga/effects";
import { projectsSaga } from "./projectsSaga";
import { userSaga } from "./userSaga";

export function* rootSagas() {
  yield all([projectsSaga(), userSaga()]);
}
