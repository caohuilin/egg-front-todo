import {
  TODOS_GET_TODO_LIST,
  TODOS_GET_TODO_LIST_SUCCESS,
  TODOS_GET_TODO_LIST_FAILED
} from './constants';
import { call, put, fork } from 'redux-saga';
import api from '../api.js';

export function getTodoList() {
  return {
    type: TODOS_GET_TODO_LIST
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case TODOS_GET_TODO_LIST:
      return {
        ...state,
        todosList: {
          ...state.todosList,
          loading: true
        }
      };
    case TODOS_GET_TODO_LIST_SUCCESS:
      return {
        ...state,
        todosList: {
          ...state.todosList,
          list: action.payload,
          loading: false,
          loaded: true
        }
      };
    case TODOS_GET_TODO_LIST_FAILED:
      return {
        ...state,
        todosList: {
          ...state.todosList,
          loading: false,
          loaded: true,
          error: action.payload
        }
      };
    default:
      return state;
  }
}
