import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("../views/Films/AllFilmsView.vue"),
      createComponent: () => import("../views/Films/AllFilmsView.vue"),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/addFilm',
      name: 'films',
      component: () => import("../views/Films/CreateFilmView.vue"),
      createComponent: () => import("../views/Films/CreateFilmView.vue"),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import("../views/Users/AllUsersView.vue")
    },
    {
      path: '/addUser',
      name: 'addUsers',
      component: () => import("../views/Users/CreateUserView.vue"),
      createComponent: () => import("../views/Users/CreateUserView.vue"),
    }
  ]
})

export default router
