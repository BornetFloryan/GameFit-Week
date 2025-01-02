<template>
  <div class="admin-add-dedicace-slot-form">
    <form @submit.prevent="addDedicaceSlot">
      <div class="form-group">
        <label for="date">Date</label>
        <input
            type="date"
            id="date"
            v-model="date"
            required
            :min="minDate"
            :max="maxDate"
            @change="updateAvailableTimes"
        />
      </div>

      <div v-if="date" class="form-group">
        <label>Horaires</label>
        <div :class="{'times-grid': times.length > 1, 'times-list': times.length <= 1}">
          <div v-for="(time, index) in times" :key="index" class="time-slot">
            <label :for="'time' + index">Horaire {{ index + 1 }}</label>
            <select
                :id="'time' + index"
                v-model="times[index]"
                required
            >
              <option v-for="option in availableTimeOptions(index)" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>
        </div>
      </div>

      <button type="button" @click="addTime" class="addTime-button">Ajouter un horaire</button>
      <button v-if="times.length > 1" type="button" @click="delTime" class="delTime-button">Supprimer un horaire</button>
      <br/>
      <br/>

      <div class="form-button">
        <button type="submit" class="add-button">Ajouter</button>
        <button type="reset" class="cancel-button">Annuler</button>
      </div>
    </form>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
  name: 'ProviderAddDedicaceSlotForm',
  data() {
    return {
      date: '',
      times: [''],
      timeOptions: this.generateTimeOptions(),
      usedTimes: [],
      minDate: '2025-07-07',
      maxDate: '2025-07-12',
    };
  },
  computed: {
    ...mapState('dedication', ['dedicationReservations', 'dedicationDates']),
    ...mapState('account', ['currentUser']),
  },
  methods: {
    ...mapActions('dedication', ['addDedicationDates', 'getDedicationReservations', 'getDedicationDates']),
    addTime() {
      this.times.push('');
    },
    delTime() {
      this.times.pop();
    },
    addDedicaceSlot() {
      const uniqueTimes = new Set(this.times);
      if (uniqueTimes.size !== this.times.length) {
        alert('Les plages horaires en double ne sont pas autorisées.');
        return;
      }
      this.$emit('addDedicaceSlot', {
        date: this.date,
        times: this.times,
        anim_id: this.currentUser._id,
      });
    },
    generateTimeOptions() {
      const options = [];
      for (let hour = 9; hour <= 17; hour++) {
        if (hour === 12) continue;
        const hourString = hour.toString().padStart(2, '0');
        options.push(`${hourString}:00`);
      }
      return options;
    },
    availableTimeOptions(index) {
      return this.timeOptions.filter(option => !this.times.includes(option) || this.times[index] === option).filter(option => !this.usedTimes.includes(option));
    },
    updateAvailableTimes() {
      if (this.date) {
        const selectedDate = new Date(this.date).toISOString().split('T')[0];
        this.usedTimes = this.dedicationDates
            .filter(dedication => dedication.date.split('T')[0] === selectedDate)
            .map(dedication => dedication.time);
        this.checkDateAvailability();
      } else {
        this.usedTimes = [];
      }
    },
    checkDateAvailability() {
      const availableDates = this.dedicationDates
          .map(dedication => dedication.date.split('T')[0])
          .filter(date => {
            const usedTimes = this.dedicationDates
                .filter(dedication => dedication.date.split('T')[0] === date)
                .map(dedication => dedication.time);
            return this.timeOptions.some(option => !usedTimes.includes(option));
          });

      if (!availableDates.includes(this.date)) {
        this.date = '';
      }

      this.minDate = availableDates.length > 0 ? availableDates[0] : '';
      this.maxDate = availableDates.length > 0 ? availableDates[availableDates.length - 1] : '';
    },
  },
  mounted() {
    this.getDedicationDates();
    this.getDedicationReservations();
  },
};
</script>

<style scoped>
.admin-add-dedicace-slot-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: #f3f4f6;
}

form {
  background: white;
  padding: 2em;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h2 {
  margin-bottom: 1.5em;
  color: #333;
  font-size: 1.5em;
}

.form-group {
  margin-bottom: 1.5em;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5em;
  font-size: 0.9em;
  color: #555;
}

input[type="date"],
select {
  width: 100%;
  padding: 0.75em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s ease;
}

input[type="date"]:focus,
select:focus {
  border-color: #007bff;
}

.times-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
}

.times-list {
  display: block;
}

.time-slot {
  display: flex;
  flex-direction: column;
}

.form-button {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
}

.addTime-button {
  background-color: #28a745;
  color: white;
  padding: 0.75em;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1em;
  margin-right: 10px;
}

.addTime-button:hover {
  background-color: #218838;
}

.add-button {
  background-color: #007bff;
  color: white;
  padding: 0.75em;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #0056b3;
}

.cancel-button, .delTime-button {
  background-color: #dc3545;
  color: white;
  padding: 0.75em;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px;
}

.cancel-button:hover, .delTime-button:hover {
  background-color: #ff0000;
}

.cancel-button:last-of-type, .delTime-button:last-of-type {
  margin-right: 0;
}
</style>