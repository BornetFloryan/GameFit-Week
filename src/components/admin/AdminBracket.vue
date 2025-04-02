<template>
  <div class="bracket-container">
    <div class="bracket-controller">
    <div class="bracket-actions">
      <button @click="setupTournament()">Refresh</button>
      <button @click="addTeamInBracket()">Ajouter une équipe</button>
      <button class="launch" v-if="!tournamentStarted" @click="launchTournament()">Lancer le Tournoi</button>
      <button class="reboot" v-if="tournamentStarted" @click="restartTournament()">Redémarrer le Tournoi</button>
    </div>
    <div class="bracket-state">
      <b v-if="tournamentStarted" class="green">Le Tournoi est en cours</b>
      <b v-if="!tournamentStarted" class="red">Le Tournois n'est pas en cours !</b>
    </div>
    </div>
    <div class="brackets" v-if="teamCountFromApi ===8">
      <div class="bracket" v-for="(round, roundIndex) in rounds" :key="roundIndex">

        <h2>{{ getRoundName(roundIndex) }}</h2>
        <div class="match" v-for="(match, matchIndex) in round" :key="matchIndex">
          <div class="teams-match">
            <div class="team" v-for="(team, teamIndex) in match.teams" :key="teamIndex">

              <div class="team-actions" v-if="!tournamentStarted">
                {{team._id}}
                <button v-if="team.name !== '????' && team.name !== '????'" @click="showEditDialog(team)">Edit</button>
                <button v-if="team.name !== '????' && team.name !== '????'" @click="deleteTeam(team._id)">Delete</button>
              </div>
              <div class="team-move" v-if="!tournamentStarted">
                <button v-if="matchIndex !==0" @click="swapTeamWithAnotherMatch('up', roundIndex, matchIndex, teamIndex)">⬆️</button>
                <button v-if="matchIndex !==round.length-1" @click="swapTeamWithAnotherMatch('down', roundIndex, matchIndex, teamIndex)">⬇️</button>
              </div>
              <img :src="getTeamImage(team.name)" alt="team logo" class="team-logo" @click="toggleTooltip(roundIndex, matchIndex, teamIndex)"/>
              <p>{{ team.name }}</p>
              <input type="number" v-model="team.score" placeholder="Score" class="score-input" min="0" max="10" @input="validateAndCorrectScore(team)"/>
              <div v-if="isActiveTooltip(roundIndex, matchIndex, teamIndex)" class="tooltip">
                <p><strong>{{ team.name }}</strong></p>
                <p class="descr">{{ team.description }}</p>
              </div>
            </div>
          </div>
          <button v-if="match.teams.length === 2 && match.teams[0].name !== '????' && match.teams[1].name !== '????' && match.teams[0].name !== '' && match.teams[1].name !== '' && !match.buttonClicked && arePreviousMatchesFinished(roundIndex) && !isLastMatchOfFinalRound(roundIndex) && tournamentStarted" @click="advanceWinner(roundIndex, matchIndex)" class="advance-button">Rank up</button>
          <button v-if="isLastMatchOfFinalRound(roundIndex) && arePreviousMatchesFinished(roundIndex) && !match.buttonClicked && match.teams.length === 2 && tournamentStarted" @click="validateFinalResult(roundIndex, matchIndex)" class="advance-button">Final</button>
        </div>
      </div>
    </div>

    <div v-else class="teams-tournament">
      <h1 class="section-title">Équipes Participantes : {{this.teamsInAPI.length}}/8</h1>

      <div class="teams-grid" v-if="teamsInAPI.length !==0" >
        <div v-for="(team, teamIndex) in teamsInAPI" :key="teamIndex" class="team-card" >
          <div class="team-img-wrapper" >
            <img :src="getTeamImage(team.name)" :alt="team.name" class="team-img"/>
          </div>
          <div class="team-info">
            <h2 class="team-name">{{ team.name }}</h2>
            <div class="team-actions">
              <button @click="showEditDialog(team)">Edit</button>
              <button @click="deleteTeam(team._id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else >
        <em>Ajouter une équipe participante...</em>
      </div>
    </div>
    <div v-if="showAddTeamDialog" class="dialog-overlay">
      <div class="dialog">
        <h3>Ajouter une équipe au tournoi</h3>
        <input v-model="newTeam.name" placeholder="Nom de l'équipe"/>
        <textarea v-model="newTeam.description" placeholder="Description"></textarea>
        <div class="dialog-actions">
          <button @click="confirmAddTeam(newTeam)">Ajouter</button>
          <button @click="showAddTeamDialog = false">Annuler</button>
        </div>
      </div>
    </div>
    <div v-if="showEditTeamDialog" class="dialog-overlay">
      <div class="dialog">
        <h3>Modifier cette équipe</h3>
        <input v-model="tempTeamData.id" type="hidden"/>
        <input v-model="tempTeamData.name" placeholder="Nom de l'équipe"/>
        <textarea v-model="tempTeamData.description" placeholder="Description"></textarea>
        <div class="dialog-actions">
          <button @click="submitEditTeam()">Modifier</button>
          <button @click="cancelEdit">Annuler</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
