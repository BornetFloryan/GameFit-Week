import AccountService from '../../services/account.service';

const state = () => ({
    // state = les données centralisées
    customersAccounts: sessionStorage.getItem('customersAccounts') ? sessionStorage.getItem('customersAccounts') : [],
    currentUser: localStorage.getItem('currentUser') || null,
    providerRequests: [],
});

// mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
const mutations = {
    updateCustomersAccounts(state, customers) {
        if (!Array.isArray(customers)) {
            customers = [customers];
        }
        state.customersAccounts = customers;
        sessionStorage.setItem('customersAccounts', customers);
    },
    updateCurrentUser(state, user) {
        state.currentUser = user;
        if (user === null) {
            localStorage.removeItem('currentUser');
        } else {
            localStorage.setItem('currentUser', user);
        }
    },
    addCustomerAccount(state, customer) {
        state.customersAccounts.push(customer);
        sessionStorage.setItem('customersAccounts', state.customersAccounts.join(','));
    },
    modifyCustomerAccount(state, customer) {
        let index = state.customersAccounts.findIndex(e => e._id === customer._id);
        if (index !== -1) {
            state.customersAccounts[index] = customer;
        }
        sessionStorage.setItem('customersAccounts', state.customersAccounts.join(','));
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
    deleteProviderRequest(state, request) {
        let index = state.providerRequests.findIndex(e => e._id === request._id);
        if (index !== -1) {
            state.providerRequests.splice(index, 1);
        }
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
    async loginUser({ commit }, data) {
        try {
            let response = await AccountService.loginUser(data);
            if (response.error === 0) {
                commit('updateCurrentUser', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            return { error: 1, data: 'Erreur lors de la connexion' };
        }
    },
    async logoutUser({ commit }) {
        commit('updateCurrentUser', null);
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
                commit('addProviderRequest', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la demande:', error);
            return { error: 1, data: 'Erreur lors de l\'ajout de la demande' };
        }
    },
    async modifyProviderRequest({ commit }, request) {
        try {
            let response = await AccountService.modifyProviderRequest(request);
            if (response.error === 0) {
                commit('modifyProviderRequest', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de la modification de la demande:', error);
            return { error: 1, data: 'Erreur lors de la modification de la demande' };
        }
    },
    async deleteProviderRequest({ commit }, request) {
        try {
            let response = await AccountService.deleteProviderRequest(request);
            if (response.error === 0) {
                commit('deleteProviderRequest', request);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de la suppression de la demande:', error);
            return { error: 1, data: 'Erreur lors de la suppression de la demande' };
        }
    },
};

const getters = {
    getCustomerById: (state) => (_id) => {
        return state.customersAccounts.find(e => e._id === _id);
    },
    getCustomerByEmail: (state) => (email) => {
        return state.customersAccounts.find(e => e.email === email);
    },
    getProvider: (state) => {
        return state.customersAccounts.filter((account) => account.privilege === "1");
    },
    getProviderRequestById: (state) => (_id) => {
        return state.providerRequests.find(e => e._id === _id);
    },
    getProviderRequestsByCustomerId: (state) => (customer_id) => {
        return state.providerRequests.find(e => e.customer_id === customer_id);
    },
    getAcceptRequests: (state) => {
        return state.providerRequests.filter(e => e.status === "1");
    },
    getPendingRequests: (state) => {
        return state.providerRequests.filter(e => e.status === "0");
    },
    getPendingRequestByCustomerId: (state) => (customer_id) => {
        const pendingRequests = state.providerRequests.filter(e => e.customer_id === customer_id);
        if (pendingRequests.length === 0) {
            return undefined;
        } else {
            return pendingRequests;
        }
    },

};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};