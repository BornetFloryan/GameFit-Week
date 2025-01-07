import PrestationService from '../../services/prestation.service';
const state = () => ({
    // state = les données centralisées
    serviceCategories: [],
    providerServiceCategories: [],
    serviceReservations: [],
});

// mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
const mutations = {
    updateServiceCategories(state, serviceCategories) {
        state.serviceCategories = serviceCategories;
    },
    updateProviderServiceCategories(state, providerServiceCategories) {
        state.providerServiceCategories = providerServiceCategories;
    },
    addProviderServiceCategory(state, providerServiceCategory) {
        state.providerServiceCategories.push(providerServiceCategory);
    },
    modifyProviderServiceCategorytegory(state, providerServiceCategory) {
        let index = state.providerServiceCategories.findIndex(e => e._id === providerServiceCategory._id);
        if (index !== -1) {
            state.providerServiceCategories[index] = providerServiceCategory;
        }
    },
    deleteProviderServiceCategory(state, index) {
        state.providerServiceCategories.splice(index, 1);
    },
    updateServiceReservations(state, serviceReservations) {
        state.serviceReservations = serviceReservations;
    },
    addServiceReservation(state, serviceReservation) {
        state.serviceReservations.push(serviceReservation);
    },
    modifyServiceReservation(state, serviceReservation) {
        let index = state.serviceReservations.findIndex(e => e._id === serviceReservation._id);
        if (index !== -1) {
            state.serviceReservations[index] = serviceReservation;
        }
    },
    deleteServiceReservation(state, index) {
        state.serviceReservations.splice(index, 1);
    },
};

// actions = fonctions asynchrone pour mettre à jour le state, en faisant appel aux mutations, via la fonction commit()
const actions = {
    async getServiceCategories({ commit }) {
        try {
            let response = await PrestationService.getServiceCategories();
            if (response.error === 0) {
                commit('updateServiceCategories', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des services:', error);
        }
    },
    async getProviderServiceCategories({ commit }) {
        try {
            let response = await PrestationService.getProviderServiceCategories();
            if (response.error === 0) {
                commit('updateProviderServiceCategories', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des services prestataires:', error);
        }
    },
    async addProviderServiceCategory({ commit }, providerServiceCategory) {
        try {
            let response = await PrestationService.addProviderServiceCategory(providerServiceCategory);
            if (response.error === 0) {
                commit('addProviderServiceCategory', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de l\'ajout d\'un service prestataire:', error);
            return { error: 1, data: 'Erreur lors de l\'ajout d\'un service prestataire' };
        }
    },
    async modifyProviderServiceCategory({ commit }, providerServiceCategory) {
        try {
            let response = await PrestationService.modifyProviderServiceCategory(providerServiceCategory);
            if (response.error === 0) {
                commit('modifyProviderServiceCategorytegory', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de la modification d\'un service prestataire:', error);
            return { error: 1, data: 'Erreur lors de la modification d\'un service prestataire' };
        }
    },
    async deleteProviderServiceCategory({ commit }, providerServiceCategory) {
        try {
            let response = await PrestationService.deleteProviderServiceCategory(providerServiceCategory);
            if (response.error === 0) {
                commit('deleteProviderServiceCategory', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de la suppression d\'un service prestataire:', error);
            return { error: 1, data: 'Erreur lors de la suppression d\'un service prestataire' };
        }
    },
    async updateProviderServiceCategoryState({ commit }, providerServiceCategory) {
        try {
            let response = await PrestationService.modifyProviderServiceCategory(providerServiceCategory);
            if (response.error === 0) {
                commit('modifyProviderServiceCategorytegory', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de la modification de l\'état d\'un service prestataire:', error);
            return { error: 1, data: 'Erreur lors de la modification de l\'état d\'un service prestataire' };
        }
    },
    async getServiceReservations({ commit }) {
        try {
            let response = await PrestationService.getServiceReservations();
            if (response.error === 0) {
                commit('updateServiceReservations', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des réservations:', error);
        }
    },
    async addServiceReservation({ commit }, serviceReservation) {
        try {
            let response = await PrestationService.addServiceReservation(serviceReservation);
            if (response.error === 0) {
                commit('addServiceReservation', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de l\'ajout d\'une réservation:', error);
            return { error: 1, data: 'Erreur lors de l\'ajout d\'une réservation' };
        }
    },
    async modifyServiceReservation({ commit }, serviceReservation) {
        try {
            let response = await PrestationService.modifyServiceReservation(serviceReservation);
            if (response.error === 0) {
                commit('modifyServiceReservation', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de la modification d\'une réservation:', error);
            return { error: 1, data: 'Erreur lors de la modification d\'une réservation' };
        }
    },
    async deleteServiceReservation({ commit }, id) {
        try {
            let response = await PrestationService.deleteServiceReservation(id);
            if (response.error === 0) {
                commit('deleteServiceReservation', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de la suppression d\'une réservation:', error);
            return {error: 1, data: 'Erreur lors de la suppression d\'une réservation'};
        }
    },
};

const getters = {
    getServiceCategoryById: (state) => (_id) => {
        return state.serviceCategories.find((sc) => sc._id === _id);
    },
    getProviderServiceCategoriesByCustomerId: (state) => (_id) => {
        return state.providerServiceCategories.filter((psc) => psc.customer_id === _id);
    },
    getProviderServiceCategoriesByCustomerIdAndServiceID: (state) => (_id, service_id) => {

        return state.providerServiceCategories.find((psc) => psc.customer_id === _id && psc.service_category_id === service_id);
    },
    getProviderServiceCategoriesCustomerId: (state) => {
        return state.providerServiceCategories
            .filter((psc) => psc.customer_id)
            .map((psc) => psc.customer_id);
    },
    getProviderOfferingServices: (state, getters, rootState) => {
        const providerIds = getters.getProviderServiceCategoriesCustomerId;
        let providerServices = [];
        for (let i = 0; i < providerIds.length; i++) {
            const services = getters.getProviderServiceCategoriesByCustomerId(providerIds[i]);
            if (services.some(service => {
                return service.state === "1";
            })) {
                providerServices.push(...services);
            }
        }
        const uniqueProviderIds = [...new Set(providerServices.map(psc => psc.customer_id))];
        return rootState.account.customersAccounts.filter(customer => {
            return uniqueProviderIds.includes(customer._id);
        });
    },
    getServiceReservationsById: (state) => (_id) => {
        return state.serviceReservations.find((sr) => sr._id === _id);
    },
    getServiceReservationsByTicketId: (state) => (ticket_id) => {
        return state.serviceReservations.filter((sr) => sr.ticket_id === ticket_id);
    },
    getServiceReservationByServiceId: (state) => (service_id) => {
        return state.serviceReservations.filter((sr) => sr.service_id === service_id);
    },
    getServiceReservationsByStandsReservationsIdAndServiceId: (state) => (standsReservationsId, service_id) => {
        return state.serviceReservations.filter((sr) =>
            sr.stands_reservations_id === standsReservationsId
            && sr.service_id === service_id);
    },
    getServiceReservationsByTicketIdAndDate: (state) => (ticket_id, date) => {
        return state.serviceReservations.filter((sr) => sr.ticket_id === ticket_id && sr.date === date);
    },
    getServiceReservationsByDate: (state) => (date) => {
        return state.serviceReservations.filter((sr) => sr.date === date);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};