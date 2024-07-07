import axios from 'axios';

export const userClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL + 'users',
});

export const coursesClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL + 'courses',
});

export const authorsClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL + 'authors',
});

export const setAuthToken = (token: string) => {
  userClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  coursesClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  authorsClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
