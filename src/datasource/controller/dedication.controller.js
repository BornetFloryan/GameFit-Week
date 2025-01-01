import {dedication_dates, customer_accounts, dedication_reservations, sports_categories} from '../data'
import store from '@/store';

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

    if (!data.date || !data.times || !data.anim_id) {
        return {error: 1, data: 'Missing parameters'};
    }

    let existingEntry = dedication_dates.find(e => e.date === data.date && e.anim_id === data.anim_id);
    if (existingEntry) {
        const newTimes = data.times.filter(time => !existingEntry.times.includes(time));
        if (newTimes.length > 0) {
            existingEntry.times.push(...newTimes);
            return {error: 0, data: null };
        } else {
            alert(`A cette date, l'animateur à déjà ouvert un créneau à cet/ces horaires : ${data.times.join(', ')} !`);
            return {error: 1, data: `This date and times (${data.times.join(', ')}) are already available`};
        }
    }

    let availableDate = {
        _id: data._id,
        date: data.date,
        times: data.times,
        anim_id: data.anim_id,
    };
    return {error: 0, data: availableDate};
}

function modifyDedicationDates(data) {
    if (data.date) {
        data.date = new Date(data.date).toISOString().split('T')[0] + 'T00:00:00.000Z';
    }

    if (!data.date || !data.times || !data.anim_id) {
        return {error: 1, data: 'Missing parameters'};
    }

    let existingEntry = dedication_dates.find(e => e.date === data.date && e.anim_id === data.anim_id);
    if (!existingEntry) {

        return {error: 1, data: 'No entry found'};

    }
    existingEntry.times = data.times;
    return {error: 0, data: existingEntry };
}

function deleteDedicationDates(data) {
    return {error: 0, data: data._id};
}

function getAnimatorDedicationDates(animator){
    let dates = dedication_dates.filter(e => e.anim_id === animator._id)

    return {
        error: 0,
        status: 200,
        data: dates.map(dateObj => new Date(dateObj.date))
    };
}

function getDedicationTimes(date) {
    const selectedDateUTC = new Date(Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    )).toISOString().split('T')[0];

    const dedicationDates = store.state.dedication.dedicationDates;
    const dedicationReservations = store.state.dedication.dedicationReservations;

    console.log(dedicationDates)

    console.log(dedicationReservations)

    for (const element of dedicationDates) {
        console.log(element)
        if (new Date(element.date).toISOString().split('T')[0] === selectedDateUTC) {
            const reservedTimes = dedicationReservations
                .filter(reservation => reservation.date === element.date)
                .map(reservation => reservation.time);

            const availableTimes = element.times.filter(time => !reservedTimes.includes(time));

            return {
                error: 0,
                status: 200,
                data: availableTimes
            };
        }
    }
    return { error: 1, status: 404, data: 'No available times found' };
}

function getDedicationReservations(){
    return {error: 0, data: dedication_reservations}
}

function addDedicationReservation(dedicationReservation) {
    let existingReservation = dedication_reservations.find(reservation =>
        reservation.date === dedicationReservation.date &&
        reservation.time === dedicationReservation.time &&
        reservation.anim_id === dedicationReservation.anim_id
    );

    if (existingReservation) {
        return { error: 1, data: 'Time slot already reserved' };
    }

    let _idReservation = dedication_reservations.length ? parseInt(dedication_reservations[dedication_reservations.length - 1]._id.toString().slice(-1)) + 1 : 0;
    let _id = (parseInt(Date.now() / 1000)).toString() + dedicationReservation.anim_id.toString() + (_idReservation + 1).toString();

    let reservation = {
        _id: _id,
        date: dedicationReservation.date,
        time: dedicationReservation.time,
        ticket_id: dedicationReservation.ticket_id,
        anim_id: dedicationReservation.anim_id,
    };

    return { error: 0, data: reservation };
}

function getCustomerDedicationReservations(customer) {
    let reservations = dedication_reservations.filter(e => e._idCustomer === customer._id);

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
    getDedicationTimes,
    getDedicationReservations,
    addDedicationReservation,
    getCustomerDedicationReservations,
    getSportsCategories,
}