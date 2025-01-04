import {customer_accounts, provider_requests} from '../data'
import {v4 as uuidv4} from 'uuid'
/* controllers: les fonctions ci-dessous doivent mimer ce que renvoie l'API en fonction des requêtes possibles.

  Dans certains cas, ces fonctions vont avoir des paramètres afin de filtrer les données qui se trouvent dans data.js
  Ces paramètres sont généralement les mêmes qu'ils faudrait envoyer à l'API, mais pas forcément.

  Exemple 1 : se loguer auprès de la boutique
 */

function getCustomersAccounts() {

    return {error: 0, data: customer_accounts}
}

function addCustomerAccount(customer) {
    if (customer_accounts.find(e => e.email === customer.email && e.login))
        return {error: 1, status: 404, data: 'Adresse email déjà utilisée'}

    let _id = customer_accounts.length ? parseInt(customer_accounts[customer_accounts.length - 1]._id) + 1 : 0;

    // retourne uniquement les champs nécessaires
    let u = {
        _id: _id,
        name: customer.name,
        login: customer.login ? customer.login : "",
        password: customer.password ? customer.password : "",
        email: customer.email,
        privilege: "0",
        session: uuidv4()
    };
    return {error: 0, status: 200, data: u};
}

function loginUser(data) {
    if ((!data.login) || (!data.password)) return {error: 1, status: 404, data: 'aucun login/pass fourni'}
    let user = customer_accounts.find(e => e.login === data.login && e.password === data.password)
    if (!user) return {error: 1, status: 404, data: 'login/pass incorrect'}
    // générer un uuid de session pour l'utilisateur si non existant
    if (!user.session) {
        user.session = uuidv4()
    }
    // retourne uniquement les champs nécessaires
    let u = {
        _id: user._id,
        name: user.name,
        login: user.login,
        password: user.password,
        email: user.email,
        privilege: user.privilege,
        session: user.session
    }
    return {error: 0, status: 200, data: u}
}

function modifyCustomerAccount(customer) {
    let user = customer_accounts.find(e => e._id === customer._id)
    if (!user) return {error: 1, status: 404, data: 'Utilisateur non trouvé'}

    user.name = customer.name
    user.login = customer.login
    user.password = customer.password
    user.email = customer.email

    return {error: 0, status: 200, data: user}
}

function getProviderRequests() {
    return {error: 0, data: provider_requests}
}

function addProviderRequest(user) {
    if(!user){
        return {error: 1, status: 404, data: 'Aucune donnée'}
    }
    if(!user.email || !user.name || !user.prestationServices || ! !user.login || !user.password){
        return {error: 1, status: 404, data: 'Champs manquants'}
    }

    let existingUser = customer_accounts.find(e => e.email === user.email)
    if(!existingUser){
        user = addCustomerAccount(user)
    } else {
        if(existingUser.password !== user.password){
            return {error: 1, status: 404, data: 'Mot de passe incorrect'}
        }
        user = existingUser;
        if(provider_requests.find(e => e.customer_id === user._id))
            return {error: 1, status: 404, data: 'Demande déjà existante'}
    }


    let request = {
        _id: uuidv4(),
        date: new Date(),
        customer_id: user._id,
        status: "0"
    };
    return {error: 0, status: 200, data: request};
}

function modifyProviderRequest(request) {
    let r = provider_requests.find(e => e._id === request._id)
    if (!r) return {error: 1, status: 404, data: 'Demande non trouvée'}

    r.customer_id = request.customer_id
    r.request = request.request
    r.status = request.status

    return {error: 0, status: 200, data: r}
}

function deleteProviderRequest(request) {
    let index = provider_requests.findIndex(e => e._id === request._id);
    if (index !== -1) {
        return {error: 0, status: 200, data: index}
    }
    return {error: 1, status: 404, data: 'Demande non trouvée'}
}

export default{
    getCustomersAccounts,
    addCustomerAccount,
    loginUser,
    modifyCustomerAccount,
    getProviderRequests,
    addProviderRequest,
    modifyProviderRequest,
    deleteProviderRequest,
}