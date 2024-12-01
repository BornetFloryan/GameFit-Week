import { availabledates, customersAccounts, dedicationreservations} from '../data'

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

function getAvailableDates(){
    return {error: 0, data: availabledates}
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

    let _id = availabledates.length ? parseInt(availabledates[availabledates.length - 1]._id) + 1 : 0;

    let availableDate = {
        _id: _id,
        $date: data.$date,
        times: data.times,
        anim_id: data.anim_id,
    };

    return {error: 0, data: availableDate};
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

    for (const element of availabledates) {
        if (new Date(element.$date).toISOString().split('T')[0] === selectedDateUTC) {
            return {
                error: 0,
                status: 200,
                data: element.times
            };
        }
    }
}

function getDedicationReservations(){
    return {error: 0, data: dedicationreservations}
}

function addDedicationReservation(dedicationReservation){
    let _idReservation = dedicationreservations.length ? parseInt(dedicationreservations[dedicationreservations.length - 1]._id.toString().slice(-1)) + 1 : 0;
    let _id = (parseInt(Date.now() / 1000)).toString() + dedicationReservation.customer._id.toString()
        + dedicationReservation.anim_id.toString() + (_idReservation + 1).toString();

    let reservation = {
        _id: parseInt(_id),
        date: dedicationReservation.date,
        time: dedicationReservation.time,
        _idCustomer: dedicationReservation.customer._id,
        anim_id: dedicationReservation.anim_id,
    };

    return {error: 0, data: reservation}
}

function getCustomerDedicationReservations(customer) {
    let reservations = dedicationreservations.filter(e => e._idCustomer === customer._id);

    return {error: 0, data: reservations}
}

export default{
    getAnimators,
    getAvailableDates,
    addAvailableDate,
    getAnimatorAvailableDates,
    getAvailableTimes,
    getDedicationReservations,
    addDedicationReservation,
    getCustomerDedicationReservations,
}