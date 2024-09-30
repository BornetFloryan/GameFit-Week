import Vue from 'vue'
import Vuex from 'vuex'
import BankService from '../services/bankaccount.service'

Vue.use(Vuex)

import ShopService from '../services/shop.service'

export default new Vuex.Store({
  // state = les données centralisées
  state: () => ({
    viruses: [],
    shopUser: null,
    accountAmount: 0,
    accountTransactions : [],
    accountNumberError : 0,
  }),
  // mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
  mutations: {
    updateViruses(state, viruses) {
      state.viruses = viruses
    },
    updateShopUser(state, user) {
      state.shopUser = user
    },
      updateAccountAmount(state, mount) {
      state.accountAmount = mount
    },
    updateAccountTransactions(state, transactions) {
      state.accountTransactions = transactions;
    }
  },
  // actions = fonctions asynchrone pour mettre à jour le state, en faisant appel aux mutations, via la fonction commit()
  actions: {
    async shopLogin({commit}, data) {
      console.log('login');
      let response = await ShopService.shopLogin(data)
      if (response.error === 0) {
        commit('updateShopUser', response.data)
      }
      else {
        console.log(response.data)
      }
    },
    async getAllViruses({commit}) {
      console.log('récupération des viruses');
      let response = await ShopService.getAllViruses()
      if (response.error === 0) {
        commit('updateViruses', response.data)
      }
      else {
        console.log(response.data)
      }
    },
    async getAccountAmount({commit}, data) {
      console.log('récupération du montant du compte');
      let response = await BankService.getAccountAmount(data)
      if (response.error === 0) {
        commit('updateAccountAmount', response.data)
      }
      else {
        console.log(response.data)
      }
    },
    async getAccountTransaction({commit}, data) {
      console.log("récupération des transactions du compte");
      let response = await BankService.getAccountTransaction(data)
      if (response.error === 0) {
        commit('updateAccountTransactions', response.data)
      }
      else {
        console.log(response.data)
      }
    }
  }
})
