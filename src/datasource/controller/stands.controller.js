import {pavillons, stands, stands_reservations} from '../data'

function getStands() {
    return {error: 0, data: stands}
}

function getPavillons() {
    return {error: 0, data: pavillons}
}

function getStandsReservations() {
    return {error: 0, data: stands_reservations}
}

function modifyStand(stand) {
    let index = stands.findIndex(s => s.id === stand.id)
    if (index !== -1) {
        stands[index] = stand
        return {error: 0, data: stand}
    } else {
        return {error: 1, data: 'Stand introuvable'}
    }
}

function modifyStandsReservations(standReservation) {
    let index = stands_reservations.findIndex(sr => sr.id === standReservation.id)
    if (index !== -1) {
        stands_reservations[index] = standReservation
        return {error: 0, data: standReservation}
    } else {
        return {error: 1, data: 'Réservation de stand introuvable'}
    }
}

export default{
    getStands,
    getPavillons,
    getStandsReservations,
    modifyStand,
    modifyStandsReservations,
}