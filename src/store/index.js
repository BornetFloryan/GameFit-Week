import Vue from 'vue'
import Vuex from 'vuex'
import BankService from '../services/bankaccount.service'

Vue.use(Vuex)

import ShopService from '../services/shop.service'

import DedicationService from '../services/dedication.service'

export default new Vuex.Store({
  // state = les données centralisées
  state: () => ({
    viruses: [],
    shopUser: null,
    accountAmount: 0,
    accountTransactions : [],
    accountNumberError : 0,

    selectedService: localStorage.getItem('selectedService') || '',
    animatorAvailableDates: [],
    availableTimes: [],
    animators:[],
  }),
  // mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
  mutations: {
    setSelectedService(state, service) {
      state.selectedService = service;
      localStorage.setItem('selectedService', service);
    },
    updateAnimatorAvailableDates(state, date) {
        state.animatorAvailableDates = date;
    },
    updateAvailableTimes(state, times) {
        state.availableTimes = times;
    },
    updateAnimators(state, animators) {
        state.animators = animators;
    },

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
    selectService({ commit }, service) {
      commit('setSelectedService', service);
    },
    async getAnimators({ commit }) {
      try {
        let response = await DedicationService.getAnimators();
        if (response.error === 0) {
          commit('updateAnimators', response.data);
        } else {
          console.error(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des animateurs:', error);
      }
    },
    async getAnimatorAvailableDates({ commit }, _id) {
      try {
        let response = await DedicationService.getAnimatorAvailableDates(_id);
        if (response.error === 0) {
          commit('updateAnimatorAvailableDates', response.data);
        } else {
          console.error(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des dates:', error);
      }
    },
    async getAvailableTimes({ commit }, date) {
        try {
            let response = await DedicationService.getAvailableTimes(date);
            if (response.error === 0) {
            commit('updateAvailableTimes', response.data);
            } else {
            console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des horaires:', error);
        }
    },

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
