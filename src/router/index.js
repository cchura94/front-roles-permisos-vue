import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import Perfil from '../views/admin/Perfil.vue'
import Usuario from "../views/admin/usuario/Usuario.vue"
import NotFound from '../views/errors/NotFound.vue'
import NoAutorizado from '../views/errors/NoAutorizado.vue'
import App from '../App.vue'
import { canNavigate } from '@/acl/routeProtection'
import Roles from '@/views/admin/role/Roles.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/admin'
    //component: HomeView
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
    component: LoginView,
    meta: {
      resource: 'Auth',
      action: 'read',
      redirectIfAuth: true
    }
  },
  {
    path: '/admin',
    component: App,
    meta: {requireAuth: true},
    children: [
      {
        path: 'perfil',
        name: 'Perfil',
        component: Perfil,
        meta: {
          requireAuth: true,
          action: 'view',
          resource: 'user'
        }
      },
      {
        path: 'usuario',
        name: 'Usuario',
        component: Usuario,
        meta: {
          requireAuth: true,
          action: 'viewAny',
          resource: 'user'
        }
      },
      {
        path: 'roles',
        name: 'Roles',
        component: Roles,
        meta: {
          action: 'viewAny',
          resource: 'role'
        }
      }
    ]
  },
  
  {
    path: '/no-autorizado',
    name: 'NoAutorizado',
    component: NoAutorizado,
    meta: {
      resource: 'Auth'
    }
  },

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  let token = localStorage.getItem("token");
  if(!canNavigate(to)){
    console.log('NO TIENE PERMISOS: ', canNavigate(to))
    // redireccionar al login 
    if(!token)
      return next({name: 'Login'})
    
    // si no tiene permisos
    return  next({name: 'NoAutorizado'})
  }

  if(to.meta.redirectIfAuth && token){
    next({name: 'Usuario'});
  }
  return next();


  /*
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
  */


});

export default router
