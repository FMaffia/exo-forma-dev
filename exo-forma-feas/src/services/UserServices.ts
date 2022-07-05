import AjaxService from "./ajax-service";
import { SpringResponse, User } from "../model/models";
import { END_POINT_RECEIVE_USER } from "./endpoint/URI_USER";

const service = new AjaxService();

export const performReceiveUser = async (
  user: User
): Promise<SpringResponse> => {
  // @ts-ignore
  return await service.callAjax("POST", END_POINT_RECEIVE_USER, user);
};
