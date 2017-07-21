import { expect } from 'chai';

import {
  TODOS_UPDATE_TODO_LIST,
} from 'src/features/todos/redux/constants';

import {
  updateTodoList,
  reducer,
} from 'src/features/todos/redux/updateTodoList';

describe('todos/redux/updateTodoList', () => {
  it('returns correct action by updateTodoList', () => {
    expect(updateTodoList()).to.have.property('type', TODOS_UPDATE_TODO_LIST);
  });

  it('handles action type TODOS_UPDATE_TODO_LIST correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: TODOS_UPDATE_TODO_LIST }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
