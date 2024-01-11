import { createRouter, createWebHistory } from 'vue-router';
import { useAppStore } from '../store/app.js';
import Home from '../views/HomeView.vue';
import Login from '../views/LoginView.vue';
import Register from '../views/RegisterView.vue';

const routes = [
  { 
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      const appStore = useAppStore();
      if (!appStore.isLoggedIn()) {
        next({ name: 'Login' });
      } else {
        next();
      }
    }
  },
  { 
    name: 'Login',
    path: '/login',
    component: Login,
    beforeEnter: (to, from, next) => {
      const appStore = useAppStore();
      if (appStore.isLoggedIn()) {
        next({ name: 'Home' });
      } else {
        next();
      }
    }
  },
  {
    name: 'Register', 
    path: '/register', 
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
