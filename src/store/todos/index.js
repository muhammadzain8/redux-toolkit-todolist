import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { apiCall } from '../../utils/api';
import { API_BASE_URL } from '../../utils/constants';

// * Extra Reducers
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    return await apiCall
      .get(`${API_BASE_URL}/todos`)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (task, { rejectWithValue }) => {
    console.log(`task`, task);
    return apiCall
      .post(`${API_BASE_URL}/todos`, {
        task,
        _id: nanoid(5),
      })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

export const deleteTodo = createAsyncThunk(
  `todos/deleteTodo`,
  async (id, { rejectWithValue }) =>
    apiCall
      .delete(`${API_BASE_URL}/todos/${id}`, { method: 'DELETE' })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data))
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (data, { rejectWithValue }) =>
    apiCall
      .patch(`${API_BASE_URL}/todos/${data.id}`, {
        task: data.task,
      })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data))
  //* Use `err.response.data` as `action.payload` for a `rejected` action,
  //* by explicitly returning it using the `rejectWithValue()` utility
);

const initialState = {
  todos: [],
  fetching: true,
  error: null,
  addingNew: false,
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
      // * Prepare is a middleware between action and reducer
      // * its usage is to modify payload before passing it to reducer
      // * e.g in our case , we are adding id
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
      state.todos = payload.todos;
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
      state.todos = [payload.todo, ...state.todos];
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
      state.todos = state.todos.filter((el) => el._id !== payload?.todo._id);
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
      state.todos = state.todos.map((el) =>
        el._id === payload.todo._id ? payload.todo : el
      );
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

export const { addTodo, removeTodo, toggleTodo, editTodo, clearTodos } =
  todosSlice.actions;
export default todosSlice.reducer;
