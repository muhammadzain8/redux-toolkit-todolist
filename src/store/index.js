import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todoReducer from './todos';

export const store = configureStore({
  reducer: combineReducers({ todos: todoReducer }),
});
