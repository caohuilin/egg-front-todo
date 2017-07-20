import { fork } from 'redux-saga/effects';
import todos from './todos';

export default function* root() {
    yield fork(todos);
};
