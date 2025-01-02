import Vue from 'vue';
import Vuex from 'vuex';
import dedication from './modules/dedication';
import account from "./modules/account";
import ticket from './modules/ticket';
import stands from './modules/stands';
import prestation from './modules/prestation';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dedication,
    account,
    ticket,
    stands,
    prestation,
  },
});