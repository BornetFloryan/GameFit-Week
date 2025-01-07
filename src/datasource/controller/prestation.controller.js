import {
    customer_accounts,
    provider_service_categories,
    service_categories,
    service_reservations
} from "@/datasource/data";
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

function getServiceReservations() {
    return {error: 0, data: service_reservations}
}

function addServiceReservation(serviceReservation) {
    if (!serviceReservation) {
        return {error: 1, status: 404, data: 'Aucune donnée'}
    }
    console.log('serviceReservation', serviceReservation)
    if (!serviceReservation.date) {
        return {error: 1, status: 404, data: 'Date manquante'};
    }
    if (!serviceReservation.time) {
        return {error: 1, status: 404, data: 'Heure manquante'};
    }
    if (!serviceReservation.ticket_id) {
        return {error: 1, status: 404, data: 'ID de ticket manquant'};
    }
    if (!serviceReservation.service_id) {
        return {error: 1, status: 404, data: 'ID de service manquant'};
    }
    if (!serviceReservation.stands_reservations_id) {
        return {error: 1, status: 404, data: 'ID de réservation de stand manquant'};
    }

    let serviceReservationData = {
        _id: uuidv4(),
        date: serviceReservation.date,
        time: serviceReservation.time,
        ticket_id: serviceReservation.ticket_id,
        service_id: serviceReservation.service_id,
        stands_reservations_id: serviceReservation.stands_reservations_id
    }

    return {error: 0, status: 200, data: serviceReservationData}
}

function modifyServiceReservation(serviceReservation) {
    if (!serviceReservation) {
        return {error: 1, status: 404, data: 'Aucune donnée'}
    }
    if (!serviceReservation._id) {
        return {error: 1, status: 404, data: 'ID manquant'}
    }

    let existingServiceReservation = service_reservations.find(e => e._id === serviceReservation._id);
    if (!existingServiceReservation) {
        return {error: 1, status: 404, data: 'Réservation non trouvée'}
    }

    existingServiceReservation.state = serviceReservation.state;
    existingServiceReservation.providerServiceCategory = serviceReservation.providerServiceCategory;
    existingServiceReservation.date = serviceReservation.date;
    existingServiceReservation.start = serviceReservation.start;
    existingServiceReservation.end = serviceReservation.end;

    return {error: 0, status: 200, data: existingServiceReservation}
}

function deleteServiceReservation(id) {
    if (!id) {
        return {error: 1, status: 404, data: 'Aucune donnée'}
    }

    let index = service_reservations.findIndex(e => e._id === id);
    if (index !== -1) {
        return {error: 0, status: 200, data: index}
    }
    return {error: 1, status: 404, data: 'Réservation non trouvée'}
}


export default {
    getServiceCategories,
    getProviderServiceCategories,
    addProviderServiceCategory,
    modifyProviderServiceCategory,
    deleteProviderServiceCategory,
    getServiceReservations,
    addServiceReservation,
    modifyServiceReservation,
    deleteServiceReservation,
}