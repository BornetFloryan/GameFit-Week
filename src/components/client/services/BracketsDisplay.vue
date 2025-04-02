<template>
  <div class="bracket-container">

    <div class="brackets" v-if="this.rounds.length!==0">
      <div class="bracket" v-for="(round, roundIndex) in rounds" :key="roundIndex">
        <h2>Round {{ roundIndex + 1 }}</h2>
        <div class="match" v-for="(match, matchIndex) in round" :key="matchIndex">
          <div class="teams-match">
            <div class="team" v-for="(team, teamIndex) in match.teams" :key="teamIndex" @click="openDialog(team)">
              <img :src="getTeamImage(team.name)" alt="team logo" class="team-logo"/>
              <p class="name-team">{{ team.name }}</p>

              <b v-if="team.score !== null" class="score-team">{{ team.score }}</b>
              <b v-else class="score-team">...</b>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="bracket-unable">
      <h1>Le tournois n'est pas encore disponible</h1>
    </div>

    <!-- Dialog -->
    <div v-if="isDialogOpen" class="tooltip">
      <div class="dialog-content">
        <div class="dialog-team">
          <h2>{{ selectedTeam.name }}</h2>
          <img :src="getTeamImage(selectedTeam.name)" alt="team logo" class="team-logo"/>

        </div>

        <p><strong>Score:</strong> {{ selectedTeam.score !== null ? selectedTeam.score : 'N/A' }}</p>
        <p class="descr">{{ selectedTeam.description || 'No description available' }}</p>
        <button @click="closeDialog">Close</button>
      </div>
    </div>

  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
  data() {
    return {
      teamCount: 8,
      rounds: [],
      isDialogOpen: false,
      selectedTeam: null
    };
  },
  computed:{
    ...mapState("tournament", ["teams","tournamentStarted","matchs"]),
  },
  methods: {
    ...mapActions('tournament',['getTeams','getMatchs','startTournament']),
    async setupTournament() {
      await this.getTeams();
      await this.getMatchs();

      await this.createRounds();
      this.startTournament(true);
    },

    createRounds() {
      this.rounds = [];

      const roundsMap = {};

      this.matchs.forEach(match => {
        const roundId = match.round_id;
        if (!roundsMap[roundId]) {
          roundsMap[roundId] = [];
        }

        const equipe1 = this.teams.find(t => t._id == match.equipe1_id);
        const equipe2 = this.teams.find(t => t._id == match.equipe2_id);

        roundsMap[roundId].push({
          teams: [
            {
              name: equipe1 ? equipe1.name : "???",
              img: equipe1 ? equipe1.img : "noteam.jpg",
              score: match.score_equipe1 ?? null
            },
            {
              name: equipe2 ? equipe2.name : "???",
              img: equipe2 ? equipe2.img : "noteam.jpg",
              score: match.score_equipe2 ?? null
            }
          ]
        });
      });

      const sortedRoundIds = Object.keys(roundsMap).sort((a, b) => a - b);

      sortedRoundIds.forEach(roundId => {
        this.rounds.push(roundsMap[roundId]);
      });
    },

    openDialog(team) {
      this.selectedTeam = team;
      this.isDialogOpen = true;
    },

    closeDialog() {
      this.isDialogOpen = false;
      this.selectedTeam = null;
    },

    validateAndCorrectScore(team) {
      team.score = Math.max(0, Math.min(10, team.score));
    },

    getTeamImage(img) {
      let name = img.toUpperCase();
      try {
        return require(`@/assets/img/${name}_Logo.jpg`);
      } catch (e) {
        return require('@/assets/img/noteam.jpg');
      }
    }
  },
  async mounted() {
    await this.setupTournament();
  }
};
</script>

<style scoped>
.team-logo {
  max-width: 50px;
  border: 1px solid gray;
  border-radius: 15px;
  cursor: pointer;
  height: 50px;
  object-fit: contain;
  padding: 2px;
}

.bracket-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px;
  font-family: Arial, sans-serif;
  max-width: 1000px;
  margin: auto;
}

.setup-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.setup-container input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 250px;
  font-size: 16px;
}

.start-tournament-button {
  padding: 12px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.start-tournament-button:hover {
  background-color: #218838;
}

.brackets {
  display: flex;
  justify-content: center;
  gap: 50px;
}

.bracket {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: 25%;
}

.teams-match {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
}

.round {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 50px;
  flex-wrap: wrap;
}

.match {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #f9f9f9;
  padding: 15px;
  width: 100%;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.match span {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.team {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.team > * {
  text-align: center;
}

.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.dialog-content {
  padding: 20px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dialog-content button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #ff5733;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.dialog-content button:hover {
  background-color: #c70039;
}


b.score-team {
  max-width: fit-content;
  padding: 15px;
}

p.name-team {
  max-width: 70px;
}

.bracket-unable {
  display: flex;
  flex-direction: column;
  margin: auto;
  justify-content: center;
  height: 80vh;
}

.tooltip {
  position: fixed;
  transform: translate(-70%, 70%);
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

.dialog-team {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 10px;
}
</style>
