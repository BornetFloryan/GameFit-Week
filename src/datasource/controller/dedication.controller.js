import {dedication_dates, customer_accounts, dedication_reservations, sports_categories} from '../data'
import {v4 as uuidv4} from 'uuid'

//Dedication
function getAnimators() {
    let animators = customer_accounts.filter(e => e.privilege === "1");
    return {error: 0, data: animators}
}

function getDedicationDates() {
    return { error: 0, data: dedication_dates };
}

function addDedicationDates(data) {
    if (data.date) {
        data.date = new Date(data.date).toISOString().split('T')[0] + 'T00:00:00.000Z';
    }

    if (!data.date || !data.times || !data.customer_id) {
        return {error: 1, data: 'Missing parameters'};
    }

    let new_dedication_dates = [];
    for(let time of data.times) {
        let existingEntry = dedication_dates.find(date => date.date === data.date && date.time === time);
        if (existingEntry) {
            return {error: 1, data: `Cette date et ces horaires (${time.join(', ')}) sont déjà utilisés`};
        }

        new_dedication_dates.push({
            _id: uuidv4(),
            date: data.date,
            time: time,
            customer_id: data.customer_id
        });
    }
    return {error: 0, data: new_dedication_dates};
}

function modifyDedicationDates(data) {
    if (data.date) {
        data.date = new Date(data.date).toISOString().split('T')[0] + 'T00:00:00.000Z';
    }

    if (!data.date || !data.time || !data.customer_id) {
        return {error: 1, data: 'Missing parameters'};
    }

    let existingEntry = dedication_dates.find(e => e.date === data.date && e.customer_id === data.customer_id);
    if (!existingEntry) {

        return {error: 1, data: 'No entry found'};

    }
    existingEntry.time = data.time;
    return {error: 0, data: existingEntry };
}

function deleteDedicationDates(data) {
    return {error: 0, data: data._id};
}

function getAnimatorDedicationDates(animator){
    let dates = dedication_dates.filter(e => e.customer_id === animator._id)

    return {
        error: 0,
        status: 200,
        data: dates,
    };
}

function getDedicationReservations(){
    return {error: 0, data: dedication_reservations}
}

function addDedicationReservation(dedicationReservation) {
    let existingReservation = dedication_reservations.find(reservation =>
        reservation.date === dedicationReservation.date &&
        reservation.time === dedicationReservation.time &&
        reservation.customer_id === dedicationReservation.customer_id
    );

    if (existingReservation) {
        return { error: 1, data: 'Time slot already reserved' };
    }

    let reservation = {
        _id: uuidv4(),
        date: dedicationReservation.date,
        time: dedicationReservation.time,
        ticket_id: dedicationReservation.ticket_id,
        customer_id: dedicationReservation.customer_id,
    };

    return { error: 0, data: reservation };
}

function getCustomerDedicationReservations(customer) {
    let reservations = dedication_reservations.filter(e => e.customer_id === customer._id);

    return {error: 0, data: reservations}
}

function getSportsCategories(){
    return {error: 0, data: sports_categories}
}

export default{
    getAnimators,
    getDedicationDates,
    addDedicationDates,
    deleteDedicationDates,
    modifyDedicationDates,
    getAnimatorDedicationDates,
    getDedicationReservations,
    addDedicationReservation,
    getCustomerDedicationReservations,
    getSportsCategories,
}