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
              <img :src="getTeamImage(team.img)" alt="team logo" class="team-logo"/>
              <p class="name-team">{{ team.name }}</p>
              <b class="score-team">{{ team.score }}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {pro_teams} from "@/datasource/data.js";

export default {
  data() {
    return {
      teams: [],
      teamCount: 8,
      tournamentStarted: false,
      rounds: [],
    };
  },
  methods: {
    setupTournament() {
      if (this.teamCount < 4) {
        alert("Please enter at least 4 teams to start a tournament.");
        return;
      }

      this.teams = [...pro_teams];

      while (this.teams.length < this.teamCount) {
        this.teams.push({
          name: `Team ${this.teams.length + 1}`,
          img: '',
          score: 0,
          description: 'No description available'
        });
      }

      this.createRounds();
      this.tournamentStarted = true;
    },

    createRounds() {
      this.rounds = [];
      let roundMatches = [];
      for (let i = 0; i < this.teamCount; i += 2) {
        roundMatches.push({
          teams: [
            {...this.teams[i], score: 0},
            {...this.teams[i + 1], score: 0}
          ]
        });
      }
      this.rounds.push(roundMatches);
    },

    validateAndCorrectScore(team) {
      team.score = Math.max(0, Math.min(10, team.score));
    },

    getTeamImage(img) {
      try {
        return require(`@/assets/img/${img}`);
      } catch (e) {
        return require('@/assets/img/noteam.jpg');
      }
    }
  },
  mounted() {
    this.setupTournament();
  }
};
</script>

<style scoped>
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
  width: fit-content;

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
  //flex: 1 1 100px;
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

h2 {
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
}

b.score-team {
  max-width: fit-content;
  padding: 15px;
}

p.name-team {
  max-width: 70px;
}
</style>