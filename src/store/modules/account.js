import AccountService from '../../services/account.service';

const state = () => ({
    // state = les données centralisées
    customersAccounts: [],
    currentUser: JSON.parse(localStorage.getItem('user')) || null,
    providerRequests: [],
    sportsCategories: [],
    provider_sport_categories: [],
});

// mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
const mutations = {
    updateCustomersAccounts(state, customers) {
        if (!Array.isArray(customers)) {
            customers = [customers];
        }
        state.customersAccounts = customers;
    },
    updateCurrentUser(state, user) {
        state.currentUser = user;
        localStorage.setItem('user', JSON.stringify(user));
    },
    logout(state) {
        state.currentUser = null;
        state.token = null;
        state.refreshToken = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    },
    addCustomerAccount(state, customer) {
        state.customersAccounts.push(customer);
    },
    modifyCustomerAccount(state, customer) {
        let index = state.customersAccounts.findIndex(e => e._id === customer._id);
        if (index !== -1) {
            state.customersAccounts[index] = customer;
        }
    },
    deleteCustomerAccount(state, index) {
        state.customersAccounts.splice(index, 1);
    },
    updateProviderRequests(state, requests) {
        state.providerRequests = requests;
    },
    addProviderRequest(state, request) {
        state.providerRequests.push(request);
    },
    modifyProviderRequest(state, request) {
        let index = state.providerRequests.findIndex(e => e._id === request._id);
        if (index !== -1) {
            state.providerRequests[index] = request;
        }
    },
    deleteProviderRequest(state, index) {
        state.providerRequests.splice(index, 1);
    },
    updateSportsCategories(state, sportsCategories){
        state.sportsCategories = sportsCategories;
    },
    updateProviderSportCategories(state, provider_sport_categories){
        state.provider_sport_categories = provider_sport_categories;
    },
};

// actions = fonctions asynchrone pour mettre à jour le state, en faisant appel aux mutations, via la fonction commit()
const actions = {
    async getCustomersAccounts({ commit }) {
        try {
            let response = await AccountService.getCustomersAccounts();
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
            let response = await AccountService.addCustomerAccount(customer);
            if (response.error === 0) {

                commit('addCustomerAccount', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
            return { error: 1, data: 'Erreur lors de l\'ajout de l\'utilisateur' };
        }
    },
    async modifyCustomerAccount({ commit }, customer) {
        try {
            let response = await AccountService.modifyCustomerAccount(customer);
            if (response.error === 0) {
                commit('modifyCustomerAccount', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de la modification de l\'utilisateur:', error);
            return { error: 1, data: 'Erreur lors de la modification de l\'utilisateur' };
        }
    },
    async deleteCustomerAccount({ commit }, customer) {
        try {
            let response = await AccountService.deleteCustomerAccount(customer);
            if (response.error === 0) {
                commit('deleteCustomerAccount', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur:', error);
            return { error: 1, data: 'Erreur lors de la suppression de l\'utilisateur' };
        }
    },
    async loginUser({ commit }, data) {
        try {
            let response = await AccountService.loginUser(data);
            if (response.error === 0) {
                if (response.data.accessToken && response.data.refreshToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                commit('updateCurrentUser', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            return { error: 1, data: 'Erreur lors de la connexion' };
        }
    },
    async logoutUser({ commit }) {
        localStorage.removeItem('user');
        commit('logout');
    },
    async getProviderRequests({ commit }) {
        try {
            let response = await AccountService.getProviderRequests();
            if (response.error === 0) {
                commit('updateProviderRequests', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des demandes:', error);
        }
    },
    async addProviderRequest({ commit }, user) {
        try {
            let response = await AccountService.addProviderRequest(user);
            if (response.error === 0) {
                commit('addProviderRequest', response.data.data);
            }
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la demande:', error);
            return { error: 1, data: 'Erreur lors de l\'ajout de la demande' };
        }
    },
    async deleteProviderRequest({ commit }, request) {
        try {
            let response = await AccountService.deleteProviderRequest(request);
            if (response.error === 0) {
                commit('deleteProviderRequest', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de la suppression de la demande:', error);
            return { error: 1, data: 'Erreur lors de la suppression de la demande' };
        }
    },
    async approveProviderRequest({ commit }, request) {
        try {
            request.state = '1';
            let response = await AccountService.modifyProviderRequest(request);
            if (response.error === 0) {
                commit('modifyProviderRequest', response.data);
            }
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'approbation de la demande:', error);
            return { error: 1, data: 'Erreur lors de l\'approbation de la demande' };
        }
    },
    async rejectProviderRequest({ commit }, request) {
        try {
            request.state = '2';
            let response = await AccountService.modifyProviderRequest(request);
            if (response.error === 0) {
                commit('modifyProviderRequest', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors du rejet de la demande:', error);
            return { error: 1, data: 'Erreur lors du rejet de la demande' };
        }
    },
    async getSportsCategories({commit}){
        try {
            let response = await AccountService.getSportsCategories();
            if (response.error === 0) {
                commit('updateSportsCategories', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories de sports:', error);
        }
    },
    async getProviderSportCategories({commit}){
        try {
            let response = await AccountService.getProviderSportsCategories();
            if (response.error === 0) {
                commit('updateProviderSportCategories', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories de sports des fournisseurs:', error);
        }
    },
    async refreshToken({ commit, getters }) {
        console.log("Tentative de rafraîchissement du token...");

        const refreshToken = getters.getRefreshToken;
        if (!refreshToken) {
            console.log("Aucun refresh token trouvé");
            return null;
        }

        try {
            const response = await AccountService.refreshtoken({ refreshToken });

            if (response.data.accessToken && response.data.refreshToken) {
                const newUser = {
                    ...getters.getUser,
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken,
                };

                commit("updateCurrentUser", newUser);


                return response.data.accessToken;
            } else {
                console.error("Erreur: le token n'a pas été rafraîchi");
                commit("logout");
                return null;
            }
        } catch (error) {
            console.error("Erreur lors du rafraîchissement du token:", error);
            commit("logout");
            return null;
        }
    },
};

const getters = {
    getCustomerById: (state) => (_id) => {
        if(state.customersAccounts.length === 0){
            return undefined;
        }
        return state.customersAccounts.find(e => e._id === _id);
    },
    getCustomerByEmail: (state) => (email) => {
        return state.customersAccounts.find(e => e.email === email);
    },
    getCustomerByName: (state) => (name) => {
        return state.customersAccounts.find(e => e.name === name);
    },
    getProviderRequestById: (state) => (_id) => {
        return state.providerRequests.find(e => e._id === _id);
    },
    getProviderRequestsByCustomerId: (state) => (customer_id) => {
        const requests = state.providerRequests.filter(e => e.customer_id === customer_id);
        if (requests.length === 0) {
            return undefined;
        } else {
            return requests;
        }
    },
    getUser: (state) => state.currentUser,

    getAccessToken: (state) => {
        const user = state.currentUser;
        return user ? user.accessToken : null;
    },

    getRefreshToken: (state) => {
        const user = state.currentUser;
        return user ? user.refreshToken : null;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};