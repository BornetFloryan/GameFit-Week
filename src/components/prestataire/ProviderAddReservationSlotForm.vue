<template>
  <div class="admin-add-reservation-slot-form">
    <form @submit.prevent="addReservationSlot">
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
      <br/><br/>

      <div class="form-button">
        <button type="submit" class="add-button">Ajouter</button>
        <button type="reset" class="cancel-button">Annuler</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ProviderAddReservationSlotForm',
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
    ...mapState('restaurant', ['reservationDates', 'reservations']),
    ...mapState('account', ['currentUser']),
  },
  methods: {
    ...mapActions('restaurant', ['addReservationDates', 'getReservations', 'getReservationDates']),
    addTime() {
      this.times.push('');
    },
    delTime() {
      this.times.pop();
    },
    addReservationSlot() {
      const uniqueTimes = new Set(this.times);
      if (uniqueTimes.size !== this.times.length) {
        alert('Les plages horaires en double ne sont pas autorisées.');
        return;
      }
      this.$emit('addReservationSlot', {
        date: this.date,
        times: this.times,
        provider_id: this.currentUser._id,
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
      this.usedTimes = this.reservationDates
          .filter(reservation => reservation.date === this.date)
          .map(reservation => reservation.time);
    },
  },
};
</script>

<style scoped>
.admin-add-reservation-slot-form {
  max-width: 600px;
  margin: 0 auto;
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1em;
}

label {
  font-size: 1em;
  font-weight: bold;
}

input,
select,
button {
  padding: 10px;
  margin-top: 5px;
}

input,
select {
  width: 100%;
  font-size: 1em;
}

button {
  background-color: #007bff;
  color: white;
  font-size: 1em;
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}

.addTime-button,
.delTime-button {
  margin: 10px 0;
  background-color: #28a745;
}

.cancel-button {
  background-color: #dc3545;
}

.times-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
}
</style>
