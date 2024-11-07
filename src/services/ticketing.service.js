import LocalSource from "@/datasource/controller/ticketing.controller";

async function getTicketsFromLocalSource(){
    return LocalSource.getTickets()
}

async function getTicketsAnimationCategoriesFromLocalSource(){
    return LocalSource.getTicketsAnimationCategories()
}

async function getTicketsAgeCategoriesFromLocalSource(ticket){
    return LocalSource.getTicketsAgeCategories(ticket)
}

async function getTicketPriceFromLocalSource(ticket){
    return LocalSource.getTicketPrice(ticket)
}


async function getTickets(){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getTicketsFromLocalSource()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des tickets '  }
    }
    return response
}

async function getTicketsAnimationCategories(){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getTicketsAnimationCategoriesFromLocalSource()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des catégories d\'animations des tickets'  }
    }
    return response
}

async function getTicketsAgeCategories(ticket){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getTicketsAgeCategoriesFromLocalSource(ticket)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste d\'âges des tickets'  }
    }
    return response
}

async function getTicketPrice(ticket){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getTicketPriceFromLocalSource(ticket)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer le prix du ticket'  }
    }
    return response
}

export default {
    getTickets,
    getTicketsAnimationCategories,
    getTicketsAgeCategories,
    getTicketPrice
}