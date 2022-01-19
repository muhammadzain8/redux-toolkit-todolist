import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todoReducer from './todos';
import { todosApi } from './todos/services';

export const store = configureStore({
  reducer: combineReducers({
    todos: todoReducer,
    [todosApi.reducerPath]: todosApi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});
