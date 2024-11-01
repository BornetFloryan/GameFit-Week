import Vue from 'vue'
import VueRouter from 'vue-router'
import AccueilView from '../views/AccueilView.vue'
import ServicesView from "../views/ServicesView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: AccueilView
  },
  {
    path: '/services/',
    name: 'services',
    component: ServicesView
  },
  {
    path: '/shop/login',
    name: 'shoplogin',
    // import dynamique du composant, plutôt qu'en début de fichier, comme la route prédécente.
    component: () => import('../views/ShopLoginView.vue')
  },
  {
    path: '/bank/amount',
    name: 'bankaccount',
    // import dynamique du composant, plutôt qu'en début de fichier, comme la route prédécente.
    component: () => import('../views/BankAccountView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
