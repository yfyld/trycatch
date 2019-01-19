import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { ActionType } from "typesafe-actions";
import {history} from "@/utils"
import { routerMiddleware } from 'connected-react-router'
import * as actions from "@/store/actions";
import reducers, { StoreState } from "@/store/reducers";
import epics from "@/store/epics";

type Action = ActionType<typeof actions>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
  }
}



const routerMiddlewareInstance  = routerMiddleware(history)

const composeEnhancers = (
  window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

const epicMiddleware = createEpicMiddleware<Action, Action, StoreState>();

function configureStore(initialState?: StoreState) {
  // configure middlewares
  const middlewares = [
    epicMiddleware,
    routerMiddlewareInstance 
  ];
  // compose enhancers
  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
  );

  // create store
  return createStore(
    reducers,
    initialState,
    enhancer
  );
}

const store = configureStore();

epicMiddleware.run(epics);

export default store



