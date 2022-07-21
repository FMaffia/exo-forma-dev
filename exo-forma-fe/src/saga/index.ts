import 'regenerator-runtime/runtime'
import { all } from 'redux-saga/effects'
import { projectsSaga } from './projectsSaga'

export function* rootSagas() {
    yield all([projectsSaga()])
}
