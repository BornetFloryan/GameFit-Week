import DedicationService from '../../services/dedication.service';

const state = () => ({
    // state = les données centralisées
    animators: [],
    animatorAvailableDates: [],
    availableTimes: [],
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
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};