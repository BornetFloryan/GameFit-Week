import GoodiesService from '@/services/goodies.service';

const state = () => ({
    goodies: [],
    goodieSizes: [],
    goodieVariations: []
});

const mutations = {
    updateGoodies(state, goodies) {
        state.goodies = goodies;
    },
    addGoodie(state, goodie) {
        state.goodies.push(goodie);
    },
    modifyGoodie(state, goodie) {
        let index = state.goodies.findIndex(e => e._id === goodie._id);
        if (index !== -1) {
            state.goodies[index] = goodie;
        }
    },
    deleteGoodie(state, goodieId) {
        state.goodies = state.goodies.filter(g => g._id !== goodieId);
    },
    updateGoodieSizes(state, sizes) {
        state.goodieSizes = sizes;
    },
    updateGoodieVariations(state, variations) {
        state.goodieVariations = variations;
    },
    addGoodieVariation(state, variation) {
        state.goodieVariations.push(variation);
    },
    modifyGoodieVariation(state, variation) {
        let index = state.goodieVariations.findIndex(e => e._id === variation._id);
        if (index !== -1) {
            state.goodieVariations[index] = variation;
        }
        console.log('state.goodieVariations', state.goodieVariations);
    },
    deleteGoodieVariation(state, variationId) {
        state.goodieVariations = state.goodieVariations.filter(v => v._id !== variationId);
    }
};

const actions = {
    async getAllGoodies({ commit }) {
        try {
            let response = await GoodiesService.getAllGoodies();
            commit('updateGoodies', response);
        } catch (error) {
            console.error('Erreur lors de la récupération des goodies:', error);
        }
    },
    async addGoodie({ commit }, goodie) {
        try {
            let response = await GoodiesService.addGoodie(goodie);
            commit('addGoodie', response);
            return response;
        } catch (error) {
            console.error('Erreur lors de l\'ajout du goodie:', error);
        }
    },
    async modifyGoodie({ commit }, goodie) {
        try {
            let response = await GoodiesService.updateGoodie(goodie._id, goodie);
            commit('modifyGoodie', response);
            return response;
        } catch (error) {
            console.error('Erreur lors de la modification du goodie:', error);
        }
    },
    async deleteGoodie({ commit }, goodieId) {
        try {
            await GoodiesService.deleteGoodie(goodieId);
            commit('deleteGoodie', goodieId);
        } catch (error) {
            console.error('Erreur lors de la suppression du goodie:', error);
        }
    },
    async getGoodieSizes({ commit }) {
        try {
            let response = await GoodiesService.getGoodieSizes();
            commit('updateGoodieSizes', response);
        } catch (error) {
            console.error('Erreur lors de la récupération des tailles de goodies:', error);
        }
    },
    async getGoodieVariations({ commit }, goodie_id) {
        try {
            let response = await GoodiesService.getGoodieVariations(goodie_id);
            console.log('response', response);
            if(response.error === 0) {
                commit('updateGoodieVariations', response);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de la récupération des variations de goodies:', error);
        }
    },
    async addGoodieVariation({ commit }, data) {
        try {
            let response = await GoodiesService.addGoodieVariation(data);
            commit('addGoodieVariation', response);
            return response;
        } catch (error) {
            console.error('Erreur lors de l\'ajout d\'une variation de goodie:', error);
        }
    },
    async modifyGoodieVariation({ commit }, data) {
        try {
            let response = await GoodiesService.updateGoodieVariation(data._id, data);
            console.log('response', response);
            commit('modifyGoodieVariation', response);
            return response;
        } catch (error) {
            console.error('Erreur lors de la modification de la variation de goodie:', error);
        }
    },
    async deleteGoodieVariation({ commit }, goodieId) {
        try {
            await GoodiesService.deleteGoodieVariation(goodieId);
            commit('deleteGoodieVariation', goodieId);
        } catch (error) {
            console.error('Erreur lors de la suppression de la variation de goodie:', error);
        }
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
