import AccountService from '../../services/account.service';

const state = () => ({
    // state = les données centralisées
    customersAccounts: sessionStorage.getItem('customersAccounts') ? sessionStorage.getItem('customersAccounts') : [],
    currentUser: localStorage.getItem('currentUser') || null,
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
    }
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
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};