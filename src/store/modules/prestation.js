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
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};