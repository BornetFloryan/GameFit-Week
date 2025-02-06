import PrestationService from '../../services/prestation.service';
import store from "@/store";

const state = () => ({
    // state = les données centralisées
    serviceCategories: [],
    providerServiceCategories: [],
    serviceReservations: [],
    guestbookEntries: [],
    providerGuestbookStatus: [],
    providerScheduleStatus: [],
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
    updateGuestbookEntries(state, guestbookEntries) {
        state.guestbookEntries = guestbookEntries;
    },
    addGuestbookEntry(state, guestbookEntry) {
        state.guestbookEntries.push(guestbookEntry);
    },
    updateGuestbookStatus(state, providerGuestbookStatus) {

        state.providerGuestbookStatus = providerGuestbookStatus;
    },
    addGuestbookStatus(state, providerGuestbookStatus) {
        state.providerGuestbookStatus.push(providerGuestbookStatus);
    },
    modifyGuestbookStatus(state, providerGuestbookStatus) {
        let index = state.providerGuestbookStatus.findIndex(e => e._id === providerGuestbookStatus._id);
        if (index !== -1) {
            state.providerGuestbookStatus[index] = providerGuestbookStatus;
        }
    },
    updateProviderScheduleStatus(state, providerScheduleStatus) {
        state.providerScheduleStatus = providerScheduleStatus;
    },
    addProviderScheduleStatus(state, providerScheduleStatus) {
        state.providerScheduleStatus.push(providerScheduleStatus);
    },
    modifyProviderScheduleStatus(state, providerScheduleStatus) {
        let index = state.providerScheduleStatus.findIndex(e => e._id === providerScheduleStatus._id);
        if (index !== -1) {
            state.providerScheduleStatus[index] = providerScheduleStatus;
        }
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
    async modifyProviderServiceCategory({ commit }, providerServiceCategory, session) {
        try {
            let response = await PrestationService.modifyProviderServiceCategory(providerServiceCategory, session);
            if (response.error === 0) {
                commit('modifyProviderServiceCategorytegory', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de la modification d\'un service prestataire:', error);
            return { error: 1, data: 'Erreur lors de la modification d\'un service prestataire' };
        }
    },
    async deleteProviderServiceCategory({ commit }, providerServiceCategory, session) {
        try {
            let response = await PrestationService.deleteProviderServiceCategory(providerServiceCategory, session);
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
    async getGuestbookEntries({ commit }) {
        try {
            let response = await PrestationService.getGuestbookEntries();
            if (response.error === 0) {
                commit('updateGuestbookEntries', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des commentaires:', error);
        }
    },
    async addGuestbookEntry({ commit }, guestbookEntry) {
        try {
            let response = await PrestationService.addGuestbookEntry(guestbookEntry);
            if (response.error === 0) {
                commit('addGuestbookEntry', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de l\'ajout d\'un commentaire:', error);
            return { error: 1, data: 'Erreur lors de l\'ajout d\'un commentaire' };
        }
    },
    async getProviderGuestbookStatus({ commit }) {
        try {
            let response = await PrestationService.getGuestbookStatus();
            if (response.error === 0) {
                commit('updateGuestbookStatus', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des commentaires:', error);
        }
    },
    async addProviderGuestbookStatus({ commit }, customer_id) {
        try {
            let response = await PrestationService.addGuestbookStatus(customer_id);
            if (response.error === 0) {
                commit('addGuestbookStatus', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de l\'ajout du statut du livre d\'or:', error);
            return { error: 1, data: 'Erreur lors de l\'ajout du statut du livre d\'or' };
        }
    },
    async modifyProviderGuestbookStatus({ commit }, providerGuestbookStatus) {
        try {
            let response = await PrestationService.modifyGuestbookStatus(providerGuestbookStatus);
            if (response.error === 0) {
                commit('modifyGuestbookStatus', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de la modification du statut du livre d\'or:', error);
            return { error: 1, data: 'Erreur lors de la modification du statut du livre d\'or' };
        }
    },
    async getProviderScheduleStatus({ commit }) {
        try {
            let response = await PrestationService.getProviderScheduleStatus();
            if (response.error === 0) {
                commit('updateProviderScheduleStatus', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des statuts de planning:', error);
        }
    },
    async addProviderScheduleStatus({ commit }, user) {
        try {
            let response = await PrestationService.addProviderScheduleStatus(user);
            if (response.error === 0) {
                commit('addProviderScheduleStatus', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de l\'ajout d\'un statut de planning:', error);
            return { error: 1, data: 'Erreur lors de l\'ajout d\'un statut de planning' };
        }
    },
    async modifyProviderScheduleStatus({ commit }, providerScheduleStatus) {
        try {
            let response = await PrestationService.modifyProviderScheduleStatus(providerScheduleStatus);
            if (response.error === 0) {
                commit('modifyProviderScheduleStatus', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de la modification d\'un statut de planning:', error);
            return {error: 1, data: 'Erreur lors de la modification d\'un statut de planning'};
        }
    },
};

const getters = {
    getServiceCategoryById: (state) => (_id) => {
        if (_id === null || _id === undefined) return null;
        return state.serviceCategories.find((sc) => sc._id === _id);
    },
    getProviderServiceCategoriesByCustomerId: (state) => (_id) => {
        if (_id === null || _id === undefined) return null;
        return state.providerServiceCategories.filter((psc) => psc.customer_id === _id);
    },
    getProviderServiceCategoriesByCustomerIdAndServiceID: (state) => (_id, service_id) => {
        if((_id === null || _id === undefined) ||
            (service_id === null || service_id === undefined)) return null;
        if(store.state.account.currentUser == null){
            return {error: 1, status: 404, data: 'vous n\'Ãªtes pas connectÃ©'}
        }

        if (store.state.account.currentUser.privilege < '1'){
            return {error: 1, status: 404, data: 'vous n\'avez pas les droits pour effectuer cette action'}
        }
        return state.providerServiceCategories.find((psc) => psc.customer_id === _id && psc.service_id === service_id);
    },
    getProviderServiceCategoriesCustomerId: (state) => {
        if(!state.providerServiceCategories) return null;
        if(store.state.account.currentUser == null){
            return {error: 1, status: 404, data: 'vous n\'Ãªtes pas connectÃ©'}
        }

        if (store.state.account.currentUser.privilege < '1'){
            return {error: 1, status: 404, data: 'vous n\'avez pas les droits pour effectuer cette action'}
        }

        return state.providerServiceCategories
            .filter((psc) => psc.customer_id)
            .map((psc) => psc.customer_id);
    },
    getProviderOfferingServices: (state, getters, rootState) => {
        if(!state.providerServiceCategories) return null;
        if(store.state.account.currentUser == null){
            return {error: 1, status: 404, data: 'vous n\'Ãªtes pas connectÃ©'}
        }

        if (store.state.account.currentUser.privilege < '1'){
            return {error: 1, status: 404, data: 'vous n\'avez pas les droits pour effectuer cette action'}
        }
        const providerIds = getters.getProviderServiceCategoriesCustomerId;
        let providerServices = [];
        for (const element of providerIds) {
            const services = getters.getProviderServiceCategoriesByCustomerId(element);
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
        if(store.state.account.currentUser == null){
            return {error: 1, status: 404, data: 'vous n\'Ãªtes pas connectÃ©'}
        }

        if (store.state.account.currentUser.privilege < '1'){
            return {error: 1, status: 404, data: 'vous n\'avez pas les droits pour effectuer cette action'}
        }
        return state.serviceReservations.filter((sr) => sr.service_id === service_id);
    },
    getServiceReservationsByStandsReservationsIdAndServiceId: (state) => (standsReservationsId, service_id) => {
        if(store.state.account.currentUser == null){
            return {error: 1, status: 404, data: 'vous n\'Ãªtes pas connectÃ©'}
        }

        if (store.state.account.currentUser.privilege < '1'){
            return {error: 1, status: 404, data: 'vous n\'avez pas les droits pour effectuer cette action'}
        }

        return state.serviceReservations.filter((sr) =>
            sr.stand_reservation_id === standsReservationsId
            && sr.service_id === service_id);
    },
    getServiceReservationsByTicketIdAndDate: (state) => (ticket_id, date) => {
        return state.serviceReservations.filter((sr) => sr.ticket_id === ticket_id && sr.date === date);
    },
    getServiceReservationsByDate: (state) => (date) => {
        return state.serviceReservations.filter((sr) => sr.date === date);
    },
    getGuestbookEntriesByCustomerId: (state) => (customer_id) => {
        const standReservations = store.state.stands.standsReservations.filter((sr) => sr.customer_id === customer_id);
        const standReservationIds = standReservations.map(sr => sr._id);
        const serviceReservations = state.serviceReservations.filter((sr) => standReservationIds.includes(sr.stand_reservation_id));
        return state.guestbookEntries.filter((ge) => serviceReservations.some(sr => sr._id === ge.service_reservations_id));
    },
    getProviderGuestbookStatusByCustomerId: (state) => (customer_id) => {
        const status = state.providerGuestbookStatus.find((pgs) => pgs.customer_id === customer_id);
        if (!status) {
            console.error(`Aucun statut du livre d'or trouvé pour customer_id : ${customer_id}`);
            return null;
        }
        return status;
    },
    getProviderScheduleStatusByCustomerId: (state) => (customer_id) => {
        if(customer_id == null) return null;
        const status = state.providerScheduleStatus.find((pss) => pss.customer_id === customer_id);
        if (!status) {
            console.error(`Aucun statut de planning trouvé pour customer_id : ${customer_id}`);
            return null;
        }
        return status;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};