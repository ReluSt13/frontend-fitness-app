// Utilities
import { defineStore } from 'pinia'
import axios from '../utils/axios.js';
import { handleSuccessAuthentication } from '../utils/function.js';

export const useAppStore = defineStore('app', {
  state: () => ({
    snackbar: false
  }),
  actions: {
    openSnackbar(value) {
      this.snackbar = value;
    },
    async login(payload) {
      const result = await axios.post('/User/login', payload)
        .then((response) => handleSuccessAuthentication(response.data))
        .catch((error) => {
          return error.response.data;
        });
      return result;
    },
    logout() {
      localStorage.removeItem('token');
    },
    async register(payload) {
      const response = await axios.post('/User/register', payload)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error.response.data;
        });
      return response;
    },
    isLoggedIn() {
      let token = localStorage.getItem('token');
      return token !== null && token.length > 0;
    },
    getToken() {
      return this.isLoggedIn() ? localStorage.getItem('token') : null;
    },
    getUser() {
      const userJson = localStorage.getItem('user');
      if (userJson) {
        let user = JSON.parse(userJson);
        return user;
      }
      return null;
    },
    async testRoles() {
      try {
        const response = await axios.get('/WeatherForecast/GetWeatherForecastForAdminsOnly');
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }
})