export default {
  data() {
    return {
      teamCount: 0,
      teamCountFromApi:0,
      rounds: [],
      activeTooltip: {round: null, match: null, team: null},
      showAddTeamDialog: false,
      showEditTeamDialog: false,
      newTeam: {name: '', description: ''},
      originalTeamData: {},
      tempTeamData: {}
    };
  },
  computed: {
    ...mapState("tournament", ["teams", "tournamentStarted", "matchs", 'round']),
    ...mapGetters('tournament', ['getAllTeams', 'getMatchesByRoundID']),
      teamsInAPI() {
        return this.teams.filter(team => team._id !== undefined);
      }
  },
  methods: {
    ...mapActions('tournament', ['setTeams','startTournament','getTeams', 'addTeam', 'deleteTeamByID', 'editTeam', 'getMatchs', 'addRound', 'editRound', 'addMatch', 'editMatch', 'getRounds', 'saveEnoughTeamsBYID', 'deleteMatchByID']),

    async swapTeamWithAnotherMatch(direction, roundIndex, matchIndex, teamIndex) {
      const round = this.rounds[roundIndex];
      const currentMatch = round[matchIndex];
      const targetMatchIndex = direction === 'up' ? matchIndex - 1 : matchIndex + 1;

      if (targetMatchIndex < 0 || targetMatchIndex >= round.length) return;

      const targetMatch = round[targetMatchIndex];

      const currentTeam = currentMatch.teams[teamIndex];
      if (!currentTeam) return;
      const targetTeam = targetMatch.teams[teamIndex];
      if (!targetTeam) return;



      this.$set(currentMatch.teams, teamIndex, targetTeam);
      this.$set(targetMatch.teams, teamIndex, currentTeam);
      const editCurrentMatch = {
        id:currentMatch.match_id,
        equipe1_id: currentMatch.teams[0]._id,
        equipe2_id: currentMatch.teams[1]._id
      }

      const editTargetMatch = {
        id:targetMatch.match_id,
        equipe1_id: targetMatch.teams[0]._id,
        equipe2_id: targetMatch.teams[1]._id
      }
      await this.editMatch(editCurrentMatch);
      await this.editMatch(editTargetMatch);
      await this.getMatchs();

    }
    ,
    async setupTournament() {
      try {
        await this.getTeams();
        await this.getRounds();
        await this.getMatchs();

        this.teamCount = this.teams.length;
        let data;
        let setTeams = this.teams;
        while (this.teams.length < 8) {
          await this.startTournament(false);
          setTeams.push({
            name: "????",
            img: '',
            description: 'No description available',
            _id: undefined,
            score: 0
          });
        }
        data = setTeams.map(team => ({ ...team, score: 0 }));
        await this.setTeams(data);

        let firstRoundMatches = { 1: [] };

        if (this.matchs.length === 8) {
          this.matchs.forEach(match => {
            const rId = match.round_id;
            const e1 = this.teams.find(t => t._id === match.equipe1_id);
            const e2 = this.teams.find(t => t._id === match.equipe2_id);
            firstRoundMatches[rId] ||= [];
            firstRoundMatches[rId].push({
              roundId: rId,
              buttonClicked: false,
              teams: [
                {
                  name: e1?.name || "???",
                  img: e1?.img || "noteam.jpg",
                  score: match.score_equipe1 ?? 0,
                  _id: e1?._id,
                  description: e1?.description || "No description available"
                },
                {
                  name: e2?.name || "???",
                  img: e2?.img || "noteam.jpg",
                  score: match.score_equipe2 ?? 0,
                  _id: e2?._id,
                  description: e2?.description || "No description available"
                }
              ]
            });
          });
        } else {
          for (let i = 0; i < this.teams.length; i += 2) {
            const e1 = this.teams[i], e2 = this.teams[i + 1];
            if (!e1 || !e2) continue;
            firstRoundMatches[1].push({
              roundId: 1,
              buttonClicked: false,
              teams: [e1, e2].map(e => ({
                name: e.name,
                img: e.img || "noteam.jpg",
                score: e.score ?? 0,
                _id: e._id,
                description: e.description
              }))
            });
          }
        }

        const [round1, round2, round3] = await this.splitMatchsByRounds(this.matchs, this.teams);
        this.rounds = [round1, round2, round3];

        const matchsToAPI = [];
        Object.entries(firstRoundMatches).forEach(([rId, matches]) => {
          matches.forEach((match, i) => {
            const [e1, e2] = match.teams;
            if (e1?._id && e2?._id) {
              matchsToAPI.push({
                round_id: `${parseInt(rId)}`,
                match_id: `${i + 1}`,
                equipe1_id: e1._id,
                equipe2_id: e2._id,
                score_equipe1: e1.score,
                score_equipe2: e2.score,
                date_match: new Date().toISOString()
              });
            }
          });
        });

        for (const obj of matchsToAPI) {
          const rName = obj.round_id === "1" ? "1/4 finale" : obj.round_id === "2" ? "1/2 finale" : "Finale";
          const round = { id: obj.round_id, name: rName };

          if (this.matchs.find(m => m.round_id === obj.round_id)) {
            await this.editRound(round);
          } else {
            console.warn("Ce Round doit être ajouté à l'API", round);
            await this.addRound(round);
          }

          const matchFound = this.matchs.find(m => m._id === obj.match_id);



          if (matchFound) {
            await this.editMatch({ ...obj, id: obj.match_id });
          } else {


            console.warn("Ce Match doit être ajouté à l'API", obj);
            await this.addMatch(obj);
          }
        }

      } catch (e) {
        console.error("setup tournament", e);
      }
    }
,
    async launchTournament() {
      if (this.teamCount < 8) {
        alert(`Il faut au moins 8 équipes différentes pour lancer le tournois
 Nombre d'équipes : ${this.teamCount}`)
      } else if (this.teamCount > 8) {
        alert("Il faut maximum 8 équipes pour lancer le tournois")
      } else {
        alert("Le tournois est lancée !")
        await this.startTournament(true);
      }
    },
    async restartTournament(){
      try {
        await this.remakeTournament();
        await this.startTournament(false);
        await this.setupTournament();
      } catch (e) {
        console.error("restartTournament",e)
        alert(e)
      }
    },
    async remakeTournament(){
      const matchsFiltres = this.matchs.filter(match => ["5", "6", "7"].includes(match._id));
      for (const item in matchsFiltres) {
        await this.deleteMatchByID(matchsFiltres[item]._id);
      }
      await this.getMatchs();
    },
    addTeamInBracket() {
      this.showAddTeamDialog = true;
    },
    async confirmAddTeam(newTeam) {
      await this.addTeam(newTeam);
      await this.setupTournament();
      this.showAddTeamDialog = false;
      await this.setupTournament();
      this.setCountOfTeam();
    },
    showEditDialog(team) {
      this.originalTeamData = { ...team };
      this.tempTeamData = { ...team };
      this.showEditTeamDialog = true;
    },
    async submitEditTeam() {
      this.showEditTeamDialog = false;
      const teamData = {
        ...this.tempTeamData,
        id: this.tempTeamData._id,
        _id: undefined
      };
      await this.editTeam(teamData);
      await this.getTeams();
      await this.setupTournament();
    },
    cancelEdit(){
      this.tempTeamData = { ...this.originalTeamData };
      this.showEditTeamDialog = false;
    },
    async deleteTeam(_id) {
      await this.deleteTeamByID(_id);
      await this.setupTournament();
      await this.setCountOfTeam();
    },
    getRoundName(index) {
      if (index === 0) {
        return "1/4 Finale";
      } else if (index === 1) {
        return "1/2 Finale";

      } else if (index === 2) {
        return "Finale";
      }
      return "Erreur Round Name";
    },
    isLastMatchOfFinalRound(roundIndex) {
      const finalRoundIndex = this.rounds.length - 1;
      const finalRound = this.rounds[finalRoundIndex];
      return roundIndex === finalRoundIndex && finalRound.length === 1;
    },
    arePreviousMatchesFinished(roundIndex) {
      if (roundIndex === 0) return true;
      return this.rounds[roundIndex - 1].every(match => match.buttonClicked);
    },
    async advanceWinner(roundIndex, matchIndex) {
      if (!this.tournamentStarted) {
        alert("Le tournois n'a pas commencé")
        return;
      }
      const match = this.rounds[roundIndex][matchIndex];
      if (match && match.teams.length === 2) {
        const [team1, team2] = match.teams;
        if (team1.score === team2.score) {
          alert("Les scores des deux équipes ne peuvent pas être identiques. Veuillez corriger !");
          return;
        }
      }
      const winner = match.teams.reduce((prev, current) =>
          prev.score > current.score ? prev : current
      );
      if (roundIndex >= this.rounds.length - 1) {
        this.rounds.push([]);
      }
      const nextRound = this.rounds[roundIndex + 1];
      const nextMatchIndex = Math.floor(matchIndex / 2);
      if (!nextRound[nextMatchIndex]) {
        nextRound[nextMatchIndex] = {
          teams: [
            {name: '', img: '', score: 0},
            {name: '', img: '', score: 0}
          ],
          match_id: `${this.matchs.length + 1}`,
          buttonClicked: false,
          roundID: roundIndex + 2,
        };
      }
      const nextMatch = nextRound[nextMatchIndex];
      const slotIndex = matchIndex % 2;
      nextMatch.teams[slotIndex] = {...winner};
      this.$set(this.rounds[roundIndex][matchIndex], "buttonClicked", true);

      function getRoundName(index) {
        if (index === 0) {
          return "1/4 Finale";
        } else if (index === 1) {
          return "1/2 Finale";

        } else if (index === 2) {
          return "Finale";
        }
        return "Erreur Round Name";
      }

      const newRound = {
        id: `${roundIndex + 2}`,
        name: `${getRoundName(roundIndex + 1)}`
      };
      const newMatchs = [];
      for (let i = 0; i < 4; i += 1) {
        if (nextRound[i] && nextRound[i].teams && nextRound[i].teams[0] && nextRound[i].teams[1]) {
          if (nextRound[i].teams[0]._id !== undefined && nextRound[i].teams[1]._id !== undefined) {
            const data = {
              match_id: `${this.matchs.length + 1}`,
              equipe1_id: nextRound[i].teams[0]._id,
              equipe2_id: nextRound[i].teams[1]._id,
              score_equipe1: nextRound[i].teams[0].score,
              score_equipe2: nextRound[i].teams[1].score,
              date_match: new Date().toISOString()
            };
            newMatchs.push(data)
          }
        }
      }
      await this.updateTournament(newRound, newMatchs);
      this.$forceUpdate();
    },
    async updateTournament(RoundToAPI, MatchsToAPI) {
      const roundFromAPI = this.round;
      const matchsFromAPI = this.matchs;
      function getRoundIDByMatch(match) {
        let res;
        if (match === 1 || match === 2 || match === 3 || match === 4) {
          res = 1;
        } else if (match === 5 || match === 6) {
          res = 2;
        } else {
          res = 3;
        }
        return res;
      }

      const existingRound = roundFromAPI.find(r => r._id === RoundToAPI.id);
      if (existingRound) {
        await this.editRound(RoundToAPI);
      } else {
        await this.addRound(RoundToAPI);
      }
      for (const match of MatchsToAPI) {
        const existingMatch = matchsFromAPI.find(m => m._id === match.match_id);
        const matchData = {
          id: match.match_id,
          round_id: `${getRoundIDByMatch(parseInt(match.match_id))}`,
          equipe1_id: match.equipe1_id,
          equipe2_id: match.equipe2_id,
          score_equipe1:match.score_equipe1,
          score_equipe2:match.score_equipe2,
          date_match: match.date_match
        }
        if (existingMatch) {
          await this.editMatch(matchData);
        } else {
          const equipe1Id = matchData.equipe1_id;
          const equipe2Id = matchData.equipe2_id;
          const updateTeamsScore = [];
          const previousRound = this.rounds[parseInt(matchData.round_id) - 2];

          if (previousRound) {
            previousRound.forEach(match => {
              const teamIds = match.teams.map(t => t._id);
              if (teamIds.includes(equipe1Id) || teamIds.includes(equipe2Id)) {
                updateTeamsScore.push(match);
              }
            });
          }
          const team1A = updateTeamsScore[0].teams[0];
          const team1B = updateTeamsScore[0].teams[1];
          const score1A = parseInt(team1A.score);
          const score1B = parseInt(team1B.score);
          const editMatch1 = {
            id: updateTeamsScore[0].match_id,
            score_equipe1: score1A,
            score_equipe2: score1B,
            gagnant_id: score1A > score1B ? team1A._id : (score1B > score1A ? team1B._id : null)
          };

          const team2A = updateTeamsScore[1].teams[0];
          const team2B = updateTeamsScore[1].teams[1];

          const score2A = parseInt(team2A.score);
          const score2B = parseInt(team2B.score);

          const editMatch2 = {
            id: updateTeamsScore[1].match_id,
            score_equipe1: score2A,
            score_equipe2: score2B,
            gagnant_id: score2A > score2B ? team2A._id : (score2B > score2A ? team2B._id : null)
          };
          await this.editMatch(editMatch1);
          await this.editMatch(editMatch2);

          await this.getMatchs();
          const matchsExistants = this.matchs;
          const nouveauMatch = matchData;
          const matchExistant = matchsExistants.find(m =>
              (m.equipe1_id === nouveauMatch.equipe1_id && m.equipe2_id === nouveauMatch.equipe2_id) ||
              (m.equipe1_id === nouveauMatch.equipe2_id && m.equipe2_id === nouveauMatch.equipe1_id)
          );
          if(!matchExistant){
            await this.addMatch(matchData);
          }
        }
      }
    },
    async validateFinalResult(roundIndex, matchIndex) {
      const match = this.rounds[roundIndex][matchIndex];
      if (match && match.teams.length === 2) {
        const [team1, team2] = match.teams;
        if (team1.score === team2.score) {
          alert("Les scores des deux équipes ne peuvent pas être identiques. Veuillez corriger !");
          return;
        }
      }
      const winner = match.teams.reduce((prev, current) =>
          prev.score > current.score ? prev : current
      );
      const finalId = this.rounds[2][0].match_id;
      const equipe1 = match.teams[0];
      const equipe2 = match.teams[1];
      const editFinal = {
        id:finalId,
        score_equipe1:equipe1.score ,
        score_equipe2:equipe2.score ,
        gagnant_id:winner._id
      }

      await this.editMatch(editFinal);

      alert(`Le tournoi est terminé ! L'équipe gagnante est : ${winner.name}`);
      await this.startTournament(false);
      this.rounds[roundIndex][matchIndex].buttonClicked = true;
      this.$forceUpdate();
    },
    toggleTooltip(roundIndex, matchIndex, teamIndex) {
      const isActive =
          this.activeTooltip.round === roundIndex &&
          this.activeTooltip.match === matchIndex &&
          this.activeTooltip.team === teamIndex;
      this.activeTooltip = isActive
          ? {round: null, match: null, team: null}
          : {round: roundIndex, match: matchIndex, team: teamIndex};
    },
    isActiveTooltip(roundIndex, matchIndex, teamIndex) {
      return (
          this.activeTooltip.round === roundIndex &&
          this.activeTooltip.match === matchIndex &&
          this.activeTooltip.team === teamIndex
      );
    },
    validateAndCorrectScore(team) {
      if (team.score < 0 || team.score > 3) {
        team.score = Math.max(0, Math.min(team.score, 3));
      }
    },
    getTeamImage(img) {
      let name = img.toUpperCase();
      try {
        return require(`@/assets/img/${name}_Logo.jpg`);
      } catch (e) {
        return require('@/assets/img/noteam.jpg');
      }
    },
    async splitMatchsByRounds(matchs, teams) {
      const round1 = [];
      const round2 = [];
      const round3 = [];
      matchs.forEach(match => {
        const roundId = parseInt(match.round_id);
        const equipe1 = teams.find(t => t._id === match.equipe1_id);
        const equipe2 = teams.find(t => t._id === match.equipe2_id);
        const matchObj = {
          match_id:match._id,
          roundId,
          buttonClicked: false,
          teams: [
            {
              name: equipe1 ? equipe1.name : "???",
              img: equipe1 ? equipe1.img : "noteam.jpg",
              score: match.score_equipe1 ?? 0,
              _id: match.equipe1_id,
              description: equipe1 ? equipe1.description : "Pas de description"
            },
            {
              name: equipe2 ? equipe2.name : "???",
              img: equipe2 ? equipe2.img : "noteam.jpg",
              score: match.score_equipe2 ?? 0,
              _id: match.equipe2_id,
              description: equipe2 ? equipe2.description : "Pas de description"
            }
          ]
        };
        if (roundId === 1) round1.push(matchObj);
        else if (roundId === 2) round2.push(matchObj);
        else if (roundId === 3) round3.push(matchObj);
      });

      return [round1, round2, round3];
    },
    async keep8TeamsInDB() {
      await this.getTeams();
      const equipes = this.teams.sort((a, b) => parseInt(b._id) - parseInt(a._id));
      if (this.teams.length > 8) {
        const nbrTeamToDelete = this.teams.length - 8;
        for (let i = 0; i < nbrTeamToDelete; i++) {
          await this.saveEnoughTeamsBYID(equipes[i]._id)
        }

      }
    },
    setCountOfTeam(){
      this.teamCountFromApi = this.teams.filter(obj => obj._id).length;
    }
  },
  async mounted() {
    await this.keep8TeamsInDB();
    await this.setupTournament();
    await this.setCountOfTeam();
  }
};
</script>

