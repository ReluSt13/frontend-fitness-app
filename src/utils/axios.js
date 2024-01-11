import axios from 'axios';
import { useAppStore } from '../store/app.js';

const instance = axios.create({
  baseURL: 'https://localhost:7272',
  withCredentials: true,
});

instance.interceptors.request.use(
  config => {
    const token = useAppStore().getToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
