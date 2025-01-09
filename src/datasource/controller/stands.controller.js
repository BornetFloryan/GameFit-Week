import {pavillons, stands, stands_reservations} from '../data'
import {v4 as uuidv4} from 'uuid'
import store from "@/store";

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
    if(store.state.account.currentUser == null){
        return {error: 1, status: 404, data: 'vous n\'Ãªtes pas connectÃ©'}
    }

    if (store.state.account.currentUser.privilege < '2'){
        return {error: 1, status: 404, data: 'vous n\'avez pas les droits pour effectuer cette action'}
    }

    let index = stands.findIndex(s => s.id === stand.id)
    if (index !== -1) {
        stands[index] = stand
        return {error: 0, data: stand}
    } else {
        return {error: 1, data: 'Stand introuvable'}
    }
}

function modifyStandsReservations(standReservation) {
    if(!standReservation){
        return {error: 1, data: 'Aucune donnée'}
    }

    if(store.state.account.currentUser == null){
        return {error: 1, status: 404, data: 'vous n\'Ãªtes pas connectÃ©'}
    }

    if (store.state.account.currentUser.privilege < '2'){
        return {error: 1, status: 404, data: 'vous n\'avez pas les droits pour effectuer cette action'}
    }

    if(!standReservation.date || !standReservation.stand_id || !standReservation.customer_id || !standReservation.description
        || !standReservation.start_time || !standReservation.end_time || !standReservation.service_id){
        return {error: 1, data: 'Données manquantes'}
    }
    let index = stands_reservations.findIndex(sr => sr._id === standReservation._id)
    if (index !== -1) {
        return {error: 0, data: standReservation}
    } else {
        return {error: 1, data: 'Réservation de stand introuvable'}
    }
}

function addStandReservation(standReservation) {
    if(!standReservation){
        return {error: 1, data: 'Aucune donnée'}
    }
    if(store.state.account.currentUser == null){
        return {error: 1, status: 404, data: 'vous n\'Ãªtes pas connectÃ©'}
    }

    if (store.state.account.currentUser.privilege < '1'){
        return {error: 1, status: 404, data: 'vous n\'avez pas les droits pour effectuer cette action'}
    }

    if(!standReservation.date || !standReservation.stand_id || !standReservation.customer_id || !standReservation.description
        || !standReservation.start_time || !standReservation.end_time || !standReservation.service_id){
        return {error: 1, data: 'Données manquantes'}
    }
    standReservation._id = uuidv4()
    return {error: 0, data: standReservation}
}

function deleteStandReservation(_id) {
    if(store.state.account.currentUser == null){
        return {error: 1, status: 404, data: 'vous n\'Ãªtes pas connectÃ©'}
    }

    if (store.state.account.currentUser.privilege < '1'){
        return {error: 1, status: 404, data: 'vous n\'avez pas les droits pour effectuer cette action'}
    }

    let index = stands_reservations.findIndex(sr => sr._id === _id)
    if (index !== -1) {
        return {error: 0, data: index}
    } else {
        return {error: 1, data: 'Réservation de stand introuvable'}
    }
}

function deleteStand(_id) {
    if(store.state.account.currentUser == null){
        return {error: 1, status: 404, data: 'vous n\'Ãªtes pas connectÃ©'}
    }

    if (store.state.account.currentUser.privilege < '2'){
        return {error: 1, status: 404, data: 'vous n\'avez pas les droits pour effectuer cette action'}
    }

    let index = stands.findIndex(s => s._id === _id)
    if (index !== -1) {
        return {error: 0, data: index}
    } else {
        return {error: 1, data: 'Stand introuvable'}
    }
}

export default{
    getStands,
    getPavillons,
    getStandsReservations,
    modifyStand,
    modifyStandsReservations,
    addStandReservation,
    deleteStandReservation,
    deleteStand,
}