import {provider_service_categories, service_categories} from "@/datasource/data";

function getServiceCategories() {
    return {error: 0, data: service_categories}
}

function getProviderServiceCategories() {
    return {error: 0, data: provider_service_categories}
}

export default {
    getServiceCategories,
    getProviderServiceCategories,
}