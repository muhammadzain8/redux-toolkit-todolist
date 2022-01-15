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
