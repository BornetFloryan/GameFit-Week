import Vue from 'vue'
import VueRouter from 'vue-router'
import AccueilView from '../views/AccueilView.vue'
import ServicesView from "../views/ServicesView.vue";
import TicketingView from "@/views/TicketingView.vue";
import BracketsView from "@/views/BracketsView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: AccueilView
  },{
    path: '/brackets',
    name: 'brackets',
    component: BracketsView
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router