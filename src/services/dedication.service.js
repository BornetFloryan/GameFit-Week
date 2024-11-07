import LocalSource from "@/datasource/controller/dedication.controller";

async function getAnimatorsFromLocalSource(){
    return LocalSource.getAnimators()
}

async function getAnimatorAvailableDatesFromLocalSource(animator){
    return LocalSource.getAnimatorAvailableDates(animator)
}

async function getAvailableTimesFromLocalSource(date){
    return LocalSource.getAvailableTimes(date)
}

async function getAnimators(){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getAnimatorsFromLocalSource()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des animateurs'  }
    }
    return response
}

async function getAnimatorAvailableDates(_id){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getAnimatorAvailableDatesFromLocalSource(_id)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des dates'  }
    }
    return response
}

async function getAvailableTimes(date){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getAvailableTimesFromLocalSource(date)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des horaires'  }
    }
    return response
}




export default {
    getAnimators,
    getAnimatorAvailableDates,
    getAvailableTimes,

}