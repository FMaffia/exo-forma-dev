import AjaxService from './ajax-service'
import { SpringResponse } from '../types/models'
import { END_POINT_LOAD_IMAGE } from './endpoint/URI_RESOURCES'

const service = new AjaxService()

export const performLoadImage = async (pathName: string): Promise<SpringResponse> => {
    // @ts-ignore
    return await service.callAjaxBlob('GET', END_POINT_LOAD_IMAGE + pathName)
}
