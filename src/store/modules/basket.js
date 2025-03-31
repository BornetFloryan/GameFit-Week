import BasketService from "@/services/basket.service";

const state = () => ({
    baskets: [],
    basketItems: []
});

// mutations = fonctions synchrones pour mettre à jour le state
const mutations = {
    updateBaskets(state, baskets) {
        state.baskets = baskets;
    },
    addBasket(state, basket) {
        state.baskets.push(basket);
    },
    modifyBasket(state, updatedBasket) {
        let index = state.baskets.findIndex(e => e._id === updatedBasket._id);
        if (index !== -1) {
            state.baskets[index] = updatedBasket;
        }
    },
    deleteBasket(state, basket_id) {
        state.baskets = state.baskets.filter(basket => basket._id !== basket_id);
    },
    updateBasketItems(state, basketItems) {
        state.basketItems = basketItems;
    },
    addItemToBasket(state, item) {
        state.basketItems.push(item);
    },
    modifyBasketItem(state, updatedItem) {
        let index = state.basketItems.findIndex(e => e._id === updatedItem._id);
        if (index !== -1) {
            state.basketItems[index] = updatedItem;
        }
    },
    deleteItemFromBasket(state, item_id) {
        state.basketItems = state.basketItems.filter(item => item._id !== item_id);
    }
};

// actions = fonctions asynchrones qui font appel aux mutations via commit()
const actions = {
    async getAllBaskets({ commit }) {
        try {
            let response = await BasketService.getAllBaskets();
            if (response.error === 0) {
                commit('updateBaskets', response.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des paniers:', error);
        }
    },
    async createBasket({ commit }, data) {
        try {
            let response = await BasketService.createBasket(data);
            if (response.error === 0) {
                commit('addBasket', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de la création du panier:', error);
            return { error: 1, data: 'Erreur lors de la création du panier' };
        }
    },
    async updateBasketState({ commit }, { basket_id, data }) {
        try {
            let response = await BasketService.updateBasketState(basket_id, data);
            if (response.error === 0) {
                commit('modifyBasket', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de la modification du panier:', error);
            return { error: 1, data: 'Erreur lors de la modification du panier' };
        }
    },
    async deleteBasket({ commit }, basket_id) {
        try {
            let response = await BasketService.deleteBasket(basket_id);
            if (response.error === 0) {
                commit('deleteBasket', basket_id);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de la suppression du panier:', error);
            return { error: 1, data: 'Erreur lors de la suppression du panier' };
        }
    },
    async getItemsByBasket({ commit }, basket_id) {
        try {
            let response = await BasketService.getItemsByBasket(basket_id);
            if (response.error === 0) {
                commit('updateBasketItems', response.data);
            } else {
                console.error(response.data);
            }
            return response
        } catch (error) {
            console.error(`Erreur lors de la récupération des articles du panier ${basket_id}:`, error);
        }
    },
    async addItemToBasket({ commit }, { basket_id, data }) {
        try {
            let response = await BasketService.addItemToBasket(basket_id, data);
            if (response.error === 0) {
                commit('addItemToBasket', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de l’ajout de l’article au panier:', error);
            return { error: 1, data: 'Erreur lors de l’ajout de l’article au panier' };
        }
    },
    async updateItemQuantity({ commit }, { basket_item_id, data }) {
        try {
            let response = await BasketService.updateItemQuantity(basket_item_id, data);
            if (response.error === 0) {
                commit('modifyBasketItem', response.data);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la quantité de l’article:', error);
            return { error: 1, data: 'Erreur lors de la mise à jour de la quantité de l’article' };
        }
    },
    async deleteItemFromBasket({ commit }, basket_item_id) {
        try {
            let response = await BasketService.deleteItemFromBasket(basket_item_id);
            if (response.error === 0) {
                commit('deleteItemFromBasket', basket_item_id);
            }
            return response;
        } catch (error) {
            console.error('Erreur lors de la suppression de l’article du panier:', error);
            return { error: 1, data: 'Erreur lors de la suppression de l’article du panier' };
        }
    },
};

const getters = {
    getBasketById: (state) => (basket_id) => {
        return state.baskets.find(basket => basket._id === basket_id);
    },
    getBasketsByProviderServiceCategoriesId: (state) => (provider_service_categories_id) => {
        return state.baskets.filter(basket => basket.provider_service_categories_id === provider_service_categories_id);
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};