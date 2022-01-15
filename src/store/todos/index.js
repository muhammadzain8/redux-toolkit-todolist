import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  loading: true,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos = [action.payload, ...state.todos];
      state.loading = false;
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((el) => el.id !== action.payload);
      state.loading = false;
    },
    toggleTodo: (state, action) => {
      state.todos = state.todos.map((el) =>
        el.id === action.payload ? { ...el, completed: !el.completed } : el
      );
      state.loading = false;
    },
    editTodo: (state, action) => {
      state.todos = state.todos.map((el) =>
        el.id === action.payload ? { ...el, ...action.payload } : el
      );
      state.loading = false;
    },
    clearTodos: (state) => {
      state.todos = [];
      state.loading = false;
    },
  },
});

export const { addTodo, removeTodo, toggleTodo, editTodo, clearTodos } =
  todosSlice.actions;
export default todosSlice.reducer;
