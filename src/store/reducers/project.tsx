import { getType } from 'typesafe-actions';
import * as actions from "../actions";
import {ProjectListItem,ProjectInfo,Action} from "@/types"
import update from 'immutability-helper'




export interface ProjectState {
   projectList: ProjectListItem[];
   projectInfo: ProjectInfo;
   projectAddVisible:boolean
}

const initialState = {
  projectList: [],
  projectInfo: {},
  projectAddVisible:false,
};

export const projectReducer = (state: ProjectState = initialState, action: Action): ProjectState => {

  switch (action.type) {
    
    case getType(actions.doGetProjectListSuccess):
      return update(state,{projectList:{$set:action.payload.list}})


    case getType(actions.doGetProjectDetailsSuccess):
      return update(state,{projectInfo:{$set:action.payload}})

    case getType(actions.doAddProjectToggle):
      return update(state,{projectAddVisible:{$set:action.payload}})
     
    case getType(actions.doAddProjectSuccess):
      return update(state,{projectAddVisible:{$set:false}})  
    default:
      return state;
  }
};