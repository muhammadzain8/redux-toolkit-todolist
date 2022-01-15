import axios from 'axios';
import { API_BASE_URL } from './constants';

export const apiCall = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    // * 'Authorization': 'token <your-token-here>
  },
});
