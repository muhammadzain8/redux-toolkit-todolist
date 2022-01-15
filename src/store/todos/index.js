import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  loading: true,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        console.log(`action`, action);
        state.todos = [action.payload, ...state.todos];
        state.loading = false;
      },
      prepare: (value) => {
        console.log(`value`, value);
        return { payload: { completed: false, id: nanoid(5), task: value } };
      },
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
        el.id === action.payload.id ? { ...el, task: action.payload.value } : el
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
