const state = () => ({
    // state = les données centralisées
    selectedAccountInfo: localStorage.getItem('selectedAccountInfo') || '',
});
// mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
const mutations = {
    updateSelectedAccountInfo(state, service) {
        state.selectedService = service;
        localStorage.setItem('selectedAccountInfo', service);
    },
};
// actions = fonctions asynchrone pour mettre à jour le state, en faisant appel aux mutations, via la fonction commit()
const actions = {
    setSelectedAccountInfo({ commit }, info) {
        commit('updateSelectedAccountInfo', info);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};