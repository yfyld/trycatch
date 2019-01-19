import * as constants from "@/constants";
import { createAction } from "typesafe-actions";
import { AxiosResponse } from 'axios';
import {ProjectListItem} from "@/types"

export const incrementEnthusiasm = createAction(constants.INCREMENT_ENTHUSIASM);

export const test = createAction(constants.TEST);

export const doGetProjectList = createAction(constants.GET_PROJECT_LIST);
export const doSetProjectList = createAction(constants.SET_PROJECT_LIST,resolve=>(response:AxiosResponse<{list:ProjectListItem[]}>)=>resolve(response.data));