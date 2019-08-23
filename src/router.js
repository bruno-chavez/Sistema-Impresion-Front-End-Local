import Vue from 'vue'
import Router from 'vue-router'

// Auth
import Logout from "./components/Auth/Logout";

// Student
import StudentDashboard from './components/User/StudentDashboard'
import StudentLogin from "./components/User/StudentLogin";

import {eventBus} from "./eventBus";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'studentLogin',
      component: StudentLogin
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/student/dashboard',
      name: 'userDashboard',
      component: StudentDashboard
    },
  ]
});

router.beforeEach((to, from, next) => {
  eventBus.$emit('check');
  next();
});

export default router
