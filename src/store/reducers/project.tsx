import { getType } from 'typesafe-actions';
import * as actions from "../actions";
import {ProjectListItem,ProjectInfo,Action,Member} from "@/types"
import update from 'immutability-helper'




export interface ProjectState {
   projectList: ProjectListItem[];
   projectInfo: ProjectInfo;
   projectMembers:Member[]
   projectId:number
   projectAddVisible:boolean
}

const initialState = {
  projectList: [],
  projectInfo: {},
  projectMembers:[],
  projectId:null,
  projectAddVisible:false,
};

export const projectReducer = (state: ProjectState = initialState, action: Action): ProjectState => {

  switch (action.type) {
    
    case getType(actions.doGetProjectListSuccess):
      return update(state,{projectList:{$set:action.payload.list}})


    case getType(actions.doGetProjectDetailsSuccess):
      return update(state,{projectInfo:{$set:action.payload},projectId:{$set:action.payload.id}})

    case getType(actions.doAddProjectToggle):
      return update(state,{projectAddVisible:{$set:action.payload}})
     
    case getType(actions.doAddProjectSuccess):
      return update(state,{projectAddVisible:{$set:false}})  

    case getType(actions.doGetProjectMembersSuccess):
    return update(state,{projectMembers:{$set:action.payload}})  

    case getType(actions.doGetProjectMembersRequest):
    return update(state,{projectId:{$set:action.payload}})  

    
    default:
      return state;
  }
};