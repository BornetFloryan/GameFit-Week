import {tickets, ticketsAnimationCategories, ticketsAgeCategories, customersAccounts, ticketPrices} from '../data'
import LoginController from './account.controller'
import {v4 as uuidv4} from "uuid";

//Ticketing
function getTickets() {
    return {error: 0, data: tickets}
}

function getTicketsAnimationCategories() {
    return {error: 0, status: 200, data: ticketsAnimationCategories};
}

function getTicketsAgeCategories() {
    return {error: 0, status: 200, data: ticketsAgeCategories};
}

function getTicketPrices() {
    return {error: 0, status: 200, data: ticketPrices};
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

        let price_id = ticketPrices.find(price => price.animation_category_id === formData._idTicketAnimationCategories && price.age_category_id === formData._idTicketAgeCategories)._id;
        let _idTicket = tickets.length ? parseInt((tickets[tickets.length - 1]._id) % 10) + 1 : 0;
        let _id = (parseInt(Date.now() / 1000)).toString() + customer._id.toString() + formData._idTicketAnimationCategories.toString()
            + formData._idTicketAgeCategories.toString() + (_idTicket + i).toString();

        let ticket = {
            _id: parseInt(_id),
            $date: formData.$date,
            time: formData.time,
            _idCustomer: customer._id,
            price_id: price_id,
        };
        addedTickets.push(ticket);
    }
    return {error: 0, status: 201, data: addedTickets};
}

function deleteTicket(ticket_id) {
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