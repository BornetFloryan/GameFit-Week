// import LocalSource from "@/datasource/controller/account.controller";
import {postRequest, getRequest} from "@/services/axios.service";

// async function loginUserFromLocalSource(data) {
//     return LocalSource.loginUser(data)
// }

async function loginUserFromApi(data) {
    return postRequest('accounts/login', data, 'LoginUser')
}

// async function getCustomersAccountsFromLocalSource() {
//     return LocalSource.getCustomersAccounts()
// }

async function getCustomersAccountsFromApi() {
    return getRequest('accounts/',  'GetCustomersAccounts')
}

// async function addCustomerAccountFromLocalSource(customer) {
//     return LocalSource.addCustomerAccount(customer)
// }

async function addCustomerAccountFromApi(customer) {
    return postRequest('accounts/', customer, 'AddCustomerAccount')
}

// async function ModifyCustomerAccountFromLocalSource(customer) {
//     return LocalSource.modifyCustomerAccount(customer)
// }

async function ModifyCustomerAccountFromApi(customer) {
    return postRequest('accounts/', customer, 'ModifyCustomerAccount')
}

// async function deleteCustomerAccountFromLocalSource(customer) {
//     return LocalSource.deleteCustomerAccount(customer)
// }

async function deleteCustomerAccountFromApi(customer) {
    return postRequest('accounts/', customer, 'DeleteCustomerAccount')
}

// async function getProviderRequestsFromLocalSource() {
//     return LocalSource.getProviderRequests()
// }

async function getProviderRequestsFromApi() {
    return getRequest('provider-requests', 'GetProviderRequests')
}

// async function addProviderRequestFromLocalSource(user) {
//     return LocalSource.addProviderRequest(user)
// }

async function addProviderRequestFromApi(user) {
    return postRequest('provider-requests', user, 'AddProviderRequest')
}

// async function modifyProviderRequestFromLocalSource(request) {
//     return LocalSource.modifyProviderRequest(request)
// }

async function modifyProviderRequestFromApi(request) {
    return postRequest('provider-requests', request, 'ModifyProviderRequest')
}

// async function deleteProviderRequestFromLocalSource(request) {
//     return LocalSource.deleteProviderRequest(request)
// }

async function deleteProviderRequestFromApi(request) {
    return postRequest('provider-requests', request, 'DeleteProviderRequest')
}

// async function getSportsCategoriesFromLocalSource(){
//     return LocalSource.getSportsCategories()
// }

async function getSportsCategoriesFromApi() {
    return getRequest('sports-categories', 'GetSportsCategories')
}

// async function getProviderSportsCategoriesFromLocalSource(){
//     return LocalSource.getProviderSportsCategories()
// }

async function getProviderSportsCategoriesFromApi(){
    return getRequest('provider-sports-categories', 'GetProviderSportsCategories')
}

async function getCustomerByIdFromApi(id){
    console.log('id', id)
    return getRequest('accounts/'+id, 'GetCustomerById')
}


async function loginUser(data) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte

        // response = await loginUserFromLocalSource(data)

        response = await loginUserFromApi(data)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de se loguer'  }
    }
    return response.data
}

async function getCustomersAccounts() {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        // response = await getCustomersAccountsFromLocalSource()
        response = await getCustomersAccountsFromApi()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer les comptes'  }
    }
    return response.data
}

async function addCustomerAccount(customer) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        // response = await addCustomerAccountFromLocalSource(customer)
        response = await addCustomerAccountFromApi(customer)

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
        // response = await ModifyCustomerAccountFromLocalSource(customer)
        response = await ModifyCustomerAccountFromApi(customer)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de crÃ©er le compte'  }
    }
    return response
}

async function deleteCustomerAccount(customer) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        // response = await deleteCustomerAccountFromLocalSource(customer)
        response = await deleteCustomerAccountFromApi(customer)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de supprimer le compte'  }
    }
    return response
}

async function getProviderRequests() {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        // response = await getProviderRequestsFromLocalSource()
        response = await getProviderRequestsFromApi()
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
        // response = await addProviderRequestFromLocalSource(user)
        response = await addProviderRequestFromApi(user)
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
        // response = await modifyProviderRequestFromLocalSource(request)
        response = await modifyProviderRequestFromApi(request)
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
        // response = await deleteProviderRequestFromLocalSource(request)
        response = await deleteProviderRequestFromApi(request)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de supprimer la demande de prestataire'  }
    }
    return response
}

async function getSportsCategories(){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        // response = await getSportsCategoriesFromLocalSource()
        response = await getSportsCategoriesFromApi()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des catÃ©gories'  }
    }
    return response
}

async function getProviderSportsCategories(){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        // response = await getProviderSportsCategoriesFromLocalSource()
        response = await getProviderSportsCategoriesFromApi()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des catÃ©gories'  }
    }
    return response
}

async function getCustomerById(id){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getCustomerByIdFromApi(id)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer le client'  }
    }
    return response
}


export default {
    loginUser,
    getCustomersAccounts,
    addCustomerAccount,
    modifyCustomerAccount,
    deleteCustomerAccount,
    getProviderRequests,
    addProviderRequest,
    modifyProviderRequest,
    deleteProviderRequest,
    getSportsCategories,
    getProviderSportsCategories,
    getCustomerById,
}