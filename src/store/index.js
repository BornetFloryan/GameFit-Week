import Vue from 'vue';
import Vuex from 'vuex';
import account from './modules/account';
import animator from './modules/animator';
import customer from "./modules/customer";
import service from './modules/service';
import user from './modules/user';
import ticket from './modules/ticket';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    account,
    animator,
    customer,
    service,
    user,
    ticket,
  },
});