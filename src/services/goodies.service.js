import { postRequest, getRequest, deleteRequest, putRequest } from "@/services/axios.service";

async function getAllGoodiesFromApi() {
    return getRequest('goodies/', 'GetAllGoodies');
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

async function updateGoodieVariationFromApi(id, data) {
    return putRequest(`goodies/variations/${id}`, data, 'UpdateGoodieVariation');
}

async function deleteGoodieVariationFromApi(id) {
    return deleteRequest(`goodies/variations/${id}`, 'DeleteGoodieVariation');
}

async function getGoodieVariationByIdFromApi(id) {
    return getRequest(`goodies/variations/${id}`, 'GetGoodieVariation');
}

async function uploadImageFromApi(data) {
    return postRequest('goodies/upload', data, 'UploadImage');
}

async function getAllGoodies() {
    try {
        let response = await getAllGoodiesFromApi();
        return response.data;
    } catch (err) {
        return { error: 1, status: 404, data: 'Erreur: Impossible de récupérer les goodies' };
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

async function updateGoodieVariation(id, data) {
    try {
        let response = await updateGoodieVariationFromApi(id, data);
        return response.data;
    } catch (err) {
        return { error: 1, status: 500, data: 'Erreur: Impossible de modifier la variation du goodie' };
    }
}

async function deleteGoodieVariation(id) {
    try {
        let response = await deleteGoodieVariationFromApi(id);
        return response.data;
    } catch (err) {
        return { error: 1, status: 500, data: 'Erreur: Impossible de supprimer la variation du goodie' };
    }
}

async function getGoodieVariationById(id) {
    try {
        let response = await getGoodieVariationByIdFromApi(id);
        return response.data;
    } catch (err) {
        return { error: 1, status: 404, data: 'Erreur: Impossible de récupérer la variation du goodie' };
    }
}

async function uploadImage(data) {
    try {
        let response = await uploadImageFromApi(data);
        return response;
    } catch (err) {
        return { error: 1, status: 500, data: 'Erreur: Impossible de télécharger l’image' };
    }
}

export default {
    getAllGoodies,
    addGoodie,
    updateGoodie,
    deleteGoodie,
    getGoodieSizes,
    getGoodieVariations,
    addGoodieVariation,
    updateGoodieVariation,
    deleteGoodieVariation,
    getGoodieVariationById,
    uploadImage,
};
