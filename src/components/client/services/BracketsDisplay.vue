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
          placeholder="Enter number of teams"
      />
      <button @click="setupTournament" class="start-tournament-button">Start Tournament</button>
    </div>

    <div v-else>
      <div class="bracket" v-for="(round, roundIndex) in rounds" :key="roundIndex">
        <h2>Round {{ roundIndex + 1 }}</h2>
        <div class="match" v-for="(match, matchIndex) in round" :key="matchIndex">
          <div class="team" v-for="(team, teamIndex) in match.teams" :key="teamIndex">
            <input
                type="text"
                v-model="team.name"
                placeholder="Enter team name"
                class="team-input"
            />
            <input
                type="number"
                v-model="team.score"
                placeholder="Score"
                class="score-input"
            />
          </div>
          <button @click="advanceWinner(roundIndex, matchIndex)" class="advance-button">
            Advance Winner
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      teamCount: 0, // Number of teams entered by the user
      tournamentStarted: false,
      rounds: [] // The tournament rounds
    };
  },
  methods: {
    setupTournament() {
      // Validate team count
      if (this.teamCount < 2) {
        alert("Please enter at least 2 teams to start a tournament.");
        return;
      }

      // Clear any existing rounds
      this.rounds = [];
      console.log(`Setting up tournament with ${this.teamCount} teams.`);

      // Create the first round based on the number of teams
      const firstRoundMatches = [];
      for (let i = 0; i < this.teamCount; i += 2) {
        firstRoundMatches.push({
          teams: [
            { name: '', score: 0 },
            { name: '', score: 0 }
          ]
        });
      }

      // Initialize the first round
      this.rounds.push(firstRoundMatches);
      console.log("First round matches created:", firstRoundMatches);

      // Set the tournament as started
      this.tournamentStarted = true;
    },
    advanceWinner(roundIndex, matchIndex) {
      const match = this.rounds[roundIndex][matchIndex];
      const winner = match.teams.reduce((prev, current) => (prev.score > current.score ? prev : current));

      // Create the next round if it doesn't exist
      if (roundIndex >= this.rounds.length - 1) {
        this.rounds.push([]);
      }

      const nextRound = this.rounds[roundIndex + 1];

      // Calculate the next match index
      const nextMatchIndex = Math.floor(matchIndex / 2);

      // Create a new match if it doesn't exist
      if (!nextRound[nextMatchIndex]) {
        nextRound[nextMatchIndex] = {
          teams: [
            { name: '', score: 0 },
            { name: '', score: 0 }
          ]
        };
      }

      const nextMatch = nextRound[nextMatchIndex];

      // Place the winner in the correct slot (0 or 1)
      const slotIndex = matchIndex % 2;
      nextMatch.teams[slotIndex] = { ...winner };

      // Update the reactive state
      console.log(`Winner advanced to Round ${roundIndex + 2}, Match ${nextMatchIndex + 1}`);
      this.$forceUpdate();
    }
  }
};

</script>
<style>
.bracket-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.setup-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.setup-container input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 200px;
}

.start-tournament-button {
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.start-tournament-button:hover {
  background-color: #218838;
}

.bracket {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.match {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
}

.team {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.team-input, .score-input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.advance-button {
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.advance-button:hover {
  background-color: #0056b3;
}
</style>