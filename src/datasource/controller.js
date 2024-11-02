import { customersAccounts, animators, availabledates } from './data'
import {v4 as uuidv4} from 'uuid'
/* controllers: les fonctions ci-dessous doivent mimer ce que renvoie l'API en fonction des requêtes possibles.

  Dans certains cas, ces fonctions vont avoir des paramètres afin de filtrer les données qui se trouvent dans data.js
  Ces paramètres sont généralement les mêmes qu'ils faudrait envoyer à l'API, mais pas forcément.

  Exemple 1 : se loguer auprès de la boutique
 */

function setCurrentUser(data) {
  if ((!data.login) || (!data.password)) return {error: 1, status: 404, data: 'aucun login/pass fourni'}
  // pour simplifier : test uniquement le login
  let user = customersAccounts.find(e => e.login === data.login)
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
    email: user.email,
    session: user.session
  }
  return {error: 0, status: 200, data: u}
}

function getAnimatorAvailableDates(animator){
  let dates = availabledates.filter(e => e.anim_id === animator._id)

  return {
    error: 0,
    status: 200,
    data: dates.map(dateObj => new Date(dateObj.$date))
  };
}

function getAvailableTimes(date){
  const selectedDateUTC = new Date(Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
  )).toISOString().split('T')[0];

  for (let i = 0; i < availabledates.length; i++) {
    if (new Date(availabledates[i].$date).toISOString().split('T')[0] === selectedDateUTC) {
        return {
            error: 0,
            status: 200,
            data: availabledates[i].times
        };
    }
  }
}

function getAnimators() {
  return {error: 0, data: animators}
}

function getCustomersAccounts() {
    return {error: 0, data: customersAccounts}
}

function addCustomerAccount(customer) {
  if (customersAccounts.find(e => e.email === customer.email))
    return {error: 1, status: 404, data: 'Adresse email déjà utilisée'}

  let _id = customersAccounts.length ? parseInt(customersAccounts[customersAccounts.length - 1]._id, 10) + 1 : 0;

  // retourne uniquement les champs nécessaires
  let u = {
    _id: _id,
    name: customer.name,
    login: customer.login,
    password: customer.password,
    email: customer.email,
    session: uuidv4()
  };
  return {error: 0, status: 200, data: u};
}

export default{
  setCurrentUser,
  getAnimatorAvailableDates,
  getAvailableTimes,
  getAnimators,
  getCustomersAccounts,

  addCustomerAccount,
}