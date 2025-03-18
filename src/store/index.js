import Vue from 'vue';
import Vuex from 'vuex';
import account from "./modules/account";
import ticket from './modules/ticket';
import stands from './modules/stands';
import prestation from './modules/prestation';
import basket from './modules/basket';
import  goodies from './modules/goodies';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    stands,
    account,
    ticket,
    prestation,
    basket,
    goodies,
  },
});