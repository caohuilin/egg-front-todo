import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import {
  TODOS_GET_TODO_LIST,
  TODOS_GET_TODO_LIST_SUCCESS,
  TODOS_GET_TODO_LIST_FAILED,
  TODOS_UPDATE_TODO_LIST,
  TODOS_UPDATE_TODO_LIST_SUCCESS,
  TODOS_UPDATE_TODO_LIST_FAILED,
  TODOS_ADD_TODO_LIST,
  TODOS_ADD_TODO_LIST_SUCCESS,
  TODOS_ADD_TODO_LIST_FAILED
} from '../redux/constants';
import * as api from '../api';

function* getTodosList(action) {
  try {
        const res = yield call(api.getTodoList);
        if (typeof (res) === 'object') {
            yield put({ type: TODOS_GET_TODO_LIST_SUCCESS, payload: res });
        } else {
            yield put({ type: TODOS_GET_TODO_LIST_FAILED, payload: res });
        }
    } catch (e) {
        yield put({ type: TODOS_GET_TODO_LIST_FAILED, payload: e });
    }
}

function* updateTodoList(action) {
  try {
        const res = yield call(api.updateTodoList, action.payload);
        if (typeof (res) === 'object') {
            yield put({ type: TODOS_UPDATE_TODO_LIST_SUCCESS, payload: res });
            yield put({ type: TODOS_GET_TODO_LIST });
        } else {
            yield put({ type: TODOS_UPDATE_TODO_LIST_FAILED, payload: res });
        }
    } catch (e) {
        yield put({ type: TODOS_UPDATE_TODO_LIST_FAILED, payload: e });
    }
}

function* addTodoList(action) {
  try {
        const res = yield call(api.addTodoList, action.payload);
        if (typeof (res) === 'object') {
            yield put({ type: TODOS_ADD_TODO_LIST_SUCCESS, payload: res });
            yield put({ type: TODOS_GET_TODO_LIST });
        } else {
            yield put({ type: TODOS_ADD_TODO_LIST_FAILED, payload: res });
        }
    } catch (e) {
        yield put({ type: TODOS_ADD_TODO_LIST_FAILED, payload: e });
    }
}

export default function* () {
    yield fork(takeLatest, TODOS_GET_TODO_LIST, getTodosList);
    yield fork(takeLatest, TODOS_UPDATE_TODO_LIST, updateTodoList);
    yield fork(takeLatest, TODOS_ADD_TODO_LIST, addTodoList);
};
