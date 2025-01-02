import { customer_accounts } from '../data'
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

export default{
    getCustomersAccounts,
    addCustomerAccount,
    loginUser,
    modifyCustomerAccount,
}