// router/index.js
import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RopaHombre from '../views/RopaHombre.vue'
import RopaMujer from '../views/RopaMujer.vue'
import ElectronicaView from '../views/ElectronicaView.vue'
import CarritoView from '../views/CarritoView.vue'
import Error404View from '../views/Error404View.vue';


Vue.use(Router)

const routes = [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/ropa-hombre',
      name: 'RopaHombre',
      component: RopaHombre
    },
    {
      path: '/ropa-mujer',
      name: 'RopaMujer',
      component: RopaMujer
    },
    {
      path: '/electronica',
      name: 'Electronica',
      component: ElectronicaView
    },
    {
      path: '/carrito',
      name: 'Carrito',
      component: CarritoView 
    },
    {
      path: '*',
      name: 'error404',
      component: Error404View
    },
  ]
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  
  export default router

