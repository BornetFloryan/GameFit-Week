import {animators, availabledates, dedicationreservations} from '../data'

/* controllers: les fonctions ci-dessous doivent mimer ce que renvoie l'API en fonction des requêtes possibles.

  Dans certains cas, ces fonctions vont avoir des paramètres afin de filtrer les données qui se trouvent dans data.js
  Ces paramètres sont généralement les mêmes qu'ils faudrait envoyer à l'API, mais pas forcément.

  Exemple 1 : se loguer auprès de la boutique
 */

//Dedication
function getAnimators() {
    return {error: 0, data: animators}
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
    getAnimatorAvailableDates,
    getAvailableTimes,
    getDedicationReservations,
    addDedicationReservation,
    getCustomerDedicationReservations,
}