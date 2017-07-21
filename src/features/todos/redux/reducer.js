import initialState from './initialState';
import { reducer as todoListReducer } from './getTodoList';
import { reducer as updateTodoListReducer } from './updateTodoList';
import { reducer as addTodoListReducer } from './addTodoList';

const reducers = [
  todoListReducer,
  updateTodoListReducer,
  addTodoListReducer
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Put global reducers here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
