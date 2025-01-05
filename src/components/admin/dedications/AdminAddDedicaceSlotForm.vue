<template>
  <div class="admin-add-dedicace-slot-form">
    <form @submit.prevent="addDedicaceSlot">
      <div class="form-group">
        <label for="date">Date</label>
        <input
            type="date"
            id="date"
            v-model="$data.date"
            required
        />
      </div>

      <div class="form-group">
        <label>Horaires</label>
        <div :class="{'times-grid': time.length > 1, 'times-list': time.length <= 1}">
          <div v-for="(time, index) in time" :key="index" class="time-slot">
            <label :for="'time' + index">Horaire {{ index + 1 }}</label>
            <input
                type="time"
                :id="'time' + index"
                v-model="time[index]"
                required
            />
          </div>
        </div>
      </div>

      <button type="button" @click="addTime" class="addTime-button">Ajouter un horaire</button>
      <button v-if="time.length > 1" type="button" @click="delTime" class="delTime-button">Supprimer un horaire</button>
      <br/>
      <br/>

      <div class="form-group">
        <label for="anim_id">Animateur</label>
        <select id="anim_id" required>
          <option value="" disabled selected>Choisissez un animateur</option>
          <option v-for="animator in animators"
                  :key="animator._id"
                  :value="animator._id">{{ animator.name }}
          </option>
        </select>
      </div>

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
  name: 'AdminAddDedicaceSlotForm',
  data() {
    return {
      date: '',
      time: [''],
    };
  },
  computed: {
    ...mapState('dedication', ['dedicationReservations', 'dedicationDates', 'animators']),
  },
  methods: {
    ...mapActions('dedication', ['addDedicationDates', 'getDedicationReservations', 'getDedicationDates', 'getAnimators']),
    addTime() {
      this.time.push('');
    },
    delTime() {
      this.time.pop();
    },
    addDedicaceSlot() {
      const uniqueTimes = new Set(this.time);
      if (uniqueTimes.size !== this.time.length) {
        alert('Les plages horaires en double ne sont pas autorisées.');
        return;
      }
      const customer_id = document.getElementById('customer_id').value;
      this.$emit('addDedicaceSlot', {
        date: this.data.date,
        time: this.time,
        anim_id: customer_id});
    },
  },
  mounted() {
    this.getDedicationDates();
    this.getDedicationReservations();
    this.getAnimators();
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
input[type="time"],
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
input[type="time"]:focus,
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