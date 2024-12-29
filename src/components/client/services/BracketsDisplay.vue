<template>
  <div class="bracket-container">
    <div v-if="!tournamentStarted" class="setup-container">
      <h2>Setup Your Tournament</h2>
      <label for="teamCount">Number of Teams:</label>
      <input
          type="number"
          id="teamCount"
          v-model.number="teamCount"
          min="2"
          step="2"
          placeholder="Enter number of teams"
      />
      <button @click="setupTournament" class="start-tournament-button">Start Tournament</button>
    </div>

    <div v-else class="brackets">
      <div class="bracket" v-for="(round, roundIndex) in rounds" :key="roundIndex">
        <h2>Round {{ roundIndex + 1 }}</h2>
        <div class="match" v-for="(match, matchIndex) in round" :key="matchIndex">
          <div class="team" v-for="(team, teamIndex) in match.teams" :key="teamIndex">
            <input
                type="text"
                v-model="team.name"
                placeholder="team name"
                class="team-input"
            />
            <input
                type="number"
                v-model="team.score"
                placeholder="Score"
                class="score-input"
                min="0"
                max="10"
                @input="validateAndCorrectScore(team)"
            />
          </div>
          <!-- Affichage conditionnel du bouton -->
          <button
              v-if="!match.buttonClicked && !isLastMatch(roundIndex, matchIndex)"
              @click="advanceWinner(roundIndex, matchIndex)"
              class="advance-button">
            Advance Winner
          </button>
        </div>
      </div>
    </div>
    <div>
<!--      <p v-for="(name) in proteams"></p>-->
    </div>
  </div>


</template>

<script>
export default {
  data() {
    return {
      teamCount: 2, // Number of teams entered by the user
      tournamentStarted: false,
      rounds: [] // The tournament rounds
    };
  },
  methods: {
    setupTournament() {
      if (this.teamCount < 2) {
        alert("Please enter at least 2 teams to start a tournament.");
        return;
      }

      this.rounds = [];
      const firstRoundMatches = [];
      for (let i = 0; i < this.teamCount; i += 2) {
        firstRoundMatches.push({
          teams: [
            { name: '', score: 0 },
            { name: '', score: 0 }
          ],
          buttonClicked: false // Initialiser cette propriété pour chaque match
        });
      }

      this.rounds.push(firstRoundMatches);
      this.tournamentStarted = true;
    },

    // Vérifie si c'est le dernier match
    isLastMatch(roundIndex, matchIndex) {
      const lastRound = this.rounds[this.rounds.length - 1];
      return lastRound && lastRound.length === 1 && matchIndex === 0;
    },

    // Méthode pour marquer le bouton comme cliqué
    advanceWinner(roundIndex, matchIndex) {
      const match = this.rounds[roundIndex][matchIndex];

      if (match && match.teams.length === 2) {
        const [team1, team2] = match.teams;
        if (team1.score === team2.score) {
          alert("Les scores des deux équipes ne peuvent pas être identiques. Veuillez corriger !");
          return;
        }
      }

      const winner = match.teams.reduce((prev, current) => (prev.score > current.score ? prev : current));

      if (roundIndex >= this.rounds.length - 1) {
        this.rounds.push([]);
      }

      const nextRound = this.rounds[roundIndex + 1];
      const nextMatchIndex = Math.floor(matchIndex / 2);

      if (!nextRound[nextMatchIndex]) {
        nextRound[nextMatchIndex] = {
          teams: [
            { name: '', score: 0 },
            { name: '', score: 0 }
          ]
        };
      }

      const nextMatch = nextRound[nextMatchIndex];
      const slotIndex = matchIndex % 2;
      nextMatch.teams[slotIndex] = { ...winner };

      const lastRoundIndex = this.rounds.length - 1;
      const isLastRound = this.rounds[lastRoundIndex].length === 1;

      if (isLastRound) {
        const finalMatch = this.rounds[lastRoundIndex][0];
        const isFinalMatchComplete = finalMatch.teams[0].score !== 0 && finalMatch.teams[1].score !== 0;

        if (isFinalMatchComplete) {
          setTimeout(() => {
            alert("Le tournoi est terminé ! Félicitations au gagnant !");
          }, 100);
        }
      }

      // Marquer le bouton comme cliqué pour ce match spécifique
      this.$set(this.rounds[roundIndex][matchIndex], 'buttonClicked', true);
      this.$forceUpdate();
    },

    validateAndCorrectScore(team) {
      const maxScore = 3;
      if (team.score < 0 || team.score > maxScore) {
        team.score = Math.max(0, Math.min(team.score, maxScore));
      }
      if (team.score === '') {
        team.score = Math.max(0, Math.min(team.score, maxScore));
      }
    }
  }
};
</script>




<style>
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
}

.bracket {
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;
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
  justify-content: center;
  background: #f9f9f9;
  padding: 15px;

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
  flex-direction: column;
  gap: 10px;
  align-items: center;
  max-width: fit-content;
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

.advance-button {
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

.match-line {
  position: absolute;
  top: 50%;
  left: 100%;
  width: 30px;
  height: 2px;
  background-color: #333;
}

</style>