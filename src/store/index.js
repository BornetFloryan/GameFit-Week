import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import LoginService from '../services/login.service'
import DedicationService from '../services/dedication.service'

export default new Vuex.Store({
  // state = les données centralisées
  state: () => ({
    currentUser: sessionStorage.getItem('currentUser') || null,
    selectedService: localStorage.getItem('selectedService') || '',
    selected: '',
    animatorAvailableDates: [],
    availableTimes: [],
    animators: [],
    customersAccounts: sessionStorage.getItem('customersAccounts') || [],
  }),
  // mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
  mutations: {
    updateCurrentUser(state, user) {
      state.currentUser = user;
      if (user === null) {
        sessionStorage.removeItem('currentUser');
      } else {
        sessionStorage.setItem('currentUser', user);
      }
    },
    updateSelectedService(state, service) {
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
    updateCustomersAccounts(state, customers) {
      state.customersAccounts = customers;
      sessionStorage.setItem('customersAccounts', customers);
    },
    addCustomerAccount(state, customer) {
      state.customersAccounts.push(customer);
      sessionStorage.setItem('customersAccounts', state.customersAccounts);
    },
  },
  // actions = fonctions asynchrone pour mettre à jour le state, en faisant appel aux mutations, via la fonction commit()
  actions: {
    setSelectService({ commit }, service) {
      commit('updateSelectedService', service);
    },
    async setCurrentUser({ commit }, data) {
      try {
        console.log('non');
        if (data === null) {
          commit('updateCurrentUser', null);
          return { error: 0, data: 'Déconnexion réussie' };
        }

        let response = await LoginService.setCurrentUser(data);
        if (response.error === 0) {
          commit('updateCurrentUser', response.data);
        }
        return response;
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        return { error: 1, data: 'Erreur lors de la connexion' };
      }
    },
    async getCustomersAccounts({ commit }) {
      try {
        let response = await LoginService.getCustomersAccounts();
        if (response.error === 0) {
          commit('updateCustomersAccounts', response.data);
        } else {
          console.error(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des comptes:', error);
      }
    },
    async addCustomerAccount({ commit }, customer) {
      try {
        let response = await LoginService.addCustomerAccount(customer);
        if (response.error === 0) {
          commit('addCustomerAccount', response.data);
        }
        return response;
      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        return { error: 1, data: 'Erreur lors de l\'ajout de l\'utilisateur' };
      }
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
    async getAnimatorAvailableDates({ commit }, animator) {
      try {
        let response = await DedicationService.getAnimatorAvailableDates(animator);
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
  }
})