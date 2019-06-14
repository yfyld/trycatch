import { combineEpics } from "redux-observable";

import  app from "./app";
import  project from "./project";
import  work from "./work";

const epics = combineEpics(
  ...app,
  ...project,
  ...work
);

export default epics;