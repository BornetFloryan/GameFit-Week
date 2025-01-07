<template>
  <div class="bracket-container">
    <div v-if="!tournamentStarted" class="setup-container">
      <h2>Setup Your Tournament</h2>
      <label for="teamCount">Number of Teams:</label>
      <input
          type="number"
          id="teamCount"
          v-model.number="teamCount"
          min="4"
          step="4"
          placeholder="Enter number of teams"
      />
      <button @click="setupTournament" class="start-tournament-button">Start Tournament</button>
    </div>

    <div v-else class="brackets">
      <div class="bracket" v-for="(round, roundIndex) in rounds" :key="roundIndex">
        <h2>Round {{ roundIndex + 1 }}</h2>
        <div class="match" v-for="(match, matchIndex) in round" :key="matchIndex">
          <div class="teams-match">
            <div class="team" v-for="(team, teamIndex) in match.teams" :key="teamIndex">
              <img
                  :src="require(team.img) || require('@/assets/img/noteam.jpg')"
                  alt="team logo"
                  class="team-logo"
                  @click="toggleTooltip(roundIndex, matchIndex, teamIndex)"
              />
              <p>{{ team.name }}</p>
              <input
                  type="number"
                  v-model="team.score"
                  placeholder="Score"
                  class="score-input"
                  min="0"
                  max="10"
                  @input="validateAndCorrectScore(team)"
              />

              <!-- Tooltip -->
              <div
                  v-if="isActiveTooltip(roundIndex, matchIndex, teamIndex)"
                  class="tooltip"
              >
                <p><strong>{{ team.name }}</strong></p>
                <p>Score: {{ team.score }}</p>
                <p class="descr">{{ team.description }}</p>
                <input class="edit-team" type="button" value="Edit">
              </div>
            </div>
          </div>

          <!-- Boutons pour avancer ou valider le résultat -->
          <button
              v-if="!match.buttonClicked && !isLastMatchOfFinalRound(roundIndex)"
              @click="advanceWinner(roundIndex, matchIndex)"
              class="advance-button"
          >
            Advance Winner
          </button>

          <button
              v-if="isLastMatchOfFinalRound(roundIndex) && arePreviousMatchesFinished(roundIndex) && match.teams.length === 2"
              @click="validateFinalResult(roundIndex, matchIndex)"
              class="advance-button"
          >
            Valider Résultat
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {pro_teams} from "@/datasource/data.js"; // Import des données d'équipes

export default {
  data() {
    return {
      teams: [],
      teamCount: 4,
      tournamentStarted: false,
      rounds: [],
      activeTooltip: {round: null, match: null, team: null}, // Stockage de l'état actif
    };
  },
  methods: {
    setupTournament() {
      if (this.teamCount < 4) {
        alert("Please enter at least 4 teams to start a tournament.");
        return;
      }

      const availableTeams = [...pro_teams];
      while (availableTeams.length < this.teamCount) {
        availableTeams.push({
          name: `Team ${availableTeams.length + 1}`,
          img: '',
          score: 0,
          description: 'No description available'
        });
      }

      this.teams = availableTeams.map(team => ({...team, score: 0}));

      this.rounds = [];
      const firstRoundMatches = [];
      for (let i = 0; i < this.teamCount; i += 2) {
        firstRoundMatches.push({
          teams: [
            {...this.teams[i], score: 0},
            {...this.teams[i + 1], score: 0}
          ],
          buttonClicked: false
        });
      }

      this.rounds.push(firstRoundMatches);
      this.tournamentStarted = true;
    },

    loadTeams() {
      this.teams = pro_teams.map((team) => ({
        ...team,
        score: 0
      }));
    },

    isLastMatchOfFinalRound(roundIndex) {
      const finalRoundIndex = this.rounds.length - 1; // Dernier round
      const finalRound = this.rounds[finalRoundIndex];
      return roundIndex === finalRoundIndex && finalRound.length === 1;
    },

    arePreviousMatchesFinished(roundIndex) {
      if (roundIndex === 0) return true; // Aucun match précédent pour le premier round
      return this.rounds[roundIndex - 1].every(match => match.buttonClicked);
    },

    advanceWinner(roundIndex, matchIndex) {
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

      if (this.isLastMatchOfFinalRound(roundIndex)) {
        alert(`Le tournoi est terminé ! L'équipe gagnante est : ${winner.name}`);
        this.tournamentStarted = false;
        return;
      }

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
          buttonClicked: false
        };
      }

      const nextMatch = nextRound[nextMatchIndex];
      const slotIndex = matchIndex % 2;
      nextMatch.teams[slotIndex] = {...winner};

      this.$set(this.rounds[roundIndex][matchIndex], "buttonClicked", true);
      this.$forceUpdate();
    },

    validateFinalResult(roundIndex, matchIndex) {
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

      alert(`Le tournoi est terminé ! L'équipe gagnante est : ${winner.name}`);
      this.tournamentStarted = false;

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
      const maxScore = 10;
      if (team.score < 0 || team.score > maxScore) {
        team.score = Math.max(0, Math.min(team.score, maxScore));
      }
    }
  },
  mounted() {
    this.loadTeams();
  }
};
</script>


<style>
/* Ajout d'un style basique pour que les boutons et éléments soient plus clairs */
.team-logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-top: 10px;
  border: 1px solid gray;
  border-radius: 15px;
  padding: 2px;
  cursor: pointer;
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
  gap: 15px;
}

.bracket {
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;
  width: 40%;
}

.teams-match {
  display: flex;
  flex-direction: column;
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
  gap: 10px;
  align-items: center;
}

.team > * {
  flex: 1 1 100px;
  text-align: center;
}

.team-input, .score-input {
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 80%;
  font-size: 14px;
  text-align: center;
}

.team-input:focus, .score-input:focus {
  border-color: #007BFF;
  outline: none;
}

.advance-button, .edit-team {
  padding: 10px 18px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  width: 120px;
  text-align: center;
}

.advance-button:hover {
  background-color: #0056b3;
}

h2 {
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
}

.tooltip {
  position: absolute;
  transform: translate(0%, 60%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
</style>
