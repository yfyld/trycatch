import { combineReducers } from "redux";

import { appReducer, AppState } from "./app";
import { projectReducer, ProjectState } from "./project";
import { RouterState, connectRouter } from 'connected-react-router'
import {history} from "@/utils"
export interface StoreState  {
  app: AppState;
  project: ProjectState;
  router:RouterState
};

const reducers = combineReducers({
  app: appReducer,
  project: projectReducer,
  router: connectRouter(history)
});

export default reducers;