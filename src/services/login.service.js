import LocalSource from "@/datasource/controller/login.controller";

async function setCurrentUserFromLocalSource(data) {
    // rÃ©cupÃ©ration auprÃ¨s de la source locale
    return LocalSource.setCurrentUser(data)
}

async function getCustomersAccountsFromLocalSource() {
    // rÃ©cupÃ©ration auprÃ¨s de la source locale
    return LocalSource.getCustomersAccounts()
}

async function addCustomerAccountFromLocalSource(customer) {
    // rÃ©cupÃ©ration auprÃ¨s de la source locale
    return LocalSource.addCustomerAccount(customer)
}

async function updateCustomerAccountFromLocalSource(customer) {
    // rÃ©cupÃ©ration auprÃ¨s de la source locale
    return LocalSource.updateCustomerAccount(customer)
}

/*
async function shopLoginFromAPI(data) {
  // a Ã©crire quand l'API est fonctionnelle
  return {}
}
 */


async function setCurrentUser(data) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await setCurrentUserFromLocalSource(data)
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

async function updateCustomerAccount(customer) {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await updateCustomerAccountFromLocalSource(customer)
        console.log("response", response);
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de mettre à jour le compte'  }
    }
    return response
}


export default {
    setCurrentUser,
    getCustomersAccounts,
    updateCustomerAccount,
    addCustomerAccount,
}