import {
    customer_accounts, guestbook_entries, provider_guestbook_status, provider_schedule_status,
    provider_service_categories,
    service_categories,
    service_reservations
} from "@/datasource/data";
import {v4 as uuidv4} from 'uuid'
import store from "@/store";

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
        if(existingProviderServiceCategories.find(e => e.service_id === providerServiceCategory.serviceCategory)){
            return {error: 1, status: 404, data: 'Service déjà existant pour le prestataire'}
        }
    }

    let providerServiceCategoryData = {
        _id: uuidv4(),
        state: "0",
        customer_id: existingUser._id,
        service_id: providerServiceCategory.serviceCategory
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

    if(store.state.account.currentUser == null){
        return {error: 1, status: 404, data: 'vous n\'Ãªtes pas connectÃ©'}
    }

    if (store.state.account.currentUser.privilege < '1'){
        return {error: 1, status: 404, data: 'vous n\'avez pas les droits pour effectuer cette action'}
    }

    let existingProviderServiceCategory = provider_service_categories.find(e => e._id === providerServiceCategory._id);
    if(!existingProviderServiceCategory){
        return {error: 1, status: 404, data: 'Service non trouvé'}
    }

    existingProviderServiceCategory.state = providerServiceCategory.state;
    existingProviderServiceCategory.customer_id = providerServiceCategory.customer_id;
    existingProviderServiceCategory.service_id = providerServiceCategory.service_id;

    return {error: 0, status: 200, data: existingProviderServiceCategory}
}

