import { ActionType, getType } from 'typesafe-actions';
import * as actions from "../actions";
import {ProjectListItem,ProjectInfo} from "@/types"

type Action = ActionType<typeof actions>;



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

    case getType(actions.doGetProjectList):
      return state
    
    case getType(actions.doSetProjectList):
      return {...state, projectList: action.payload.list}

    default:
      return state;
  }
};