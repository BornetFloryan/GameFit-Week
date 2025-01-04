import LocalSource from "@/datasource/controller/stands.controller";

async function getStandsFromLocalSource() {
    return LocalSource.getStands();
}

async function getPavillonsFromLocalSource() {
    return LocalSource.getPavillons();
}

async function getStandsReservationsFromLocalSource() {
    return LocalSource.getStandsReservations();
}

async function modifyStandFromLocalSource(stand) {
    return LocalSource.modifyStand(stand);
}

async function modifyStandsReservationsFromLocalSource(standReservation) {
    return LocalSource.modifyStandsReservations(standReservation);
}

async function addStandReservationFromLocalSource(standReservation) {
    return LocalSource.addStandReservation(standReservation);
}

async function deleteStandReservationFromLocalSource(_id) {
    return LocalSource.deleteStandReservation(_id);
}

async function deleteStandFromLocalSource(_id) {
    return LocalSource.deleteStand(_id);
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

async function getPavillons() {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getPavillonsFromLocalSource();
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
        response = await getStandsReservationsFromLocalSource();
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des stands ' }
    }
    return response
}

async function modifyStand(stand) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await modifyStandFromLocalSource(stand);
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des stands ' }
    }
    return response
}

async function modifyStandsReservations(standReservation) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await modifyStandsReservationsFromLocalSource(standReservation);
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des réservations des stands ' }
    }
    return response
}

async function addStandReservation(standReservation) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await addStandReservationFromLocalSource(standReservation);
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible d\'ajouter une réservation de stands ' }
    }
    return response
}

async function deleteStandReservation(_id) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await deleteStandReservationFromLocalSource(_id);
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
        response = await deleteStandFromLocalSource(_id);
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