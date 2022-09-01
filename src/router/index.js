import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import Perfil from '../views/admin/Perfil.vue'
import Usuario from "../views/admin/usuario/Usuario.vue"
import NotFound from '../views/errors/NotFound.vue'
import NoAutorizado from '../views/errors/NoAutorizado.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/admin/perfil',
    name: 'Perfil',
    component: Perfil,
    meta: {requireAuth: true}
  },
  {
    path: '/admin/usuario',
    name: 'Usuario',
    component: Usuario,
    meta: {requireAuth: true}
  },
  {
    path: '/no-autorizado',
    name: 'NoAutorizado',
    component: NoAutorizado
  },

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth){
    let token = localStorage.getItem("token");
    if(token){
      next();
    }else{
      next({name: 'Login'})
    }
  }else{
    next()
  }

});

export default router
