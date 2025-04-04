// import LocalSource from "@/datasource/controller/prestation.controller";
import {deleteRequest, getRequest, postRequest, putRequest} from "@/services/axios.service";

// async function getServiceCategoriesFromLocalSource() {
//     return LocalSource.getServiceCategories();
// }

async function getServiceCategoriesFromApi() {
    return getRequest('service-categories', 'GetServiceCategories')
}

// async function getProviderServiceCategoriesFromLocalSource() {
//     return LocalSource.getProviderServiceCategories();
// }

async function getProviderServiceCategoriesFromApi() {
    return getRequest('provider-service-categories', 'GetProviderServiceCategories')
}

// async function addProviderServiceCategoryFromLocalSource(providerServiceCategory) {
//     return LocalSource.addProviderServiceCategory(providerServiceCategory);
// }

async function addProviderServiceCategoryFromApi(providerServiceCategory) {
    return postRequest('provider-service-categories', providerServiceCategory, 'AddProviderServiceCategory')
}

// async function modifyProviderServiceCategoryFromLocalSource(providerServiceCategory) {
//     return LocalSource.modifyProviderServiceCategory(providerServiceCategory);
// }

async function modifyProviderServiceCategoryFromApi(providerServiceCategory) {
    return putRequest('provider-service-categories', providerServiceCategory, 'ModifyProviderServiceCategory')
}

// async function deleteProviderServiceCategoryFromLocalSource(providerServiceCategory) {
//     return LocalSource.deleteProviderServiceCategory(providerServiceCategory);
// }

async function deleteProviderServiceCategoryFromApi(providerServiceCategory) {
    return deleteRequest('provider-service-categories/' + providerServiceCategory, 'DeleteProviderServiceCategory')
}

// async function getServiceReservationsFromLocalSource() {
//     return LocalSource.getServiceReservations();
// }

async function getServiceReservationsFromApi() {
    return getRequest('service-reservations', 'GetServiceReservations')
}

// async function addServiceReservationFromLocalSource(serviceReservation) {
//     return LocalSource.addServiceReservation(serviceReservation);
// }

async function addServiceReservationFromApi(serviceReservation) {
    return postRequest('service-reservations', serviceReservation, 'AddServiceReservation')
}

// async function modifyServiceReservationFromLocalSource(serviceReservation) {
//     return LocalSource.modifyServiceReservation(serviceReservation);
// }

async function modifyServiceReservationFromApi(serviceReservation) {
    return postRequest('service-reservations', serviceReservation, 'ModifyServiceReservation')
}

// async function deleteServiceReservationFromLocalSource(id) {
//     return LocalSource.deleteServiceReservation(id);
// }

async function deleteServiceReservationFromApi(id) {
    return deleteRequest('service-reservations/' + id, 'DeleteServiceReservation')
}

// async function getGuestbookEntriesFromLocalSource() {
//     return LocalSource.getGuestbookEntries();
// }

async function getGuestbookEntriesFromApi() {
    return getRequest('guestbook-entries', 'GetGuestbookEntries');
}

// async function addGuestbookEntryFromLocalSource(guestbookEntry) {
//     return LocalSource.addGuestbookEntry(guestbookEntry);
// }

async function addGuestbookEntryFromApi(guestbookEntry) {
    return postRequest('guestbook-entries', guestbookEntry, 'AddGuestbookEntry');
}

async function modifyGuestbookEntryFromApi(guestbookEntry) {
    return putRequest('guestbook-entries', guestbookEntry, 'ModifyGuestbookEntry');
}

async function deleteGuestbookEntryFromApi(id) {
    return deleteRequest('guestbook-entries/' + id, 'DeleteGuestbookEntry');
}

// async function getGuestbookStatusFromLocalSource() {
//     return LocalSource.getGuestbookStatus();
// }

async function getGuestbookStatusFromApi() {
    return getRequest('guestbook-status', 'GetGuestbookStatus');
}

// async function addGuestbookStatusFromLocalSource(customer_id) {
//     return LocalSource.addGuestbookStatus(customer_id);
// }

async function addGuestbookStatusFromApi(customer_id) {
    return postRequest('guestbook-status', { customer_id }, 'AddGuestbookStatus');
}

// async function modifyGuestbookStatusFromLocalSource(providerGuestbookStatus) {
//     return LocalSource.modifyGuestbookStatus(providerGuestbookStatus);
// }

async function modifyGuestbookStatusFromApi(providerGuestbookStatus) {
    return putRequest('guestbook-status', providerGuestbookStatus, 'ModifyGuestbookStatus');
}

// async function getProviderScheduleStatusFromLocalSource() {
//     return LocalSource.getProviderScheduleStatus();
// }

async function getProviderScheduleStatusFromApi() {
    return getRequest('provider-schedule-status', 'GetProviderScheduleStatus');
}

// async function addProviderScheduleStatusFromLocalSource(user) {
//     return LocalSource.addProviderScheduleStatus(user);
// }

async function addProviderScheduleStatusFromApi(user) {
    return postRequest('provider-schedule-status', user, 'AddProviderScheduleStatus');
}

// async function modifyProviderScheduleStatusFromLocalSource(providerScheduleStatus) {
//     return LocalSource.modifyProviderScheduleStatus(providerScheduleStatus);
// }

async function modifyProviderScheduleStatusFromApi(providerScheduleStatus) {
    return putRequest('provider-schedule-status', providerScheduleStatus, 'ModifyProviderScheduleStatus');
}

