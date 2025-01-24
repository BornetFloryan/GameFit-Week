import StandsService from '@/services/stands.service';
import store from "@/store";

const state = () => ({
    // state = les données centralisées
    stands: [],
    pavillons: [],
    standsReservations: [],
});
// mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
const mutations = {
    updateStands(state, stands) {
        state.stands = stands;
    },
    updatePavillons(state, pavillons) {
        state.pavillons = pavillons;
    },
    updateStandsReservations(state, standsReservations) {
        state.standsReservations = standsReservations;
    },
    modifyStand(state, stand) {
        let index = state.stands.findIndex((s) => s.id === stand.id);
        state.stands[index] = stand;
    },
    deleteStand(state, index) {
        state.stands.splice(index, 1);
    },
    modifyStandsReservations(state, standReservation) {
        let index = state.standsReservations.findIndex((s) => s._id === standReservation._id);
        state.standsReservations[index] = standReservation;
    },
    addStandReservation(state, standReservation) {
        state.standsReservations.push(standReservation);
    },
    deleteStandReservation(state, index) {
        state.standsReservations.splice(index, 1);
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
    async addStandReservation({ commit }, standReservation) {
        try {
            let response = await StandsService.addStandReservation(standReservation);
            if (response.error === 0) {
                commit('addStandReservation', standReservation);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la réservation des stands:', error);
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
                commit('modifyStandsReservations', response.data);
                return response;
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la modification des réservations des stands:', error);
        }
    },
    async deleteStand({ commit }, stand) {
        try {
            let response = await StandsService.deleteStand(stand);
            if (response.error === 0) {
                commit('deleteStand', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression des stands:', error);
        }
    },
    async deleteStandReservation({ commit }, _id) {
        try {
            let response = await StandsService.deleteStandReservation(_id);
            if (response.error === 0) {
                commit('deleteStandReservation', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de la réservation des stands:', error);
        }
    },
};

const getters = {
    getStandById: (state) => (_id) => {
        return state.stands.find((stand) => stand._id === _id);
    },
    getStandReservationById: (state) => (_id) => {
        return state.standsReservations.find((reservation) => reservation._id === _id);
    },
    getStandReservationsByStandId: (state) => (stand_id) => {
        return state.standsReservations.filter(reservation => reservation.stand_id === stand_id);
    },
    getStandsReservationsByStandIdAndDate: (state) => (stand_id, date) => {
        return state.standsReservations.filter((reservation) => reservation.stand_id === stand_id && reservation.date === date);
    },
    getStandsReservationsByCustomerId: (state) => (customer_id) => {
        return state.standsReservations.filter((reservation) => reservation.customer_id === customer_id);
    },
    getStandsReservationsByServiceId: (state) => (service_id) => {
        return state.standsReservations.filter((reservation) => reservation.service_id === service_id);
    },
    getStandsReservationsByCustomerIdAndServiceId: (state) => (customer_id, service_id) => {
        return state.standsReservations.filter((reservation) => reservation.customer_id === customer_id && reservation.service_id === service_id);
    },
    getStandsReservationsByCustomerIdAndServiceIdAndDate: (state) => (customer_id, service_id, date) => {
        return state.standsReservations.filter((reservation) => reservation.customer_id === customer_id && reservation.service_id === service_id && reservation.date === date);
    },
    getStandsReservationsByCustomerIdAndDateAndExcludingStandId: (state) => (customer_id, date, stand_id) => {
        if(store.state.account.currentUser == null){
            return {error: 1, status: 404, data: 'vous n\'Ãªtes pas connectÃ©'}
        }


        if (store.state.account.currentUser.privilege < '1'){
            return {error: 1, status: 404, data: 'vous n\'avez pas les droits pour effectuer cette action'}
        }

        return state.standsReservations.filter(res =>
            res.customer_id === customer_id
            && res.date === date
            && res.stand_id !== stand_id
        );
    },
    getPavillonById: (state) => (_id) => {
        return state.pavillons.find((pavillon) => pavillon._id === _id);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};