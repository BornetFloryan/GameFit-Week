import {getRequest, putRequest} from "@/services/axios.service";


async function getContentHomeFromApi(){
    return getRequest('content-home', 'GetContentHome');
}

async function modifyContentHomeFromApi(data){
    return putRequest('content-home?session=' + data.session, data, 'ModifyContentHome');
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

async function modifyContentHome(data) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        // response = await getStandsFromLocalSource();
        response = await modifyContentHomeFromApi(data);
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de modifier la page principale ' }
    }
    return response
}

export default {
    getContentHome,
    modifyContentHome,
}