async function getReportsFromApi() {
    return getRequest('reports', 'GetReports');
}

async function addReportFromApi(report) {
    return postRequest('reports', report, 'AddReport');
}

async function modifyReportFromApi(report) {
    return putRequest('reports', report, 'ModifyReport');
}

async function deleteReportFromApi(id) {
    return deleteRequest('reports/' + id, 'DeleteReport');
}


async function getServiceCategories() {
    let response = null;
    try {
        response = await getServiceCategoriesFromApi();
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des stands ' }
    }
    return response
}

async function getProviderServiceCategories() {
    let response = null;
    try {
        response = await getProviderServiceCategoriesFromApi();
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des stands ' }
    }
    return response
}

async function addProviderServiceCategory(providerServiceCategory) {
    let response = null;
    try {
        response = await addProviderServiceCategoryFromApi(providerServiceCategory);
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible d\'ajouter un prestataire à un service' }
    }
    return response
}

async function modifyProviderServiceCategory(providerServiceCategory) {
    let response = null;
    try {
        response = await modifyProviderServiceCategoryFromApi(providerServiceCategory);
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de modifier un prestataire à un service' }
    }
    return response
}

async function deleteProviderServiceCategory(providerServiceCategory) {
    let response = null;
    try {
        response = await deleteProviderServiceCategoryFromApi(providerServiceCategory);
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de supprimer un prestataire à un service' }
    }
    return response
}

async function getServiceReservations() {
    let response = null;
    try {
        response = await getServiceReservationsFromApi();
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des réservations de services' }
    }
    return response
}

async function addServiceReservation(serviceReservation) {
    let response = null;
    try {
        response = await addServiceReservationFromApi(serviceReservation);
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible d\'ajouter une réservation de service' }
    }
    return response
}

async function modifyServiceReservation(serviceReservation) {
    let response = null;
    try {
        response = await modifyServiceReservationFromApi(serviceReservation);
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de modifier une réservation de service' }
    }
    return response
}

async function deleteServiceReservation(id) {
    let response = null;
    try {
        response = await deleteServiceReservationFromApi(id);
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de supprimer une réservation de service' }
    }
    return response
}

async function getGuestbookEntries() {
    let response = null;
    try {
        response = await getGuestbookEntriesFromApi();
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste du livre d\' or' }
    }
    return response.data
}

async function addGuestbookEntry(guestbookEntry) {
    let response = null;
    try {
        response = await addGuestbookEntryFromApi(guestbookEntry);
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible d\'ajouter un commentaire dans le livre d\' or' }
    }
    return response
}

async function modifyGuestbookEntry(guestbookEntry) {
    let response = null;
    try {
        response = await modifyGuestbookEntryFromApi(guestbookEntry);
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de modifier un commentaire dans le livre d\' or' }
    }
    return response
}

async function deleteGuestbookEntry(id) {
    let response = null;
    try {
        response = await deleteGuestbookEntryFromApi(id);
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de supprimer un commentaire dans le livre d\' or' }
    }
    return response
}

async function getGuestbookStatus() {
    let response = null;
    try {
        response = await getGuestbookStatusFromApi();
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer le statut du livre d\' or' }
    }
    return response.data
}

async function addGuestbookStatus(customer_id) {
    let response = null;
    try {
        response = await addGuestbookStatusFromApi(customer_id);
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de ajouter le statut du livre d\' or' }
    }
    return response
}

async function modifyGuestbookStatus(providerGuestbookStatus) {
    let response = null;
    try {
        response = await modifyGuestbookStatusFromApi(providerGuestbookStatus);
    } catch (err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de modifier le statut du livre d\' or'}
    }
    return response.data
}

async function getProviderScheduleStatus(){
    let response = null;
    try {
        response = await getProviderScheduleStatusFromApi();
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer le statut du planning' }
    }
    return response.data
}

async function addProviderScheduleStatus(user){
    let response = null;
    try {
        response = await addProviderScheduleStatusFromApi(user);
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible d\'ajouter le statut du planning' }
    }
    return response
}

async function modifyProviderScheduleStatus(providerScheduleStatus) {
    let response = null;
    try {
        response = await modifyProviderScheduleStatusFromApi(providerScheduleStatus);
    } catch (err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de modifier le statut du planning'}
    }
    return response
}

async function getReports() {
    let response = null;
    try {
        response = await getReportsFromApi();
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des rapports' }
    }
    return response.data
}

async function addReport(report) {
    let response = null;
    try {
        response = await addReportFromApi(report);
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible d\'ajouter un rapport' }
    }
    return response.data
}

async function modifyReport(report) {
    let response = null;
    try {
        response = await modifyReportFromApi(report);
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de modifier un rapport' }
    }
    return response
}

async function deleteReport(id) {
    let response = null;
    try {
        response = await deleteReportFromApi(id);
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de supprimer un rapport' }
    }
    return response.data
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
    getGuestbookEntries,
    addGuestbookEntry,
    deleteGuestbookEntry,
    modifyGuestbookEntry,
    getGuestbookStatus,
    addGuestbookStatus,
    modifyGuestbookStatus,
    getProviderScheduleStatus,
    addProviderScheduleStatus,
    modifyProviderScheduleStatus,
    getReports,
    addReport,
    modifyReport,
    deleteReport,
}