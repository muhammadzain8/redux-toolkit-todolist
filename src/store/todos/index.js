import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
  createTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from './extraReducers';

const todosAdapter = createEntityAdapter({
  selectId: (todo) => todo._id,
});

const initialState = {
  fetching: true,
  error: null,
  addingNew: false,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState: todosAdapter.getInitialState(initialState),
  reducers: {
    pushNewTodo: todosAdapter.addOne,
    addManyTodos: todosAdapter.addMany,
    removeTodo: todosAdapter.removeOne,
    editTodo: todosAdapter.updateOne,
  },

  // * All async thunk reducers gives us 3 reducers each ,
  // * pending , fulfilled and rejected
  extraReducers: {
    // * Fetch Todos Reducers
    [fetchTodos.pending]: (state) => {
      state.fetching = true;
      state.error = null;
    },
    [fetchTodos.fulfilled]: (state, { payload }) => {
      state.fetching = false;
      // state.todos = payload.todos;
      console.log(`payload.todos`, payload.todos);
      todosAdapter.addMany(state, payload.todos);
    },
    [fetchTodos.rejected]: (state, { payload }) => {
      state.fetching = false;
      state.error =
        payload?.message ||
        payload.response?.data?.message ||
        'Something Went Wrong';
    },

    // * Create Todo Reducers
    [createTodo.pending]: (state) => {
      state.addingNew = true;
      state.error = null;
    },
    [createTodo.fulfilled]: (state, { payload }) => {
      state.addingNew = false;
      // state.todos = [...state.todos, payload.todo];
      todosAdapter.addOne(state, payload.todo);
    },
    [createTodo.rejected]: (state, { payload }) => {
      console.log(`payload`, payload);
      state.addingNew = false;
      state.error = payload.message || 'Something Went Wrong';
    },

    // * Delete Todo Reducers
    [deleteTodo.pending]: (state) => {
      // state.loading = true;
      state.error = null;
    },
    [deleteTodo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      // state.todos = state.todos.filter((el) => el._id !== payload?.todo._id);
      todosAdapter.removeOne(state, payload.todo._id);
    },
    [deleteTodo.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error =
        payload?.message ||
        payload.response?.data?.message ||
        'Something Went Wrong';
    },

    // * Update Todos Reducers
    [updateTodo.pending]: (state) => {
      // state.loading = true;
      state.error = null;
    },
    [updateTodo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      // state.todos = state.todos.map((el) =>
      //   el._id === payload.todo._id ? payload.todo : el
      // );
      todosAdapter.updateOne(state, {
        id: payload.todo._id,
        changes: { ...payload.todo },
      });
    },
    [updateTodo.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error =
        payload?.message ||
        payload.response?.data?.message ||
        'Something Went Wrong';
    },

    // *
  },
});

export const globalTodosReducers = todosAdapter.getSelectors((st) => st.todos);
export const simpleTodosReducers = todosAdapter.getSelectors();

export const { addTodo, removeTodo, toggleTodo, editTodo, clearTodos } =
  todosSlice.actions;
export default todosSlice.reducer;
