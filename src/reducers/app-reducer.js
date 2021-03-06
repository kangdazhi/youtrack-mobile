import * as types from '../actions/action-types';
import {createReducer} from 'redux-create-reducer';
import IssuePermissions from '../components/issue-permissions/issue-permissions';
import type Api from '../components/api/api';
import type Auth from '../components/auth/auth';

type RootState = {
  api: ?Api,
  auth: ?Auth,
  showMenu: boolean
};

const initialState: RootState = {
  api: null,
  auth: null,
  showMenu: false
};

export default createReducer(initialState, {
  [types.INITIALIZE_AUTH](state: RootState, action: {auth: Auth}) {
    const {auth} = action;
    return {...state, auth};
  },
  [types.SET_PERMISSIONS](state: RootState, action: {auth: Auth}) {
    const {auth} = action;
    return {
      ...state,
      issuePermissions: new IssuePermissions(auth.permissions, auth.currentUser)
    };
  },
  [types.INITIALIZE_API](state: RootState, action: {api: Api}) {
    const {api} = action;
    return {...state, api};
  },
  [types.LOG_OUT](state: RootState, action: Object = {}) {
    if (state.auth) {
      state.auth.logOut();
    }
    return {
      ...state,
      api: null,
      auth: null
    };
  },
  [types.OPEN_MENU](state: RootState) {
    return {
      ...state,
      showMenu: true
    };
  },
  [types.CLOSE_MENU](state: RootState) {
    return {
      ...state,
      showMenu: false
    };
  },
});