<style scoped>
.teams-tournament, .section-title {
  margin-bottom: 20px;
}

.section-title { color: #333; }

.teams-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(250px, 1fr));
  gap: 20px;
}

.team-card {
  background: #fff;
  border: 1px solid #bbb;
  border-radius: 25px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease-in-out;
}
.team-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.7);
  border-color: #888;
}

.team-img-wrapper {
  width: 150px;
  aspect-ratio: 879/1000;
  overflow: hidden;
}
.team-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-info { text-align: center; }
.team-name {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}
.team-logo {
  max-width: 50px;
  border: 1px solid gray;
  border-radius: 15px;
  cursor: pointer;

}

.bracket-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 80vw;
  font-family: Arial, sans-serif;
}
.setup-container input,
.dialog input, .dialog textarea, .score-input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.score-input {
  width: 10px;
  text-align: center;
  padding: 4px;
}
.score-input:focus {
  border-color: #007BFF;
  outline: none;
}


.advance-button,
.dialog-actions button {
  padding: 12px 20px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}


.advance-button {
  background-color: #007BFF;
  width: 90px;
  text-align: center;
}
.advance-button:hover {
  background-color: #0056b3;
}

.brackets {
  display: flex;
  gap: 15px;
}
.bracket {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  min-width: 33%;
}