function deleteProviderServiceCategory(providerServiceCategory) {
    if(!providerServiceCategory){
        return {error: 1, status: 404, data: 'Aucune donnée'}
    }
    if(!providerServiceCategory._id){
        return {error: 1, status: 404, data: 'ID manquant'}
    }

    if(store.state.account.currentUser == null){
        return {error: 1, status: 404, data: 'vous n\'Ãªtes pas connectÃ©'}
    }

    if (store.state.account.currentUser.privilege < '1'){
        return {error: 1, status: 404, data: 'vous n\'avez pas les droits pour effectuer cette action'}
    }

    if(service_reservations.find(e => e.service_id === providerServiceCategory.service_id)){
        return {error: 1, status: 404, data: 'Impossible de supprimer : Service lié à une réservation'}
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
    if (!serviceReservation.stand_reservation_id) {
        return {error: 1, status: 404, data: 'ID de réservation de stand manquant'};
    }

    let serviceReservationData = {
        _id: uuidv4(),
        date: serviceReservation.date,
        time: serviceReservation.time,
        ticket_id: serviceReservation.ticket_id,
        service_id: serviceReservation.service_id,
        stand_reservation_id: serviceReservation.stand_reservation_id
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

    if(store.state.account.currentUser == null){
        return {error: 1, status: 404, data: 'vous n\'Ãªtes pas connectÃ©'}
    }

    if (store.state.account.currentUser.privilege < '1'){
        return {error: 1, status: 404, data: 'vous n\'avez pas les droits pour effectuer cette action'}
    }

    let existingServiceReservation = service_reservations.find(e => e._id === serviceReservation._id);
    if (!existingServiceReservation) {
        return {error: 1, status: 404, data: 'Réservation non trouvée'}
    }

    existingServiceReservation.date = serviceReservation.date;
    existingServiceReservation.time = serviceReservation.time;
    existingServiceReservation.ticket_id = serviceReservation.ticket_id;
    existingServiceReservation.service_id = serviceReservation.service_id;
    existingServiceReservation.stand_reservation_id = serviceReservation.stand_reservation_id;

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

function getGuestbookEntries() {
    return {error: 0, data: guestbook_entries}
}

function addGuestbookEntry(guestbookEntry) {
    if (!guestbookEntry) {
        return {error: 1, status: 404, data: 'Aucune donnée'}
    }
    if(!guestbookEntry.newEntry){
        return {error: 1, status: 404, data: 'Aucune donnée'}
    }
    if (!guestbookEntry.currentUser){
        return {error: 1, status: 404, data: 'Utilisateur non renseigné'}
    }
    if(!guestbookEntry.prestataire){
        return {error: 1, status: 404, data: 'Prestataire non renseigné'}
    }

    if (!guestbookEntry.newEntry.rating){
        return {error: 1, status: 404, data: 'Note manquante'};
    }
    if (!guestbookEntry.newEntry.comment){
        return {error: 1, status: 404, data: 'Commentaire manquant'};
    }

    const date = new Date();

    let tickets = store.state.ticket.tickets.filter(e => e.customer_id === guestbookEntry.currentUser._id);
    if (!tickets || tickets.length === 0) {
        return {error: 1, status: 404, data: 'Pas de tickets trouvés pour l\'utilisateur'};
    }

    let serviceReservations = service_reservations.filter(e => tickets.some(ticket => e.ticket_id === ticket._id));
    if (serviceReservations.length === 0) {
        return {error: 1, status: 404, data: 'Pas de réservations de service trouvée pour les tickets'};
    }

    let standReservations = store.state.stands.standsReservations.filter(e => e.customer_id === guestbookEntry.prestataire._id);
    if (standReservations.length === 0) {
        return {error: 1, status: 404, data: 'Pas de réservation de stand trouvée pour le prestataire'};
    }

    let customerServiceReservation = serviceReservations.find(serviceReservation =>
        standReservations.some(standReservation => serviceReservation.stand_reservation_id === standReservation._id)
    );

    if (!customerServiceReservation) {
        return {error: 1, status: 404, data: 'Aucune réservation de service n\'est liée au prestataire'};
    }



    let guestbookEntryData = {
        _id: uuidv4(),
        date: date,
        rating: guestbookEntry.newEntry.rating,
        comment: guestbookEntry.newEntry.comment,
        service_reservations_id: customerServiceReservation._id
    }

    return {error: 0, status: 200, data: guestbookEntryData}
}

function getGuestbookStatus() {
    return {error: 0, data: provider_guestbook_status}
}

function addGuestbookStatus(customer_id) {
    if(!customer_id){
        return {error: 1, status: 404, data: 'Aucune donnée'}
    }

    let existingCustomer = customer_accounts.find(e => e._id === customer_id);
    if(!existingCustomer){
        return {error: 1, status: 404, data: 'Utilisateur non trouvé'}
    }

    let guestbookStatusData = {
        _id: uuidv4(),
        guestbook_activated: false,
        customer_id: existingCustomer._id
    };

    return {error: 0, status: 200, data: guestbookStatusData}

}

function modifyGuestbookStatus(providerGuestbookStatus) {
    if(!providerGuestbookStatus){
        return {error: 1, status: 404, data: 'Aucune donnée'}
    }

    if(store.state.account.currentUser == null){
        return {error: 1, status: 404, data: 'vous n\'Ãªtes pas connectÃ©'}
    }

    if (store.state.account.currentUser.privilege < '1'){
        return {error: 1, status: 404, data: 'vous n\'avez pas les droits pour effectuer cette action'}
    }

    let existingStatus = guestbook_entries.find(e => e._id === providerGuestbookStatus._id);
    if(!existingStatus){
        return {error: 1, status: 404, data: 'Statut non trouvé'}
    }

    existingStatus.guestbook_activated = providerGuestbookStatus.guestbook_activated;

    return {error: 0, status: 200, data: existingStatus}
}

function getProviderScheduleStatus() {
    return {error: 0, data: provider_schedule_status}
}

function addProviderScheduleStatus(user) {
    if(!user){
        return {error: 1, status: 404, data: 'Aucune donnée'}
    }
    if(!user.email){
        return {error: 1, status: 404, data: 'Email manquant'}
    }

    let existingUser = customer_accounts.find(e => e.email === user.email);
    if(!existingUser){
        return {error: 1, status: 404, data: 'Utilisateur non trouvé'}
    }

    let existingProviderScheduleStatus = provider_schedule_status.find(e => e.customer_id === existingUser._id);
    if(existingProviderScheduleStatus){
        return {error: 1, status: 404, data: 'Statut déjà existant pour le prestataire'}
    }

    let providerScheduleStatusData = {
        _id: uuidv4(),
        schedule_activated: false,
        customer_id: existingUser._id
    }

    return {error: 0, status: 200, data: providerScheduleStatusData}
}

function modifyProviderScheduleStatus(providerScheduleStatus) {
    if(!providerScheduleStatus){
        return {error: 1, status: 404, data: 'Aucune donnée'}
    }
    if(!providerScheduleStatus._id){
        return {error: 1, status: 404, data: 'ID manquant'}
    }

    if(store.state.account.currentUser == null){
        return {error: 1, status: 404, data: 'vous n\'Ãªtes pas connectÃ©'}
    }

    if (store.state.account.currentUser.privilege < '1'){
        return {error: 1, status: 404, data: 'vous n\'avez pas les droits pour effectuer cette action'}
    }

    let existingProviderScheduleStatus = provider_schedule_status.find(e => e._id === providerScheduleStatus._id);
    if(!existingProviderScheduleStatus){
        return {error: 1, status: 404, data: 'Statut non trouvé'}
    }

    existingProviderScheduleStatus.schedule_activated = providerScheduleStatus.schedule_activated;
    existingProviderScheduleStatus.customer_id = providerScheduleStatus.customer_id;

    return {error: 0, status: 200, data: existingProviderScheduleStatus}
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