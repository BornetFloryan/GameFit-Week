import StandsService from '@/services/stands.service';

const state = () => ({
    // state = les données centralisées
    stands: localStorage.getItem('stands') || '',
});
// mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
const mutations = {
    updateStands(state, stands) {
        state.stands = stands;
        localStorage.setItem('stands', stands);
    },
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
            console.error('Erreur lors de la récupération des comptes:', error);
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};