import LocalSource from "@/datasource/controller/stands.controller";

async function getStandsFromLocalSource() {
    return LocalSource.getStands();
}

async function getStands() {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getStandsFromLocalSource();
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des stands ' }
    }
    return response
}



export default {
    getStands,
}