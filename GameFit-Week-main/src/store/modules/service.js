const state = () => ({
    // state = les données centralisées
    selectedService: localStorage.getItem('selectedService') || '',
});
// mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
const mutations = {
    updateSelectedService(state, service) {
        state.selectedService = service;
        localStorage.setItem('selectedService', service);
    },
};
// actions = fonctions asynchrone pour mettre à jour le state, en faisant appel aux mutations, via la fonction commit()
const actions = {
    setSelectService({ commit }, service) {
        commit('updateSelectedService', service);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};