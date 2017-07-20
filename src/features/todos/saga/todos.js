import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import {
  TODOS_ADD_TODO_LIST,
  TODOS_ADD_TODO_LIST_SUCCESS,
  TODOS_ADD_TODO_LIST_FAILED
} from '../redux/constants';
import * as api from '../api';

function* getTodosList(action) {
  try {
        const res = yield call(api.getTodoList);
        if (typeof (res) === 'object') {
            yield put({ type: TODOS_ADD_TODO_LIST_SUCCESS, payload: res });
        } else {
            yield put({ type: TODOS_ADD_TODO_LIST_FAILED, payload: res });
        }
    } catch (e) {
        yield put({ type: TODOS_ADD_TODO_LIST_FAILED, payload: e });
    }
}

export default function* () {
    yield fork(takeLatest, TODOS_ADD_TODO_LIST, getTodosList);
};
