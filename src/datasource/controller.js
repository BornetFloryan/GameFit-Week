import { items, shopusers, bankaccounts, transactions, animators, availabledates } from './data'
import {v4 as uuidv4} from 'uuid'
/* controllers: les fonctions ci-dessous doivent mimer ce que renvoie l'API en fonction des requêtes possibles.

  Dans certains cas, ces fonctions vont avoir des paramètres afin de filtrer les données qui se trouvent dans data.js
  Ces paramètres sont généralement les mêmes qu'ils faudrait envoyer à l'API, mais pas forcément.

  Exemple 1 : se loguer auprès de la boutique
 */

function shopLogin(data) {
  if ((!data.login) || (!data.password)) return {error: 1, status: 404, data: 'aucun login/pass fourni'}
  // pour simplifier : test uniquement le login
  let user = shopusers.find(e => e.login === data.login)
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

function getAllViruses() {
  return {error: 0, data: items}
}

function getAccountAmount(number){
  if (!number) return {error: 1, status: 404, data: 'aucun compte'}

  let account = bankaccounts.find(e => e.number === number.number)

  if (!account) return {error: 1, status: 404, data: 'compte incorrect'}

  let amount = account.amount
  return {error: 0, status: 200, data: amount}
}

function getAccountTransaction(number){
  if (!number) return {error: 1, status: 404, data: 'aucun compte'}
  let account = bankaccounts.find(e => e.number === number.number)

  if (!account) return {error: 1, status: 404, data: "compte incorrect"}
  let accountTransactions = transactions.filter(e => e.account === account._id)

  let transactionsData = accountTransactions.map(transaction => {
    return {
      account: transaction.account,
      amount: transaction.amount,
      date: transaction.date,
      uuid: transaction.uuid
    }
  });
  return {error: 0, status: 200, data: transactionsData}
}

function getAnimatorAvailableDates(_id){
  let dates = availabledates.filter(e => e.anim_id === _id)

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

export default{
  shopLogin,
  getAllViruses,
  getAccountAmount,
  getAccountTransaction,
  getAnimatorAvailableDates,
  getAvailableTimes,
  getAnimators,
}