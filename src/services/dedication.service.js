import LocalSource from "@/datasource/controller/dedication.controller";

async function getAnimatorsFromLocalSource(){
    return LocalSource.getAnimators()
}

async function getDedicationDatesFromLocalSource(){
    return LocalSource.getDedicationDates()
}

async function addDedicationDatesFromLocalSource(data){
    return LocalSource.addDedicationDates(data)
}
async function deleteDedicationDatesFromLocalSource(data){
    return LocalSource.deleteDedicationDates(data)
}

async function getAnimatorDedicationDatesFromLocalSource(animator){
    return LocalSource.getAnimatorDedicationDates(animator)
}

async function getDedicationTimesFromLocalSource(date){
    return LocalSource.getDedicationTimes(date)
}

async function getDedicationReservationsFromLocalSource(){
    return LocalSource.getDedicationReservations()
}

async function addDedicationReservationFromLocalSource(dedicationReservation){
    return LocalSource.addDedicationReservation(dedicationReservation)
}

async function modifyDedicationDatesFromLocalSource(data){
    return LocalSource.modifyDedicationDates(data)
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

async function getDedicationDates(){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getDedicationDatesFromLocalSource()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des dates'  }
    }
    return response
}

async function addDedicationDates(data){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await addDedicationDatesFromLocalSource(data)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible d\'ajouter la date'  }
    }
    return response
}

async function modifyDedicationDates(data){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await modifyDedicationDatesFromLocalSource(data)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de modifier la date'  }
    }
    return response
}

async function deleteDedicationDates(data){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await deleteDedicationDatesFromLocalSource(data)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de supprimer la date'  }
    }
    return response
}

async function getAnimatorDedicationDates(_id){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getAnimatorDedicationDatesFromLocalSource(_id)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des dates'  }
    }
    return response
}

async function getDedicationTimes(date){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getDedicationTimesFromLocalSource(date)
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
    getDedicationDates,
    addDedicationDates,
    modifyDedicationDates,
    deleteDedicationDates,
    getAnimatorDedicationDates,
    getDedicationTimes,
    getDedicationReservations,
    addDedicationReservation,
    getCustomerDedicationReservations,
    getSportsCategories,
}