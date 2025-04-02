import HomeService from "@/services/home.service";

const state = () => ({
    // state = les données centralisées
    content_home: [],
});

// mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
const mutations = {
    updateContentHome(state, content_home) {
        state.content_home = content_home;
    },
};

// actions = fonctions asynchrone pour mettre à jour le state, en faisant appel aux mutations, via la fonction commit()
const actions = {
    async getContentHome({commit}) {
        try {
            let response = await HomeService.getContentHome();
            if (response.error === 0) {
                commit('updateContentHome', response.data);
            } else {
                console.error(response.data);
            }
            return response
        } catch (error) {
            console.error('Erreur lors de la récupération de la page principale:', error);
        }
    },
    async modifyContentHome({commit}, { data }) {
        try {
            let response = await HomeService.modifyContentHome(data);

            if (response.error === 0) {
                commit('updateContentHome', response.data);
            }
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'ajout du ticket:', error);
            return {error: 1, data: 'Erreur lors de l\'ajout du ticket'};
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};