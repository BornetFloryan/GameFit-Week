import {getRequest, postRequest, deleteRequest} from "@/services/axios.service";

// async function getTicketsFromLocalSource() {
//     return LocalSource.getTickets()
// }

async function getTicketsFromApi(){
    return getRequest('tickets', 'GetTickets');
}

// async function getTicketsAnimationCategoriesFromLocalSource() {
//     return LocalSource.getTicketsAnimationCategories()
// }

async function getTicketsAnimationCategoriesFromApi(){
    return getRequest('tickets/animation-categories', 'GetTicketsAnimationCategories');
}

// async function getTicketsAgeCategoriesFromLocalSource() {
//     return LocalSource.getTicketsAgeCategories()
// }

async function getTicketsAgeCategoriesFromApi(){
    return getRequest('tickets/age-categories', 'GetTicketsAgeCategories');
}

// async function getTicketPricesFromLocalSource() {
//     return LocalSource.getTicketPrices()
// }

async function getTicketPricesFromApi(){
    return getRequest('tickets/prices', 'GetTicketPrices');
}

// async function addTicketsFromLocalSource(ticket) {
//     return LocalSource.addTickets(ticket)
// }

async function addTicketsFromApi(ticket){
    return postRequest('tickets', ticket, 'AddTickets');
}

// async function deleteTicketFromLocalSource(ticket_id) {
//     return LocalSource.deleteTicket(ticket_id)
// }

async function deleteTicketFromApi(ticket_id){
    return deleteRequest('tickets/' + ticket_id, 'DeleteTicket');
}


async function getTickets() {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        // response = await getTicketsFromLocalSource()
        response = await getTicketsFromApi()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch (err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des tickets '}
    }
    return response.data
}

async function getTicketsAnimationCategories() {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        // response = await getTicketsAnimationCategoriesFromLocalSource()
        response = await getTicketsAnimationCategoriesFromApi()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch (err) {
        response = {
            error: 1,
            status: 404,
            data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des catégories d\'animations des tickets'
        }
    }
    return response.data
}

async function getTicketsAgeCategories() {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        // response = await getTicketsAgeCategoriesFromLocalSource(ticket)
        response = await getTicketsAgeCategoriesFromApi()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch (err) {
        response = {
            error: 1,
            status: 404,
            data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste d\'âges des tickets'
        }
    }
    return response.data
}

async function getTicketPrices() {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        // response = await getTicketPricesFromLocalSource()
        response = await getTicketPricesFromApi()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch (err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer le prix du ticket'}
    }
    return response.data
}

async function addTickets(formData) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        // response = await addTicketsFromLocalSource(formData)
        response = await addTicketsFromApi(formData)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch (err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible d\'ajouter le ticket'}
    }
    return response
}

async function deleteTicket(ticket_id) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        // response = await deleteTicketFromLocalSource(ticket_id)
        response = await deleteTicketFromApi(ticket_id)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch (err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de supprimer le ticket'}
    }
    return response
}

export default {
    getTickets,
    getTicketsAnimationCategories,
    getTicketsAgeCategories,
    getTicketPrices,
    addTickets,
    deleteTicket,
}