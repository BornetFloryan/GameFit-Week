import Vue from 'vue';
import VueRouter from 'vue-router';
import AccueilView from '../views/AccueilView.vue';
import TicketingView from "@/views/TicketingView.vue";
import PrestataireView from '@/views/PrestataireView.vue';
import PrestataireList from "@/components/PrestataireList.vue";
import PrestataireInfo from "@/components/PrestataireInfo.vue";

import AccountRoutes from './account.router';
import ServiceRoutes from './service.router';
import AdminRoutes from './admin.router';
import PrestataireRoutes from './provider.router';
import PrestationRouter from "./prestation.router";

import store from '@/store';

Vue.use(VueRouter);

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
    path: '/prestataire',
    name: 'prestataire',
    component: PrestataireView,
    children: [
      {
        path: 'list',
        name: 'prestataire-list',
        component: PrestataireList
      },
      {
        path: ':id',
        name: 'prestataire-info',
        component: PrestataireInfo
      },
    ]
  },

  ...AccountRoutes,
  ...ServiceRoutes,
  ...AdminRoutes,
  ...PrestataireRoutes,
  ...PrestationRouter,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.account.currentUser) {
      next({ name: 'login' });
    } else if (to.matched.some(record => record.meta.requiredPrivilege)) {
      const userPrivilege = store.state.account.currentUser.privilege;
      const requiredPrivilege = to.meta.requiredPrivilege;
      if (userPrivilege === requiredPrivilege) {
        next();
      } else {
        next({ name: 'home' });
      }
    } else {
      next();
    }
  } else if (to.name === 'login' || to.name === 'register') {
    if (store.state.account.currentUser) {
      next({ name: 'home' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
