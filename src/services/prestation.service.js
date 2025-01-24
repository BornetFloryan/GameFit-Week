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

async function modifyProviderServiceCategoryFromLocalSource(providerServiceCategory) {
    return LocalSource.modifyProviderServiceCategory(providerServiceCategory);
}

async function deleteProviderServiceCategoryFromLocalSource(providerServiceCategory) {
    return LocalSource.deleteProviderServiceCategory(providerServiceCategory);
}

async function getServiceReservationsFromLocalSource() {
    return LocalSource.getServiceReservations();
}

async function addServiceReservationFromLocalSource(serviceReservation) {
    return LocalSource.addServiceReservation(serviceReservation);
}

async function modifyServiceReservationFromLocalSource(serviceReservation) {
    return LocalSource.modifyServiceReservation(serviceReservation);
}

async function deleteServiceReservationFromLocalSource(id) {
    return LocalSource.deleteServiceReservation(id);
}

async function getGuestbookEntriesFromLocalSource() {
    return LocalSource.getGuestbookEntries();
}

async function addGuestbookEntryFromLocalSource(guestbookEntry) {
    return LocalSource.addGuestbookEntry(guestbookEntry);
}

async function getGuestbookStatusFromLocalSource() {
    return LocalSource.getGuestbookStatus();
}

async function addGuestbookStatusFromLocalSource(customer_id) {
    return LocalSource.addGuestbookStatus(customer_id);
}

async function modifyGuestbookStatusFromLocalSource(providerGuestbookStatus) {
    return LocalSource.modifyGuestbookStatus(providerGuestbookStatus);
}

async function getProviderScheduleStatusFromLocalSource() {
    return LocalSource.getProviderScheduleStatus();
}

async function addProviderScheduleStatusFromLocalSource(user) {
    return LocalSource.addProviderScheduleStatus(user);
}

async function modifyProviderScheduleStatusFromLocalSource(providerScheduleStatus) {
    return LocalSource.modifyProviderScheduleStatus(providerScheduleStatus);
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

async function modifyProviderServiceCategory(providerServiceCategory) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await modifyProviderServiceCategoryFromLocalSource(providerServiceCategory);
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de modifier un prestataire à un service' }
    }
    return response
}

async function deleteProviderServiceCategory(providerServiceCategory) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await deleteProviderServiceCategoryFromLocalSource(providerServiceCategory);
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de supprimer un prestataire à un service' }
    }
    return response
}

async function getServiceReservations() {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getServiceReservationsFromLocalSource();
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des rÃ©servations de services' }
    }
    return response
}

async function addServiceReservation(serviceReservation) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await addServiceReservationFromLocalSource(serviceReservation);
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible d\'ajouter une rÃ©servation de service' }
    }
    return response
}

async function modifyServiceReservation(serviceReservation) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await modifyServiceReservationFromLocalSource(serviceReservation);
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de modifier une rÃ©servation de service' }
    }
    return response
}

async function deleteServiceReservation(id) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await deleteServiceReservationFromLocalSource(id);
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de supprimer une rÃ©servation de service' }
    }
    return response
}

async function getGuestbookEntries() {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getGuestbookEntriesFromLocalSource();
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste du livre d\' or' }
    }
    return response
}

async function addGuestbookEntry(guestbookEntry) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await addGuestbookEntryFromLocalSource(guestbookEntry);
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible d\'ajouter un commentaire dans le livre d\' or' }
    }
    return response
}

async function getGuestbookStatus() {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getGuestbookStatusFromLocalSource();
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer le statut du livre d\' or' }
    }
    return response
}

async function addGuestbookStatus(customer_id) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await addGuestbookStatusFromLocalSource(customer_id);
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de ajouter le statut du livre d\' or' }
    }
    return response
}

async function modifyGuestbookStatus(providerGuestbookStatus) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await modifyGuestbookStatusFromLocalSource(providerGuestbookStatus);
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de modifier le statut du livre d\' or' }
    }
    return response
}

async function getProviderScheduleStatus(){
    let response = null;
    try {
        response = await getProviderScheduleStatusFromLocalSource();
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer le statut du planning' }
    }
    return response
}

async function addProviderScheduleStatus(user){
    let response = null;
    try {
        response = await addProviderScheduleStatusFromLocalSource(user);
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible d\'ajouter le statut du planning' }
    }
    return response
}

async function modifyProviderScheduleStatus(providerScheduleStatus) {
    let response = null;
    try {
        response = await modifyProviderScheduleStatusFromLocalSource(providerScheduleStatus);
    } catch (err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de modifier le statut du planning'}
    }
    return response
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
    getGuestbookStatus,
    addGuestbookStatus,
    modifyGuestbookStatus,
    getProviderScheduleStatus,
    addProviderScheduleStatus,
    modifyProviderScheduleStatus,
}