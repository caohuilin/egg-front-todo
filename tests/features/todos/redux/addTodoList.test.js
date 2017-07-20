import { expect } from 'chai';

import {
  TODOS_ADD_TODO_LIST,
} from 'src/features/todos/redux/constants';

import {
  addTodoList,
  reducer,
} from 'src/features/todos/redux/addTodoList';

describe('todos/redux/addTodoList', () => {
  it('returns correct action by addTodoList', () => {
    expect(addTodoList()).to.have.property('type', TODOS_ADD_TODO_LIST);
  });

  it('handles action type TODOS_ADD_TODO_LIST correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: TODOS_ADD_TODO_LIST }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
