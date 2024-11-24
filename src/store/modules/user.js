import LoginService from '../../services/login.service';

const state = () => ({
    // state = les données centralisées
    currentUser: sessionStorage.getItem('currentUser') || null,
});
// mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
const mutations = {
    updateCurrentUser(state, user) {
        state.currentUser = user;
        if (user === null) {
            sessionStorage.removeItem('currentUser');
        } else {
            sessionStorage.setItem('currentUser', user);
        }
    },
};
// actions = fonctions asynchrone pour mettre à jour le state, en faisant appel aux mutations, via la fonction commit()
const actions = {
    async setCurrentUser({ commit }, data) {
        try {
            if (data === null) {
                commit('updateCurrentUser', null);
                return { error: 0, data: 'Déconnexion réussie' };
            }

            let response = await LoginService.setCurrentUser(data);
            if (response.error === 0) {
                commit('updateCurrentUser', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            return { error: 1, data: 'Erreur lors de la connexion' };
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};