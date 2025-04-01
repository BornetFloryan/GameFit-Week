import {getRequest, postRequest, deleteRequest, patchRequest} from "@/services/axios.service";

async function getTeamsFromApi() {
    return getRequest('/teams',  'GetTeams')
}

async function getTeams(){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getTeamsFromApi()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer les équipes'  }
    }
    return response.data
}

async function addTeamFromApi(data) {
    return postRequest('/teams/add',data,'AddTeam')
}

async function addTeam(data){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await addTeamFromApi(data)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible d\'ajouter une équipe'  }
    }
    return response.data
}

async function deleteTeamByIDFromApi(id) {
    return deleteRequest('/teams/'+id,'DeleteTeam')
}

async function deleteTeamByID(id){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await deleteTeamByIDFromApi(id)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de supprimer cette équipe'  }
    }
    return response.data
}


async function editTeamFromApi(data) {
    return patchRequest('/teams/edit',data,'EditTeam')
}

async function editTeam(data){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await editTeamFromApi(data)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de modifier cette équipe'  }
    }
    // console.log(response.data)
    return response.data
}


async function getMatchsFromApi() {
    return getRequest('/matchs','GetMatchs')
}

async function getMatchs(){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getMatchsFromApi()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de récupérer les matchs'  }
    }
    // console.log(response.data)
    return response.data
}

async function addMatchFromApi(data) {
    return postRequest('/matchs/add',data,'AddMatch')
}

async function addMatch(data){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await addMatchFromApi(data)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible d\'ajouter le match'  }
    }
    // console.log(response.data)
    return response.data
}


async function editMatchFromApi(data) {
    // console.log("/matchs/edit",data)
    return patchRequest('/matchs/edit',data,'EditMatch')
}

async function editMatch(data){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await editMatchFromApi(data)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de modifier le match'  }
    }
    // console.log(response.data)
    return response.data
}

//--------------

async function getRoundsFromApi() {
    return getRequest('/rounds','GetRounds')
}

async function getRounds(){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getRoundsFromApi()
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de récupérer les rounds'  }
    }
    // console.log(response.data)
    return response.data
}

async function addRoundFromApi(data) {
    return postRequest('/rounds/add',data,'AddRound')
}

async function addRound(data){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await addRoundFromApi(data)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible d\'ajouter le round'  }
    }
    // console.log(response.data)
    return response.data
}


async function editRoundFromApi(data) {
    return patchRequest('/rounds/edit',data,'EditRound')
}

async function editRound(data){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await editRoundFromApi(data)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de modifier le round'  }
    }
    // console.log(response.data)
    return response.data
}


async function deleteMatchByIDFromApi(id) {
    return deleteRequest('/matchs/'+id,'DeleteMatch')
}

async function deleteMatchByID(id){
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await deleteMatchByIDFromApi(id)
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de supprimer ce match'  }
    }
    return response.data
}

export default {
    getTeams,
    addTeam,
    deleteTeamByID,
    editTeam,

    getMatchs,
    addMatch,
    editMatch,

    getRounds,
    addRound,
    editRound,
    deleteMatchByID

}
