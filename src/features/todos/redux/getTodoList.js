import {
  TODOS_ADD_TODO_LIST,
  TODOS_ADD_TODO_LIST_SUCCESS,
  TODOS_ADD_TODO_LIST_FAILED
} from './constants';
import { call, put, fork } from 'redux-saga';
import api from '../api.js';

export function getTodoList() {
  return {
    type: TODOS_ADD_TODO_LIST
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case TODOS_ADD_TODO_LIST:
      return {
        ...state,
        todosList: {
          ...state.todosList,
          loading: true
        }
      };
    case TODOS_ADD_TODO_LIST_SUCCESS:
      return {
        ...state,
        todosList: {
          ...state.todosList,
          list: action.payload
        }
      };
    case TODOS_ADD_TODO_LIST_FAILED:
      return {
        ...state,
        todosList: {
          ...state.todosList,
          error: action.payload
        }
      };
    default:
      return state;
  }
}
