import * as constants from "@/constants";
import { createAction } from "typesafe-actions";
import { AxiosResponse } from 'axios';
import {ProjectListItem,ProjectInfo} from "@/types"
import { WrappedFormUtils } from 'antd/lib/form/Form';

export const doGetProjectListRequest = createAction(constants.GET_PROJECT_LIST_REQUEST);
export const doGetProjectListSuccess = createAction(constants.GET_PROJECT_LIST_SUCCESS,resolve=>(response:AxiosResponse<{list:ProjectListItem[]}>)=>resolve(response.data));
export const doGetProjectListFailure = createAction(constants.GET_PROJECT_LIST_FAILURE);

export const doGetProjectDetailsRequest = createAction(constants.GET_PROJECT_DETAILS_REQUEST,resolve=>(projectId:number)=>resolve(projectId));
export const doGetProjectDetailsSuccess = createAction(constants.GET_PROJECT_DETAILS_SUCCESS,resolve=>(response:AxiosResponse<ProjectInfo>)=>resolve(response.data));
export const doGetProjectDetailsFailure = createAction(constants.GET_PROJECT_DETAILS_FAILURE);

export const doUpdateProjectDetailsRequest = createAction(constants.UPDATE_PROJECT_DETAILS_REQUEST,resolve=>(form:WrappedFormUtils)=>resolve(form));
export const doUpdateProjectDetailsSuccess = createAction(constants.UPDATE_PROJECT_DETAILS_SUCCESS);
export const doUpdateProjectDetailsFailure = createAction(constants.UPDATE_PROJECT_DETAILS_FAILUER);