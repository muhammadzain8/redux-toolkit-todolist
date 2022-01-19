import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../utils/constants';

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/todos`,
    // prepareHeaders: (headers, { getState }) => {
    // const token = getState().auth.token;
    // // If we have a token set in state, let's assume that we should be passing it.
    // if (token) {
    //   headers.set('authorization', `Bearer ${token}`);
    // }
    // return headers;
    // },
  }),
  endpoints: (builder) => ({
    getAllTodos: builder.query({
      query: () => `/`,
      transformResponse: (res) => {
        return res.todos;
      },
    }),
    getTodoByName: builder.query({
      query: (name) => `/${name}`,
    }),
    updateTodoByName: builder.query({
      query: ({ id, ...patch }) => ({
        url: `post/${id}`,
        method: 'PATCH',
        body: patch,
      }),
    }),
  }),
});

export const { useGetAllTodosQuery, useGetTodoByNameQuery } = todosApi;
