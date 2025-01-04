import LocalSource from "@/datasource/controller/account.controller";

async function loginUserFromLocalSource(data) {
    // rÃ©cupÃ©ration auprÃ¨s de la source locale
    return LocalSource.loginUser(data)
}

async function getCustomersAccountsFromLocalSource() {
    // rÃ©cupÃ©ration auprÃ¨s de la source locale
    return LocalSource.getCustomersAccounts()
}

async function addCustomerAccountFromLocalSource(customer) {
    // rÃ©cupÃ©ration auprÃ¨s de la source locale
    return LocalSource.addCustomerAccount(customer)
}

async function ModifyCustomerAccountFromLocalSource(customer) {
    // rÃ©cupÃ©ration auprÃ¨s de la source locale
    return LocalSource.modifyCustomerAccount(customer)
}

async function getProviderRequestsFromLocalSource() {
    // rÃ©cupÃ©ration auprÃ¨s de la source locale
    return LocalSource.getProviderRequests()
}

async function addProviderRequestFromLocalSource(user) {
    return LocalSource.addProviderRequest(user)
}

async function modifyProviderRequestFromLocalSource(request) {
    return LocalSource.modifyProviderRequest(request)
}

async function deleteProviderRequestFromLocalSource(request) {
    return LocalSource.deleteProviderRequest(request)
}

async function loginUser(data) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await loginUserFromLocalSource(data)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de se loguer'  }
    }
    return response
}

async function getCustomersAccounts() {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getCustomersAccountsFromLocalSource()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer les comptes'  }
    }
    return response
}

async function addCustomerAccount(customer) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await addCustomerAccountFromLocalSource(customer)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de crÃ©er le compte'  }
    }
    return response
}

async function modifyCustomerAccount(customer) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await ModifyCustomerAccountFromLocalSource(customer)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de crÃ©er le compte'  }
    }
    return response
}

async function getProviderRequests() {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getProviderRequestsFromLocalSource()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer les demandes de prestataires'  }
    }
    return response
}

async function addProviderRequest(user) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await addProviderRequestFromLocalSource(user)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de crÃ©er la demande de prestataire'  }
    }
    return response
}

async function modifyProviderRequest(request) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await modifyProviderRequestFromLocalSource(request)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de modifier la demande de prestataire'  }
    }
    return response
}

async function deleteProviderRequest(request) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await deleteProviderRequestFromLocalSource(request)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de supprimer la demande de prestataire'  }
    }
    return response
}

export default {
    loginUser,
    getCustomersAccounts,
    addCustomerAccount,
    modifyCustomerAccount,
    getProviderRequests,
    addProviderRequest,
    modifyProviderRequest,
    deleteProviderRequest,
}