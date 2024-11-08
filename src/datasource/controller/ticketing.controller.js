import {tickets, ticketsAnimationCategories, ticketsAgeCategories, customersAccounts} from '../data'
import LoginController from './login.controller'
import {v4 as uuidv4} from "uuid";

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

function addTickets(formData) {
    let customer = customersAccounts.find(customer => customer.email === formData.email);

    if (customer === undefined) {
        let _idCustomer = customersAccounts.length ? parseInt(customersAccounts[customersAccounts.length - 1]._id) + 1 : 0;
        customer = {
            _id: _idCustomer,
            name: formData.name,
            login: null,
            password: null,
            email: formData.email,
            session: uuidv4(),
        };
        LoginController.addCustomerAccount(customer);
    }

    let addedTickets = [];
    for (let i = 0; i < formData.ticketCount; i++) {
        let _idTicket = tickets.length ? parseInt(tickets[tickets.length - 1]._id) + 1 : 0;
        let ticket = {
            _id: _idTicket + i,
            date: formData.date,
            time: formData.time,
            _idCustomer: customer._id,
            _idTicketAnimationCategories: formData._idTicketAnimationCategories,
            _idTicketAgeCategories: formData._idTicketAgeCategories,
            email: formData.email,
        };
        addedTickets.push(ticket);
    }
    return { error: 0, status: 201, data: addedTickets };
}

export default{
    getTickets,
    getTicketsAnimationCategories,
    getTicketsAgeCategories,
    getTicketPrice,
    addTickets,
}