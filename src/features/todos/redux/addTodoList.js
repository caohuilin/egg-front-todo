import {
  TODOS_ADD_TODO_LIST,
  TODOS_ADD_TODO_LIST_SUCCESS,
  TODOS_ADD_TODO_LIST_FAILED
} from './constants';
import { call, put, fork } from 'redux-saga';
import api from '../api.js';

export function addTodoList(params) {
  return {
    type: TODOS_ADD_TODO_LIST,
    payload: params
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case TODOS_ADD_TODO_LIST:
      return {
        ...state,
        addTodoList: {
          ...state.addList,
          loading: true,
          success: false,
          error: null
        }
      };
    case TODOS_ADD_TODO_LIST_SUCCESS:
      return {
        ...state,
        addTodoList: {
          ...state.addList,
          success: true,
          loading: false,
          loaded: true
        }
      };
    case TODOS_ADD_TODO_LIST_FAILED:
      return {
        ...state,
        addTodoList: {
          ...state.addList,
          loading: false,
          loaded: true,
          error: action.payload
        }
      };
    default:
      return state;
  }
}
