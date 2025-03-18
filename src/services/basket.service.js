import { postRequest, getRequest, deleteRequest, putRequest } from "@/services/axios.service";

async function getAllBasketsFromApi() {
    return getRequest('baskets/', 'GetAllBaskets');
}

async function getBasketsByCustomerFromApi(customer_id) {
    return getRequest(`baskets/${customer_id}`, 'GetBasketsByCustomer');
}

async function createBasketFromApi(data) {
    return postRequest('baskets/', data, 'CreateBasket');
}

async function updateBasketStateFromApi(basket_id, data) {
    return putRequest(`baskets/${basket_id}`, data, 'UpdateBasketState');
}

async function deleteBasketFromApi(basket_id) {
    return deleteRequest(`baskets/${basket_id}`, 'DeleteBasket');
}

async function getItemsByBasketFromApi(basket_id) {
    return getRequest(`baskets/${basket_id}/items`, 'GetItemsByBasket');
}

async function addItemToBasketFromApi(basket_id, data) {
    return postRequest(`baskets/${basket_id}/items`, data, 'AddItemToBasket');
}

async function updateItemQuantityFromApi(basket_item_id, data) {
    return putRequest(`baskets/items/${basket_item_id}`, data, 'UpdateItemQuantity');
}

async function deleteItemFromBasketFromApi(basket_item_id) {
    return deleteRequest(`baskets/items/${basket_item_id}`, 'DeleteItemFromBasket');
}

// Fonctions avec gestion des erreurs
async function getAllBaskets() {
    let response = null;
    try {
        response = await getAllBasketsFromApi();
    } catch (err) {
        response = { error: 1, status: 404, data: 'Erreur: Impossible de récupérer tous les paniers' };
    }
    return response.data;
}

async function getBasketsByCustomer(customer_id) {
    let response = null;
    try {
        response = await getBasketsByCustomerFromApi(customer_id);
    } catch (err) {
        response = { error: 1, status: 404, data: `Erreur: Impossible de récupérer les paniers du client ${customer_id}` };
    }
    return response.data;
}

async function createBasket(data) {
    let response = null;
    try {
        response = await createBasketFromApi(data);
    } catch (err) {
        response = { error: 1, status: 500, data: 'Erreur: Impossible de créer un panier' };
    }
    return response.data;
}

async function updateBasketState(basket_id, data) {
    let response = null;
    try {
        response = await updateBasketStateFromApi(basket_id, data);
    } catch (err) {
        response = { error: 1, status: 500, data: 'Erreur: Impossible de modifier l’état du panier' };
    }
    return response.data;
}

async function deleteBasket(basket_id) {
    let response = null;
    try {
        response = await deleteBasketFromApi(basket_id);
    } catch (err) {
        response = { error: 1, status: 500, data: 'Erreur: Impossible de supprimer le panier' };
    }
    return response.data;
}

async function getItemsByBasket(basket_id) {
    let response = null;
    try {
        response = await getItemsByBasketFromApi(basket_id);
    } catch (err) {
        response = { error: 1, status: 404, data: `Erreur: Impossible de récupérer les articles du panier ${basket_id}` };
    }
    return response.data;
}

async function addItemToBasket(basket_id, data) {
    let response = null;
    try {
        response = await addItemToBasketFromApi(basket_id, data);
    } catch (err) {
        response = { error: 1, status: 500, data: 'Erreur: Impossible d’ajouter l’article au panier' };
    }
    return response.data;
}

async function updateItemQuantity(basket_item_id, data) {
    let response = null;
    try {
        response = await updateItemQuantityFromApi(basket_item_id, data);
    } catch (err) {
        response = { error: 1, status: 500, data: 'Erreur: Impossible de mettre à jour la quantité de l’article' };
    }
    return response.data;
}

async function deleteItemFromBasket(basket_item_id) {
    let response = null;
    try {
        response = await deleteItemFromBasketFromApi(basket_item_id);
    } catch (err) {
        response = { error: 1, status: 500, data: 'Erreur: Impossible de supprimer l’article du panier' };
    }
    return response.data;
}

export default {
    getAllBaskets,
    getBasketsByCustomer,
    createBasket,
    updateBasketState,
    deleteBasket,
    getItemsByBasket,
    addItemToBasket,
    updateItemQuantity,
    deleteItemFromBasket
};
