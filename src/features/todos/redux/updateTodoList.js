import {
  TODOS_UPDATE_TODO_LIST,
  TODOS_UPDATE_TODO_LIST_SUCCESS,
  TODOS_UPDATE_TODO_LIST_FAILED
} from './constants';
import { call, put, fork } from 'redux-saga';
import api from '../api.js';

export function updateTodoList(params) {
  return {
    type: TODOS_UPDATE_TODO_LIST,
    payload: params
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case TODOS_UPDATE_TODO_LIST:
      return {
        ...state,
        updateList: {
          ...state.updateList,
          loading: true,
          success: false,
          error: null
        }
      };
    case TODOS_UPDATE_TODO_LIST_SUCCESS:
      return {
        ...state,
        updateList: {
          ...state.updateList,
          success: true,
          loading: false,
          loaded: true
        }
      };
    case TODOS_UPDATE_TODO_LIST_FAILED:
      return {
        ...state,
        updateList: {
          ...state.updateList,
          loading: false,
          loaded: true,
          error: action.payload
        }
      };
    default:
      return state;
  }
}
