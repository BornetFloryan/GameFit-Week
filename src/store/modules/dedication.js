import DedicationService from '../../services/dedication.service';

const state = () => ({
    // state = les données centralisées
    animators: [],
    dedicationDates: localStorage.getItem('availableDates') ? localStorage.getItem('availableDates') : [],
    animatorDedicationDates: [],
    dedicationTimes: [],
    dedicationReservations: localStorage.getItem('dedicationReservations') ? localStorage.getItem('dedicationReservations') : [],
    customerDedicationReservations: localStorage.getItem('customerDedicationReservations') ? localStorage.getItem('customerDedicationReservations') : [],
    sportsCategories: [],
});

// mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
const mutations = {
    updateAnimators(state, animators) {
        state.animators = animators;
    },
    updateDedicationDates(state, dates) {
        state.dedicationDates = dates;
        localStorage.setItem('availableDates', dates);
    },
    addDedicationDates(state, data) {
        state.dedicationDates.push(data);
        localStorage.setItem('availableDates', state.dedicationDates);
    },
    modifyDedicationDates(state, data) {
        let index = state.dedicationDates.findIndex(e => e._id === data._id);
        if (index !== -1) {
            state.dedicationDates[index] = data;
        }
        localStorage.setItem('availableDates', state.dedicationDates);
    },
    deleteDedicationDates(state, data) {
        let index = state.dedicationDates.findIndex(e => e._id === data._id);
        if (index !== -1) {
            state.dedicationDates.splice(index, 1);
        }
        localStorage.setItem('availableDates', state.dedicationDates);
    },
    updateAnimatorDedicationDates(state, date) {
        state.animatorDedicationDates = date;
    },
    updateDedicationTimes(state, times) {
        state.dedicationTimes = times;
    },
    updateDedicationReservations(state, dedicationReservations) {
        state.dedicationReservations = dedicationReservations;
        localStorage.setItem('dedicationReservations', dedicationReservations);
    },
    addDedicationReservation(state, dedicationReservation) {
        state.dedicationReservations.push(dedicationReservation);
        localStorage.setItem('dedicationReservations', state.dedicationReservations);
    },
    updateCustomerDedicationReservations(state, customerDedicationReservations){
        state.customerDedicationReservations = customerDedicationReservations;
        localStorage.setItem('customerDedicationReservations', customerDedicationReservations);
    },
    updateSportsCategories(state, sportsCategories){
        state.sportsCategories = sportsCategories;
    },
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
    async getDedicationDates({ commit }) {
        try {
            let response = await DedicationService.getDedicationDates();
            if (response.error === 0) {
                commit('updateDedicationDates', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des dates:', error);
        }
    },
    async addDedicationDates({ commit }, data) {
        try {
            let response = await DedicationService.addDedicationDates(data);
            if (response.error === 0) {
                if(response.data)
                    commit('addDedicationDates', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la date:', error);
            return { error: 1, data: 'Erreur lors de l\'ajout de la date' };
        }
    },
    async modifyDedicationDates({ commit }, data) {
        try {
            let response = await DedicationService.modifyDedicationDates(data);
            if (response.error === 0) {
                commit('modifyDedicationDates', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de la modification de la date:', error);
            return { error: 1, data: 'Erreur lors de la modification de la date' };
        }
    },
    async deleteDedicationDates({ commit }, data) {
        try {
            let response = await DedicationService.deleteDedicationDates(data);
            if (response.error === 0) {
                commit('deleteDedicationDates', data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de la suppression de la date:', error);
            return {error: 1, data: 'Erreur lors de la suppression de la date'};
        }
    },
    async getAnimatorDedicationDates({ commit }, animator) {
        try {
            let response = await DedicationService.getAnimatorDedicationDates(animator);
            if (response.error === 0) {
                commit('updateAnimatorDedicationDates', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des dates:', error);
        }
    },
    async getDedicationTimes({ commit }, date) {
        try {
            let response = await DedicationService.getDedicationTimes(date);
            if (response.error === 0) {
                commit('updateDedicationTimes', response.data);
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
            return response.data;
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
    async getSportsCategories({commit}){
        try {
            let response = await DedicationService.getSportsCategories();
            if (response.error === 0) {
                commit('updateSportsCategories', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories de sports:', error);
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};