import LoginService from '../../services/login.service';

const state = () => ({
    // state = les données centralisées
    customersAccounts: sessionStorage.getItem('customersAccounts') || [],
});
// mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
const mutations = {
    updateCustomersAccounts(state, customers) {
        state.customersAccounts = customers;
        sessionStorage.setItem('customersAccounts', customers);
    },
    addCustomerAccount(state, customer) {
        state.customersAccounts.push(customer);
        sessionStorage.setItem('customersAccounts', state.customersAccounts);
    },
};
// actions = fonctions asynchrone pour mettre à jour le state, en faisant appel aux mutations, via la fonction commit()
const actions = {
    async getCustomersAccounts({ commit }) {
        try {
            let response = await LoginService.getCustomersAccounts();
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
            let response = await LoginService.addCustomerAccount(customer);
            if (response.error === 0) {
                commit('addCustomerAccount', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
            return { error: 1, data: 'Erreur lors de l\'ajout de l\'utilisateur' };
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};