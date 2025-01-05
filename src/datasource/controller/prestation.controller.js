import {customer_accounts, provider_service_categories, service_categories} from "@/datasource/data";
import {v4 as uuidv4} from 'uuid'

function getServiceCategories() {
    return {error: 0, data: service_categories}
}

function getProviderServiceCategories() {
    return {error: 0, data: provider_service_categories}
}

function addProviderServiceCategory(providerServiceCategory) {
    if(!providerServiceCategory){
        return {error: 1, status: 404, data: 'Aucune donnée'}
    }
    if(!providerServiceCategory.user.email || !providerServiceCategory.serviceCategory) {
        return {error: 1, status: 404, data: 'Champs manquants'}
    }

    let existingUser = customer_accounts.find(e => e.email === providerServiceCategory.user.email);
    if(!existingUser){
        return {error: 1, status: 404, data: 'Utilisateur non trouvé'}
    }

    let existingProviderServiceCategories = provider_service_categories.filter(e => e.customer_id === existingUser);
    if(existingProviderServiceCategories.length > 0){
        if(existingProviderServiceCategories.find(e => e.service_category_id === providerServiceCategory.serviceCategory)){
            return {error: 1, status: 404, data: 'Service déjà existant pour le prestataire'}
        }
    }

    let providerServiceCategoryData = {
        _id: uuidv4(),
        state: "0",
        customer_id: existingUser._id,
        service_category_id: providerServiceCategory.serviceCategory
    };

    return {error: 0, status: 200, data: providerServiceCategoryData}
}

function modifyProviderServiceCategory(providerServiceCategory) {
    if(!providerServiceCategory){
        return {error: 1, status: 404, data: 'Aucune donnée'}
    }
    if(!providerServiceCategory._id){
        return {error: 1, status: 404, data: 'ID manquant'}
    }

    let existingProviderServiceCategory = provider_service_categories.find(e => e._id === providerServiceCategory._id);
    if(!existingProviderServiceCategory){
        return {error: 1, status: 404, data: 'Service non trouvé'}
    }

    existingProviderServiceCategory.state = providerServiceCategory.state;
    existingProviderServiceCategory.customer_id = providerServiceCategory.customer_id;
    existingProviderServiceCategory.service_category_id = providerServiceCategory.service_category_id;

    return {error: 0, status: 200, data: existingProviderServiceCategory}
}

function deleteProviderServiceCategory(providerServiceCategory) {
    if(!providerServiceCategory){
        return {error: 1, status: 404, data: 'Aucune donnée'}
    }
    if(!providerServiceCategory._id){
        return {error: 1, status: 404, data: 'ID manquant'}
    }

    let index = provider_service_categories.findIndex(e => e._id === providerServiceCategory._id);
    if (index !== -1) {
        return {error: 0, status: 200, data: index}
    }
    return {error: 1, status: 404, data: 'Service non trouvé'}
}


export default {
    getServiceCategories,
    getProviderServiceCategories,
    addProviderServiceCategory,
    modifyProviderServiceCategory,
    deleteProviderServiceCategory,

}