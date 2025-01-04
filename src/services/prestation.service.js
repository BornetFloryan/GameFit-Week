import LocalSource from "@/datasource/controller/prestation.controller";

async function getServiceCategoriesFromLocalSource() {
    return LocalSource.getServiceCategories();
}

async function getProviderServiceCategoriesFromLocalSource() {
    return LocalSource.getProviderServiceCategories();
}

async function addProviderServiceCategoryFromLocalSource(providerServiceCategory) {
    return LocalSource.addProviderServiceCategory(providerServiceCategory);
}

async function getServiceCategories() {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getServiceCategoriesFromLocalSource();
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des stands ' }
    }
    return response
}

async function getProviderServiceCategories() {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getProviderServiceCategoriesFromLocalSource();
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des stands ' }
    }
    return response
}

async function addProviderServiceCategory(providerServiceCategory) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await addProviderServiceCategoryFromLocalSource(providerServiceCategory);
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible d\'ajouter un prestataire à un service' }
    }
    return response
}

export default {
    getServiceCategories,
    getProviderServiceCategories,
    addProviderServiceCategory
}