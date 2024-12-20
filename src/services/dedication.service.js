import LocalSource from "@/datasource/controller/dedication.controller";

async function getAnimatorsFromLocalSource(){
    return LocalSource.getAnimators()
}

async function getAvailableDatesFromLocalSource(){
    return LocalSource.getAvailableDates()
}

async function addAvailableDateFromLocalSource(data){
    return LocalSource.addAvailableDate(data)
}
async function deleteAvailableDateFromLocalSource(data){
    return LocalSource.deleteAvailableDate(data)
}

async function getAnimatorAvailableDatesFromLocalSource(animator){
    return LocalSource.getAnimatorAvailableDates(animator)
}

async function getAvailableTimesFromLocalSource(date){
    return LocalSource.getAvailableTimes(date)
}

async function getDedicationReservationsFromLocalSource(){
    return LocalSource.getDedicationReservations()
}

async function addDedicationReservationFromLocalSource(dedicationReservation){
    return LocalSource.addDedicationReservation(dedicationReservation)
}

async function modifyAvailableDateFromLocalSource(data){
    return LocalSource.modifyAvailableDate(data)
}

async function getCustomerDedicationReservationsFromLocalSource(customer){
    return LocalSource.getCustomerDedicationReservations(customer)
}

async function getSportsCategoriesFromLocalSource(){
    return LocalSource.getSportsCategories()
}

async function getAnimators(){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getAnimatorsFromLocalSource()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des animateurs'  }
    }
    return response
}

async function getAvailableDates(){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getAvailableDatesFromLocalSource()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des dates'  }
    }
    return response
}

async function addAvailableDate(data){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await addAvailableDateFromLocalSource(data)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible d\'ajouter la date'  }
    }
    return response
}

async function modifyAvailableDate(data){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await modifyAvailableDateFromLocalSource(data)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de modifier la date'  }
    }
    return response
}

async function deleteAvailableDate(data){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await deleteAvailableDateFromLocalSource(data)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de supprimer la date'  }
    }
    return response
}

async function getAnimatorAvailableDates(_id){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getAnimatorAvailableDatesFromLocalSource(_id)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des dates'  }
    }
    return response
}

async function getAvailableTimes(date){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getAvailableTimesFromLocalSource(date)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des horaires'  }
    }
    return response
}

async function getDedicationReservations(){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getDedicationReservationsFromLocalSource()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des rÃ©servations'  }
    }
    return response
}

async function addDedicationReservation(dedicationReservation){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await addDedicationReservationFromLocalSource(dedicationReservation)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible d\'ajouter la rÃ©servation'  }
    }
    return response
}

async function getCustomerDedicationReservations(customer){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getCustomerDedicationReservationsFromLocalSource(customer)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des rÃ©servations'  }
    }
    return response
}

async function getSportsCategories(){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getSportsCategoriesFromLocalSource()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des catÃ©gories'  }
    }
    return response
}



export default {
    getAnimators,
    getAvailableDates,
    addAvailableDate,
    modifyAvailableDate,
    deleteAvailableDate,
    getAnimatorAvailableDates,
    getAvailableTimes,
    getDedicationReservations,
    addDedicationReservation,
    getCustomerDedicationReservations,
    getSportsCategories,
}