
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/dashboard.vue';
import Layout from '@/views/pages/Layout.vue';
import jobs from '@/views/jobs.vue';
import candidates from '@/views/candidates.vue'
import calendar from '@/views/calendar.vue';
import reports from '@/views/reports.vue';
import dashboard from '@/views/dashboard.vue'
import Login from '@/views/Auth/Login.vue'
import users from '@/views/users.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Layout
    // },
    {
      path: '/Layout',
      name: 'Layout',
      component: Layout,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/jobs',
          name: 'jobs',
          component: jobs,
              meta: {
                requiresAuth: true
              },
        },
        {
          path: '/candidates',
          name: 'candidates',
          component: candidates,
              meta: {
                requiresAuth: true
              },
        },
        {
          path: '/users',
          name: 'users',
          component: users,
              meta: {
                requiresAuth: true
              },
        },
        {
          path: '/calendar',
          name: 'calendar',
          component: calendar,
              meta: {
                requiresAuth: true
              },
        },
        {
          path: '/reports',
          name: 'reports',
          component: reports,
              meta: {
                requiresAuth: true
              },
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: dashboard,
        }
     ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let isConnect = localStorage.getItem('isConnect');
  if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!isConnect) {
          next({
              name: '/Login'
          })
      } else {
          next()
      }
  } else {
      next()
  }
})

export default router
