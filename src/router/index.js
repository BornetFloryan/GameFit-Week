import Vue from 'vue'
import VueRouter from 'vue-router'
import AccueilView from '../views/AccueilView.vue'
import ServicesView from "../views/ServicesView.vue";
import TicketingView from "@/views/TicketingView.vue";
import AccountView from "@/views/AccountView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: AccueilView
  },
  {
    path: '/ticketing',
    name: 'ticketing',
    component: TicketingView
  },
  {
    path: '/services',
    name: 'services',
    component: ServicesView
  },
  {
    path: '/login',
    name: 'login',
    // import dynamique du composant, plutôt qu'en début de fichier, comme la route prédécente.
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/account',
    name: 'account',
    // import dynamique du composant, plutôt qu'en début de fichier, comme la route prédécente.
    component: AccountView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    // import dynamique du composant, plutôt qu'en début de fichier, comme la route prédécente.
    component: () => import('../views/DashBoardView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
