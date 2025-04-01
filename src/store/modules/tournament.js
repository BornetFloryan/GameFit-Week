import TournamentService from '../../services/tournament.service';

const state = () =>({
    teams: [],
    matchs:[],
    round:[],
    tournamentStarted: false,
});
const getters = {
    getAllTeams:(state) =>{
        return state.teams;
    },
    getMatchesByRoundID: (state) => {
        return (roundId) => {
            return state.matchs.filter(match => match.round_id === roundId);
        };
    }

};
const mutations = {
    setMatchs(state,item){
        state.matchs =item;
    },
    AddMatch(state,item){
        state.matchs.push(item);
    },
    EditMatch(state,item){
        const index = state.matchs.findIndex(match => match._id === item._id);
        if (index !== -1) {
            state.matchs[index] = { ...state.matchs[index], ...item };  // Mise à jour des propriétés de l'équipe
        }
    },

    setRounds(state,item){
        state.round =item;
    },
    AddRound(state,item){
        state.round.push(item);
    },
    EditRound(state,item){
        const index = state.round.findIndex(r => r._id === item._id);
        if (index !== -1) {
            state.round[index] = { ...state.round[index], ...item };  // Mise à jour des propriétés de l'équipe
        }
    },

    setTeams(state,item){
        state.teams =item;
    },
    addTeam(state,item){
        state.teams.push(item);
    },
    removeTeam(state, teamName) {
        const index = state.teams.findIndex(team => team.name === teamName);
        if (index !== -1) {
            state.teams.splice(index, 1);
        }
    },
    editTeam(state, item) {
        const index = state.teams.findIndex(team => team._id === item._id);
        if (index !== -1) {
            state.teams[index] = { ...state.teams[index], ...item };  // Mise à jour des propriétés de l'équipe
        }
    },

    setupTournamentState(state,item){
        state.tournamentStarted = item;
    },


};
const actions = {
    async getTeams({commit}){
        try {
            let response = await TournamentService.getTeams();
            if (response.error === 0) {
                commit('setTeams', response.data);

            } else {
                console.error(response.data);
                alert(response.data.data)

            }
        } catch (error) {
            console.error('Erreur lors de la récupération des équipes:', error);
        }
    },
    async addTeam({commit},newTeam){
        try {
            let response = await TournamentService.addTeam(newTeam);
            if (response.error === 0) {
                commit('addTeam', response.data);
                // alert("L'équipe a été ajoutée avec success !")
            } else {
                console.error(response.data);
                alert(response.data.data)
            }
        }catch (error) {
            console.error('Erreur lors de la création de l\'équipes:', error);

        }
    },
    async deleteTeamByID({commit},_id){
        try {
            let response = await TournamentService.deleteTeamByID(_id);
            if (response.error === 0) {
                commit('removeTeam', response.data);
                alert("L'équipe a été supprimée avec success")
            } else {
                console.error(response.data);
                alert(response.data.data)
            }
        }catch (error) {
            console.error('Erreur lors de la suppresion de l\'équipes:', error);

        }
    },
    async editTeam({commit},team){
        try {
            let response = await TournamentService.editTeam(team);
            if (response.error === 0) {
                commit('editTeam', response.data);
                alert("L'équipe a été modifiée avec success")
            } else {
                console.error(response.data);
                alert(response.data.data)
            }
        } catch (error) {
            console.error('Erreur lors de la modification de l\'équipes:', error);

        }
    },

    async saveEnoughTeamsBYID({commit},_id){
        try {
            let response = await TournamentService.deleteTeamByID(_id);
            if (response.error === 0) {
                commit('removeTeam', response.data);
            } else {
                console.error(response.data);
            }
        }catch (e) {
            console.error("Erreur lors de la sélection des 8 équipes conservées pour le tournois",e)
        }
    }
,
    async getMatchs({commit}){
        try {
            let response = await TournamentService.getMatchs();
            // console.log("matchs",response.data);
            if (response.error === 0) {
                commit('setMatchs', response.data);
            } else {
                console.error(response.data);
                alert(response.data.data)
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des matchs:', error);
        }
    },
    async addMatch({commit},addMatch){
        try {
            let response = await TournamentService.addMatch(addMatch);
            if (response.error === 0) {
                commit('AddMatch', response.data);
            } else {
                console.error(response.data.data);
            }
        }catch (error) {
            console.error('Erreur lors de la création du match:', error);

        }
    },
    async editMatch({commit},editMatch){
        try {
            let response = await TournamentService.editMatch(editMatch);
            if (response.error === 0) {
                commit('EditMatch', response.data);
            } else {
                console.error(response.data);
                alert(response.data.data)
            }
        }catch (error) {
            console.error('Erreur lors de la modification du match:', error);

        }
    },
    async deleteMatchByID({commit},_id){
        try {
            let response = await TournamentService.deleteMatchByID(_id);
            if (response.error === 0) {
                commit('removeTeam', response.data);
                console.log("Le match a été supprimé avec success")
            } else {
                console.error(response.data);
            }
        }catch (error) {
            console.error('Erreur lors de la suppresion du match:', error);

        }
    },

    async getRounds({commit}){
        try {
            let response = await TournamentService.getRounds();
            // console.log("rounds",response.data);
            if (response.error === 0) {
                commit('setRounds', response.data);
            } else {
                console.error(response.data);
                alert(response.data.data)
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des rounds:', error);
        }
    },
    async addRound({commit},addRound){
        try {
            let response = await TournamentService.addRound(addRound);
            if (response.error === 0) {
                commit('AddRound', response.data);
            } else {
                console.error(response.data);
                alert(response.data.data)
            }
        }catch (error) {
            console.error('Erreur lors de l\'ajout du round:', error);

        }
    },
    async editRound({commit},editRound){
        try {
            let response = await TournamentService.editRound(editRound);
            if (response.error === 0) {
                commit('EditRound', response.data);
            } else {
                console.error(response.data);
                alert(response.data.data)
            }
        }catch (error) {
            console.error('Erreur lors de la modification du round:', error);

        }
    },



};


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
