import {getRequest, postRequest, putRequest} from "@/services/axios.service";


async function getContentHomeFromApi(){
    return getRequest('content-home', 'GetContentHome');
}

async function modifyContentHomeFromApi(data, session){
    return putRequest('content-home?session=' + session, data, 'ModifyContentHome');
}

async function uploadImageFromApi(data) {
    return postRequest('content-home/upload', data, 'UploadImage');
}

async function getContentHome() {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        // response = await getStandsFromLocalSource();
        response = await getContentHomeFromApi();
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la page principale ' }
    }
    return response.data
}

async function modifyContentHome(data, session) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        // response = await getStandsFromLocalSource();
        response = await modifyContentHomeFromApi(data, session);
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de modifier la page principale ' }
    }
    return response
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
    getContentHome,
    modifyContentHome,
    uploadImage
}