import { ActionType, getType } from 'typesafe-actions';

import * as actions from "../actions";

type Action = ActionType<typeof actions>;



export interface AppState {
  readonly loading: boolean;
  readonly weather?: any;
}

const initialState = {
  loading: false,
};

export const appReducer = (state: AppState = initialState, action: Action): AppState => {

  switch (action.type) {

    case getType(actions.incrementEnthusiasm):
      return Object.assign({}, state, { weather: {} });

    case getType(actions.incrementEnthusiasm):
      return state;

    default:
      return state;
  }
};