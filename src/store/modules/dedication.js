import DedicationService from '../../services/dedication.service';

const state = () => ({
    // state = les données centralisées
    animators: [],
    animatorAvailableDates: [],
    availableTimes: [],
    dedicationReservations: sessionStorage.getItem('dedicationReservations') || [],
    customerDedicationReservations: sessionStorage.getItem('customerDedicationReservations') || [],
});
// mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
const mutations = {
    updateAnimators(state, animators) {
        state.animators = animators;
    },
    updateAnimatorAvailableDates(state, date) {
        state.animatorAvailableDates = date;
    },
    updateAvailableTimes(state, times) {
        state.availableTimes = times;
    },
    updateDedicationReservations(state, dedicationReservations) {
        state.dedicationReservations = dedicationReservations;
        sessionStorage.setItem('dedicationReservations', dedicationReservations);
    },
    addDedicationReservation(state, dedicationReservation) {
        state.dedicationReservations.push(dedicationReservation);
        sessionStorage.setItem('dedicationReservations', state.dedicationReservations);
    },
    updateCustomerDedicationReservations(state, customerDedicationReservations){
        state.customerDedicationReservations = customerDedicationReservations;
        sessionStorage.setItem('customerDedicationReservations', customerDedicationReservations);
    }

};
// actions = fonctions asynchrone pour mettre à jour le state, en faisant appel aux mutations, via la fonction commit()
const actions = {
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
    async getDedicationReservations({ commit }) {
        try {
            let response = await DedicationService.getDedicationReservations();
            if (response.error === 0) {
                commit('updateDedicationReservations', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des réservations:', error);
        }
    },
    async addDedicationReservation({ commit }, dedicationReservation) {
        try {
            let response = await DedicationService.addDedicationReservation(dedicationReservation);
            if (response.error === 0) {
                commit('addDedicationReservation', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la réservation:', error);
            return { error: 1, data: 'Erreur lors de l\'ajout de la réservation' };
        }
    },
    async getCustomerDedicationReservations({commit}, customer){
        try {
            let response = await DedicationService.getCustomerDedicationReservations(customer);
            if (response.error === 0) {
                commit('updateCustomerDedicationReservations', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des réservations:', error);
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};