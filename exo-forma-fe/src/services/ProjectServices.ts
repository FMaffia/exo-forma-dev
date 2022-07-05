import {
  END_POINT_LOAD_PROJECT,
  END_POINT_LOAD_STEP,
  END_POINT_LOAD_STEPS_BY_ID,
} from "./endpoint/URI_PROJECTS";
import AjaxService from "./ajax-service";
import { SpringResponse } from "../model/models";
import { PayloadStep } from "../saga/projectsSaga";

const service = new AjaxService();

export const performLoadProjects = async (): Promise<SpringResponse> => {
  // @ts-ignore
  return await service.callAjax("GET", END_POINT_LOAD_PROJECT);
};

export const performLoadStepsById = async (
  id: string
): Promise<SpringResponse> => {
  // @ts-ignore
  return await service.callAjax("GET", END_POINT_LOAD_STEPS_BY_ID + id);
};
export const performLoadStep = async (
  payloadParam: PayloadStep
): Promise<SpringResponse> => {
  const params: string = payloadParam.id + "?step=" + payloadParam.stepNumber;
  // @ts-ignore
  return await service.callAjax("GET", END_POINT_LOAD_STEP + params);
};
