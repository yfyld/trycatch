import { combineReducers } from "redux";

import { appReducer, AppState } from "./app";
import { projectReducer, ProjectState } from "./project";
import { workReducer, WorkState } from "./work";
import { RouterState, connectRouter } from 'connected-react-router'
import {history} from "@/utils"
export interface StoreState  {
  app: AppState;
  project: ProjectState;
  router:RouterState,
  work:WorkState,

};

const reducers = combineReducers({
  app: appReducer,
  project: projectReducer,
  work: workReducer,
  router: connectRouter(history)
});

export default reducers;