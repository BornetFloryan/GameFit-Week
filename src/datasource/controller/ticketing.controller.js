import { tickets, ticketsAnimationCategories, ticketsAgeCategories } from '../data'

/* controllers: les fonctions ci-dessous doivent mimer ce que renvoie l'API en fonction des requêtes possibles.

  Dans certains cas, ces fonctions vont avoir des paramètres afin de filtrer les données qui se trouvent dans data.js
  Ces paramètres sont généralement les mêmes qu'ils faudrait envoyer à l'API, mais pas forcément.

  Exemple 1 : se loguer auprès de la boutique
 */

//Ticketing
function getTickets() {
    return {error: 0, data: tickets}
}

function getTicketsAnimationCategories() {
    return {error: 0, status: 200, data: ticketsAnimationCategories};
}

function getTicketsAgeCategories(ticket) {
    if(!ticket._idTicketAnimationCategories) return {error: 1, status: 404, data: 'aucune catégorie d\'animation fournie'}
    let data = ticketsAgeCategories.filter(categorie => categorie._idTicketAnimationCategories === ticket._idTicketAnimationCategories)
    return {error: 0, status: 200, data: data};
}

function getTicketPrice(ticket){
    if(!ticket._idTicketAgeCategories) return {error: 1, status: 404, data: 'aucune catégorie d\'âge fournie'}
    let ticketAgeCategories = ticketsAgeCategories.find(categorie => categorie._id === ticket._idTicketAgeCategories
    && categorie._idTicketAnimationCategories === ticket._idTicketAnimationCategories)
    let data = ticketAgeCategories.price

    return {error: 0, status: 200, data: data};
}

export default{
    getTickets,
    getTicketsAnimationCategories,
    getTicketsAgeCategories,
    getTicketPrice,
}