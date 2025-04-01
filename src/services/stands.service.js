// import LocalSource from "@/datasource/controller/stands.controller";
import {getRequest, postRequest, putRequest, deleteRequest} from "@/services/axios.service";

// async function getStandsFromLocalSource() {
//     return LocalSource.getStands();
// }

async function getStandsFromApi(){
    return getRequest('stands', 'GetStands');
}

// async function getPavillonsFromLocalSource() {
//     return LocalSource.getPavillons();
// }

async function getPavillonsFromApi(){
    return getRequest('stands/pavillons', 'GetPavillons');
}

// async function getStandsReservationsFromLocalSource() {
//     return LocalSource.getStandsReservations();
// }

async function getStandsReservationsFromApi(){
    return getRequest('stands/reservations', 'GetStandsReservations');
}

// async function modifyStandFromLocalSource(stand) {
//     return LocalSource.modifyStand(stand);
// }

async function modifyStandFromApi(stand, session){
    return putRequest('stands?session=' + session, stand, 'ModifyStand');
}

// async function modifyStandsReservationsFromLocalSource(standReservation) {
//     return LocalSource.modifyStandsReservations(standReservation);
// }

async function modifyStandsReservationsFromApi(standReservation, session){
    return putRequest('stands/reservations?session=' + session, standReservation, 'ModifyStandsReservations');
}

// async function addStandReservationFromLocalSource(standReservation) {
//     return LocalSource.addStandReservation(standReservation);
// }

async function addStandReservationFromApi(standReservation, session){
    return postRequest('stands/reservations?session=' + session, standReservation, 'AddStandReservation');
}

// async function deleteStandReservationFromLocalSource(_id) {
//     return LocalSource.deleteStandReservation(_id);
// }

async function deleteStandReservationFromApi(_id, session){
    return deleteRequest('stands/reservations/' + _id + '?session=' + session, 'DeleteStandReservation');
}

// async function deleteStandFromLocalSource(_id) {
//     return LocalSource.deleteStand(_id);
// }

async function deleteStandFromApi(_id){
    return deleteRequest('stands/' + _id, 'DeleteStand');
}

async function getStands() {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        // response = await getStandsFromLocalSource();
        response = await getStandsFromApi();
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des stands ' }
    }
    return response
}

async function getPavillons() {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        // response = await getPavillonsFromLocalSource();
        response = await getPavillonsFromApi();
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des stands ' }
    }
    return response
}

async function getStandsReservations() {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        // response = await getStandsReservationsFromLocalSource();
        response = await getStandsReservationsFromApi();
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des stands ' }
    }
    return response
}

async function modifyStand(stand, session) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        // response = await modifyStandFromLocalSource(stand);
        response = await modifyStandFromApi(stand, session);
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des stands ' }
    }
    return response
}

async function modifyStandsReservations(standReservation, session) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        // response = await modifyStandsReservationsFromLocalSource(standReservation);
        response = await modifyStandsReservationsFromApi(standReservation, session);
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des réservations des stands ' }
    }
    return response
}

async function addStandReservation(standReservation, session) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        // response = await addStandReservationFromLocalSource(standReservation);
        response = await addStandReservationFromApi(standReservation, session);
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible d\'ajouter une réservation de stands ' }
    }
    return response
}

async function deleteStandReservation(_id, session) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        // response = await deleteStandReservationFromLocalSource(_id);
        response = await deleteStandReservationFromApi(_id, session);
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de supprimer une réservation de stands ' }
    }
    return response
}

async function deleteStand(_id) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        // response = await deleteStandFromLocalSource(_id);
        response = await deleteStandFromApi(_id);
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de supprimer un stand ' }
    }
    return response
}

export default {
    getStands,
    getPavillons,
    getStandsReservations,
    modifyStand,
    modifyStandsReservations,
    addStandReservation,
    deleteStandReservation,
    deleteStand,
}