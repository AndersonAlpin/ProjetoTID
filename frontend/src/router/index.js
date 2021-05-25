import Vue from 'vue'
import VueRouter from 'vue-router'
import MenuCategorias from '../views/MenuCategorias.vue'
import Register from '../views/Register.vue'
import Ranking from '../views/Ranking.vue'
import Login from '../views/Login.vue'
import About from '../views/About.vue'
import Menu from '../views/Menu.vue'
import Game from '../views/Game.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    component: About
    
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/menu/categorias',
    name: 'MenuCategorias',
    component: MenuCategorias
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/Ranking',
    name: 'Ranking',
    component: Ranking
  },
  {
    path: '/Game',
    name: 'Game',
    component: Game
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
