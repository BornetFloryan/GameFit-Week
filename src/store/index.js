import Vue from 'vue';
import Vuex from 'vuex';
import account from './modules/account';
import dedication from './modules/dedication';
import customer from "./modules/customer";
import service from './modules/service';
import login from './modules/login';
import ticket from './modules/ticket';
import stands from './modules/stands';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    account,
    dedication,
    customer,
    service,
    login,
    ticket,
    stands,
  },
});