.teams-match {
  display: flex;
  flex-direction: column;
  min-width: 60%;
}

.match {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background: #f9f9f9;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 5px;
  gap: inherit;
  text-align: center;
}
.match span {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.team {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 5px;
  min-width: 100%;
}
.team > * {
  flex: 1 1 100px;
  text-align: center;
}
.team p { width: 80px; }

.tooltip {
  position: absolute;
  transform: translate(0%, 60%);
  background: rgba(0,0,0,0.8);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  z-index: 1000;
  white-space: normal;
  max-width: 400px;
  word-wrap: break-word;
  word-break: break-word;
}
.tooltip p {
  margin: 5px 0;
}
.tooltip p strong {
  font-size: 16px;
}

.bracket-actions {
  display: flex;
  gap: 15px;
}

.team-actions {
  display: flex;
  flex-direction: column;
}

.team-actions button:nth-child(1) {
  background-color: green;
}

.team-actions button:nth-child(2) {
  background-color: red;

}

.bracket-actions button, .team-actions button {
  color: white;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}
.bracket-actions button {
  font-size: medium;
  font-weight: bold;
  border-radius: 15px;
}
.bracket-actions button.launch {
  background-color: #28a745;
}
.bracket-actions button.reboot {
  background-color: #a72828;
}
.bracket-actions button:nth-child(1) {
  background-color: #007bff;
}
.bracket-actions button:nth-child(2) {
  background-color: #ff9c07;
}
.bracket-actions button:hover {
  cursor: pointer;
  animation: beat 0.5s ease-in-out;
  box-shadow: 0 6px 15px rgba(0,0,0,0.2);
}

.team-move {
  display: flex;
  flex-direction: column;
}
.team-move button {
  width: fit-content;
  background: #1E90FF;
  border: 1px solid #ccc;
  color: white;
  font-size: 20px;
  border-radius: 5px;
}

.dialog-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}
.dialog {
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 8px 16px rgba(0,0,0,0.3);
}
.dialog h3 { margin-bottom: 20px; }

.dialog-actions {
  display: flex;
  justify-content: space-between;
}
.dialog-actions button:first-child {
  background-color: #007BFF;
}
.dialog-actions button:last-child {
  background-color: #ccc;
  color: black;
}

.bracket-state {
  text-align: center;
  padding-top: 10px;
}
.green { color: green; }
.red { color: red; }

.bracket-controller {
  background: rgba(255,255,255,0.05);
  border-radius: 25px;
  padding: 30px 25px 5px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.15);
  width: 100%;
  font-family: Arial, sans-serif;
  color: #fff;
  border: 1px solid rgba(255,255,255,0.1);
}

@keyframes beat {
  0%   { transform: scale(0.95); }
  50%  { transform: scale(1.01); }
  100% { transform: scale(1); }
}
</style>
