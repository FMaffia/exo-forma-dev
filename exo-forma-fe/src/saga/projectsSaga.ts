import { all, call, put, takeLeading } from "redux-saga/effects";
import { addLoaders, disableLoading, enableLoading, removeLoaders, setMessage } from "../store/reducers/uiReducer";
import { performInsertProject, performLoadProjects, performLoadStep, performLoadStepsById } from "../services/ProjectServices";
import { setProjects } from "../store/reducers/projectsReducer";
import { setFilteredProjects } from "../store/reducers/projectsFilteredReducer";
import { setStepsByProject } from "../store/reducers/selectedProject";
import { setCurrentStep } from "../store/selectedStep";
import { LOAD_STEPS } from "../utility/Constant";
import { Project } from "../types/models";

export const SAGA_PROJECT = {
  LOAD_PROJECTS: "SAGA_PROJECT/LOAD",
  LOAD_STEP: "SAGA_PROJECT/LOAD_STEP",
  INSERT_PROJECT: "SAGA_PROJECT/INSERT",
  LOAD_STEPS_BY_PROJECT: "SAGA_PROJECT/LOAD_STEPS_BY_ID"
};

type Payload = {
  payload: Project
}

function* insertProject({ payload }: any) {
  console.log(payload);
  try {
    yield put(enableLoading(null));
    // @ts-ignore
    const response: any = yield call(performInsertProject, payload);
    if (response.success) {
      console.log(response.result);
      yield put(setMessage({ show: true, body: response.result }));
    } else {
      console.log(response.errorCode);
    }
  } catch (e: any) {
    yield put(setMessage({ show: true, body: e.message }));
  }
  yield put(disableLoading(null));
}

function* loadProjects() {
  try {
    yield put(enableLoading(null));

    // @ts-ignore
    const response: any = yield call(performLoadProjects);
    if (response.success) {
      yield put(setProjects(response.result));
      yield put(setFilteredProjects(response.result));
    } else {
      console.log(response.errorCode);
    }
  } catch (e: any) {
    yield put(setMessage({ show: true, body: e.message }));
  }
  yield put(disableLoading(null));
}

function* loadStepsByProjectId({ payload }: any) {
  try {
    yield put(addLoaders(LOAD_STEPS));
    // @ts-ignore
    const response: any = yield call(performLoadStepsById, payload);
    if (response.success) {
      yield put(setStepsByProject(response.result));
    } else {
      console.log(response.errorCode);
    }
  } catch (e: any) {
    yield put(setMessage({ show: true, body: e.message }));
  }
  yield put(removeLoaders(LOAD_STEPS));
}

export type PayloadStep = {
  id: string;
  stepNumber: number;
};

function* loadStep(payload: any) {
  try {
    const params: PayloadStep = {
      id: payload.id,
      stepNumber: payload.stepNumber
    };
    // @ts-ignore
    const response: any = yield call(performLoadStep, params);
    if (response.success) {
      yield put(setCurrentStep(response.result));
    } else {
      console.log(response.errorCode);
    }
  } catch (e: any) {
    yield put(setMessage({ show: true, body: e.message }));
  }
  yield put(disableLoading(null));
}

export function* projectsSaga() {
  yield all([
    takeLeading(SAGA_PROJECT.LOAD_PROJECTS, loadProjects),
    takeLeading(SAGA_PROJECT.LOAD_STEPS_BY_PROJECT, loadStepsByProjectId),
    takeLeading(SAGA_PROJECT.LOAD_STEP, loadStep),
    takeLeading(SAGA_PROJECT.INSERT_PROJECT, insertProject)
  ]);
}
