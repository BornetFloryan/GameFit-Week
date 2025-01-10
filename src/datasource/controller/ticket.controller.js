import {
    tickets,
    ticket_animation_categories,
    ticket_age_categories,
    customer_accounts,
    ticket_prices,
    service_reservations
} from '../data'
import LoginController from './account.controller'
import {v4 as uuidv4} from "uuid";

//Ticketing
function getTickets() {
    return {error: 0, data: tickets}
}

function getTicketsAnimationCategories() {
    return {error: 0, status: 200, data: ticket_animation_categories};
}

function getTicketsAgeCategories() {
    return {error: 0, status: 200, data: ticket_age_categories};
}

function getTicketPrices() {
    return {error: 0, status: 200, data: ticket_prices};
}

function addTickets(formData) {

    let customer = customer_accounts.find(customer => customer.email === formData.email);

    if (customer === undefined) {
        let _idCustomer = customer_accounts.length ? parseInt(customer_accounts[customer_accounts.length - 1]._id) + 1 : 0;
        customer = {
            _id: _idCustomer,
            name: null,
            login: null,
            password: null,
            email: formData.email,
            session: uuidv4(),
        };
        LoginController.addCustomerAccount(customer);
    }

    let addedTickets = [];
    for (let i = 0; i < formData.ticketCount; i++) {

        let price_id = ticket_prices.find(price => price.animation_category_id === formData._idTicketAnimationCategories && price.age_category_id === formData._idTicketAgeCategories)._id;

        let ticket = {
            _id: uuidv4(),
            date: formData.date,
            time: formData.time,
            customer_id: customer._id,
            price_id: price_id,
        };
        addedTickets.push(ticket);
    }
    return {error: 0, status: 201, data: addedTickets};
}

function deleteTicket(ticket_id) {
    let ticket = tickets.find(ticket => ticket._id === ticket_id);
    if (ticket === undefined) {
        return {error: 1, status: 404, data: 'ticket non trouvé'};
    }
    let reservations = service_reservations.filter(reservation => reservation.ticket_id === ticket_id);
    if (reservations.length) {
        return {error: 1, status: 400, data: 'le ticket possède une réservation, annulez la réservation avant de supprimer le ticket'};
    }

    return {error: 0, status: 204, data: ticket_id};
}

export default {
    getTickets,
    getTicketsAnimationCategories,
    getTicketsAgeCategories,
    getTicketPrices,
    addTickets,
    deleteTicket,
}