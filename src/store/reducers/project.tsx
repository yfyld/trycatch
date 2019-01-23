import { getType } from 'typesafe-actions';
import * as actions from "../actions";
import {ProjectListItem,ProjectInfo,Action} from "@/types"
import update from 'immutability-helper'




export interface ProjectState {
   projectList: ProjectListItem[];
   projectInfo: ProjectInfo;
}

const initialState = {
  projectList: [],
  projectInfo: {}
};

export const projectReducer = (state: ProjectState = initialState, action: Action): ProjectState => {

  switch (action.type) {
    
    case getType(actions.doGetProjectListSuccess):
      return update(state,{projectList:{$set:action.payload.list}})


    case getType(actions.doGetProjectDetailsSuccess):
      return update(state,{projectInfo:{$set:action.payload}})


    default:
      return state;
  }
};