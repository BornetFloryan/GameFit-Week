import {provider_service_categories, service_categories} from "@/datasource/data";

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
    if(!providerServiceCategory.user._id || !providerServiceCategory.serviceCategory) {
        return {error: 1, status: 404, data: 'Champs manquants'}
    }

    let existingProviderServiceCategories = provider_service_categories.filter(e => e.customer_id === providerServiceCategory.user._id);
    if(existingProviderServiceCategories.length > 0){
        if(existingProviderServiceCategories.find(e => e.service_category_id === providerServiceCategory.serviceCategory)){
            return {error: 1, status: 404, data: 'Service déjà existant pour le prestataire'}
        }
    }

    let providerServiceCategoryData = {
        _id: providerServiceCategory.user._id,
        status: "0",
        customer_id: providerServiceCategory.user._id,
        service_category_id: providerServiceCategory.serviceCategory
    };

    return {error: 0, status: 200, data: providerServiceCategoryData}
}

export default {
    getServiceCategories,
    getProviderServiceCategories,
    addProviderServiceCategory,
}