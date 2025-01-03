import StandsService from '@/services/stands.service';

const state = () => ({
    // state = les données centralisées
    stands: localStorage.getItem('stands') || [],
    pavillons: localStorage.getItem('pavillons') || [],
    standsReservations: [],
});
// mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
const mutations = {
    updateStands(state, stands) {
        state.stands = stands;
        localStorage.setItem('stands', stands);
    },
    updatePavillons(state, pavillons) {
        state.pavillons = pavillons;
        localStorage.setItem('pavillons', pavillons);
    },
    updateStandsReservations(state, standsReservations) {
        state.standsReservations = standsReservations;
    },
    modifyStand(state, stand) {
        let index = state.stands.findIndex((s) => s.id === stand.id);
        state.stands[index] = stand;
        localStorage.setItem('stands', state.stands);
    },
    modifyStandsReservations(state, standReservation) {
        let index = state.standsReservations.findIndex((s) => s.id === standReservation.id);
        state.standsReservations[index] = standReservation;
    }
};
// actions = fonctions asynchrone pour mettre à jour le state, en faisant appel aux mutations, via la fonction commit()
const actions = {
    async getStands({ commit }) {
        try {
            let response = await StandsService.getStands();
            if (response.error === 0) {
                commit('updateStands', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des stands:', error);
        }
    },
    async getPavillons({ commit }) {
        try {
            let response = await StandsService.getPavillons();
            if (response.error === 0) {
                commit('updatePavillons', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des pavillons:', error);
        }
    },
    async getStandsReservations({ commit }) {
        try {
            let response = await StandsService.getStandsReservations();
            if (response.error === 0) {
                commit('updateStandsReservations', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des réservations des stands:', error);
        }
    },
    async modifyStand({ commit }, stand) {
        try {
            let response = await StandsService.modifyStand(stand);
            if (response.error === 0) {
                commit('modifyStand', stand);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la modification des stands:', error);
        }
    },
    async modifyStandsReservations({ commit }, standReservation) {
        try {
            let response = await StandsService.modifyStandsReservations(standReservation);
            if (response.error === 0) {
                commit('modifyStandsReservations', standReservation);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la modification des réservations des stands:', error);
        }
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};