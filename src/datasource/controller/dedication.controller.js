import {availabledates, customersAccounts, dedicationreservations, sportsCategories} from '../data'

/* controllers: les fonctions ci-dessous doivent mimer ce que renvoie l'API en fonction des requêtes possibles.

  Dans certains cas, ces fonctions vont avoir des paramètres afin de filtrer les données qui se trouvent dans data.js
  Ces paramètres sont généralement les mêmes qu'ils faudrait envoyer à l'API, mais pas forcément.

  Exemple 1 : se loguer auprès de la boutique
 */

//Dedication
function getAnimators() {
    let animators = customersAccounts.filter(e => e.privilege === "1");
    return {error: 0, data: animators}
}

function getAvailableDates() {
    return { error: 0, data: availabledates };
}
function addAvailableDate(data) {
    if (data.$date) {
        data.$date = new Date(data.$date).toISOString().split('T')[0] + 'T00:00:00.000Z';
    }

    if (!data.$date || !data.times || !data.anim_id) {
        return {error: 1, data: 'Missing parameters'};
    }

    let existingEntry = availabledates.find(e => e.$date === data.$date && e.anim_id === data.anim_id);
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
        $date: data.$date,
        times: data.times,
        anim_id: data.anim_id,
    };
    return {error: 0, data: availableDate};
}

function modifyAvailableDate(data) {
    if (data.$date) {
        data.$date = new Date(data.$date).toISOString().split('T')[0] + 'T00:00:00.000Z';
    }

    if (!data.$date || !data.times || !data.anim_id) {
        return {error: 1, data: 'Missing parameters'};
    }

    let existingEntry = availabledates.find(e => e.$date === data.$date && e.anim_id === data.anim_id);
    if (!existingEntry) {

        return {error: 1, data: 'No entry found'};

    }
    existingEntry.times = data.times;
    return {error: 0, data: existingEntry };
}

function deleteAvailableDate(data) {
    return {error: 0, data: data._id};
}

function getAnimatorAvailableDates(animator){
    let dates = availabledates.filter(e => e.anim_id === animator._id)

    return {
        error: 0,
        status: 200,
        data: dates.map(dateObj => new Date(dateObj.$date))
    };
}

function getAvailableTimes(date) {
    const selectedDateUTC = new Date(Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    )).toISOString().split('T')[0];

    for (const element of availabledates) {
        if (new Date(element.$date).toISOString().split('T')[0] === selectedDateUTC) {
            const reservedTimes = dedicationreservations
                .filter(reservation => reservation.$date === element.$date)
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
    return {error: 0, data: dedicationreservations}
}

function addDedicationReservation(dedicationReservation) {
    let existingReservation = dedicationreservations.find(reservation =>
        reservation.date === dedicationReservation.date &&
        reservation.time === dedicationReservation.time &&
        reservation.anim_id === dedicationReservation.anim_id
    );

    if (existingReservation) {
        return { error: 1, data: 'Time slot already reserved' };
    }

    let _idReservation = dedicationreservations.length ? parseInt(dedicationreservations[dedicationreservations.length - 1]._id.toString().slice(-1)) + 1 : 0;
    let _id = (parseInt(Date.now() / 1000)).toString() + dedicationReservation.anim_id.toString() + (_idReservation + 1).toString();

    let reservation = {
        _id: _id,
        $date: dedicationReservation.$date,
        time: dedicationReservation.time,
        ticket_id: dedicationReservation.ticket_id,
        anim_id: dedicationReservation.anim_id,
    };

    return { error: 0, data: reservation };
}

function getCustomerDedicationReservations(customer) {
    let reservations = dedicationreservations.filter(e => e._idCustomer === customer._id);

    return {error: 0, data: reservations}
}

function getSportsCategories(){
    return {error: 0, data: sportsCategories}
}

export default{
    getAnimators,
    getAvailableDates,
    addAvailableDate,
    deleteAvailableDate,
    modifyAvailableDate,
    getAnimatorAvailableDates,
    getAvailableTimes,
    getDedicationReservations,
    addDedicationReservation,
    getCustomerDedicationReservations,
    getSportsCategories,
}