import LocalSource from "@/datasource/controller/ticket.controller";

async function getTicketsFromLocalSource() {
    return LocalSource.getTickets()
}

async function getTicketsAnimationCategoriesFromLocalSource() {
    return LocalSource.getTicketsAnimationCategories()
}

async function getTicketsAgeCategoriesFromLocalSource(ticket) {
    return LocalSource.getTicketsAgeCategories(ticket)
}

async function getTicketPricesFromLocalSource() {
    return LocalSource.getTicketPrices()
}

async function addTicketsFromLocalSource(ticket) {
    return LocalSource.addTickets(ticket)
}

async function deleteTicketFromLocalSource(ticket_id) {
    return LocalSource.deleteTicket(ticket_id)
}


async function getTickets() {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getTicketsFromLocalSource()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch (err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des tickets '}
    }
    return response
}

async function getTicketsAnimationCategories() {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getTicketsAnimationCategoriesFromLocalSource()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch (err) {
        response = {
            error: 1,
            status: 404,
            data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des catégories d\'animations des tickets'
        }
    }
    return response
}

async function getTicketsAgeCategories(ticket) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getTicketsAgeCategoriesFromLocalSource(ticket)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch (err) {
        response = {
            error: 1,
            status: 404,
            data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste d\'âges des tickets'
        }
    }
    return response
}

async function getTicketPrices() {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getTicketPricesFromLocalSource()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch (err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer le prix du ticket'}
    }
    return response
}

async function addTickets(formData) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await addTicketsFromLocalSource(formData)
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
        response = await deleteTicketFromLocalSource(ticket_id)
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