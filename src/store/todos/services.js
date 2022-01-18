import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../utils/constants';

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/todos`,
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
      query: (name) => `/${name}`,
      transformResponse: (res) => res.data.todos,
      pro,
    }),
    getTodoByName: builder.query({
      query: (name) => `/${name}`,
    }),
  }),
});
