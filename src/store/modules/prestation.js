import PrestationService from '../../services/prestation.service';
const state = () => ({
    // state = les données centralisées
    serviceCategories: [],
    providerServiceCategories: [],
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
};

const getters = {
    getServiceCategoryById: (state) => (_id) => {
        return state.serviceCategories.find((sc) => sc._id === _id);
    },
    getProviderServiceCategoriesById: (state) => (_id) => {
        return state.providerServiceCategories.filter((psc) => psc._id === _id);
    },
    getProviderServiceCategoriesByCustomerId: (state) => (_id) => {
        return state.providerServiceCategories.filter((psc) => psc.customer_id === _id);
    },
    getProviderServiceCategoriesCustomerId: (state) => {
        return state.providerServiceCategories
            .filter((psc) => psc.customer_id)
            .map((psc) => psc.customer_id);
    },
    getProviderOfferingServices: (state, getters, rootState) => {
        const providerIds = getters.getProviderServiceCategoriesCustomerId;
        return rootState.account.customersAccounts.filter(customer => {
            return providerIds.includes(customer._id);
        });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};