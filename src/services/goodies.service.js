import { postRequest, getRequest, deleteRequest, putRequest } from "@/services/axios.service";

async function getAllGoodiesFromApi() {
    return getRequest('goodies/', 'GetAllGoodies');
}

async function getGoodieByIdFromApi(id) {
    return getRequest(`goodies/${id}`, 'GetGoodieById');
}

async function addGoodieFromApi(data) {
    return postRequest('goodies/', data, 'AddGoodie');
}

async function updateGoodieFromApi(id, data) {
    return putRequest(`goodies/${id}`, data, 'UpdateGoodie');
}

async function deleteGoodieFromApi(id) {
    return deleteRequest(`goodies/${id}`, 'DeleteGoodie');
}

async function getGoodieSizesFromApi() {
    return getRequest('goodies/sizes', 'GetGoodieSizes');
}

async function getGoodieVariationsFromApi(goodie_id) {
    return getRequest(`goodies/${goodie_id}/variations`, 'GetGoodieVariations');
}

async function addGoodieVariationFromApi(data) {
    return postRequest('goodies/variations', data, 'AddGoodieVariation');
}

// Fonctions avec gestion des erreurs
async function getAllGoodies() {
    try {
        let response = await getAllGoodiesFromApi();
        return response.data;
    } catch (err) {
        return { error: 1, status: 404, data: 'Erreur: Impossible de récupérer les goodies' };
    }
}

async function getGoodieById(id) {
    try {
        let response = await getGoodieByIdFromApi(id);
        return response.data;
    } catch (err) {
        return { error: 1, status: 404, data: `Erreur: Impossible de récupérer le goodie ${id}` };
    }
}

async function addGoodie(data) {
    try {
        let response = await addGoodieFromApi(data);
        return response.data;
    } catch (err) {
        return { error: 1, status: 500, data: 'Erreur: Impossible de créer un goodie' };
    }
}

async function updateGoodie(id, data) {
    try {
        let response = await updateGoodieFromApi(id, data);
        return response.data;
    } catch (err) {
        return { error: 1, status: 500, data: 'Erreur: Impossible de modifier le goodie' };
    }
}

async function deleteGoodie(id) {
    try {
        let response = await deleteGoodieFromApi(id);
        return response.data;
    } catch (err) {
        return { error: 1, status: 500, data: 'Erreur: Impossible de supprimer le goodie' };
    }
}

async function getGoodieSizes() {
    try {
        let response = await getGoodieSizesFromApi();
        return response.data;
    } catch (err) {
        return { error: 1, status: 404, data: 'Erreur: Impossible de récupérer les tailles de goodies' };
    }
}

async function getGoodieVariations(goodie_id) {
    try {
        let response = await getGoodieVariationsFromApi(goodie_id);
        return response.data;
    } catch (err) {
        return { error: 1, status: 404, data: `Erreur: Impossible de récupérer les variations du goodie ${goodie_id}` };
    }
}

async function addGoodieVariation(data) {
    try {
        let response = await addGoodieVariationFromApi(data);
        return response.data;
    } catch (err) {
        return { error: 1, status: 500, data: 'Erreur: Impossible d’ajouter la variation du goodie' };
    }
}

export default {
    getAllGoodies,
    getGoodieById,
    addGoodie,
    updateGoodie,
    deleteGoodie,
    getGoodieSizes,
    getGoodieVariations,
    addGoodieVariation
};
