<template>
  <div class="add-dedicace-slot-form">
    <form @submit.prevent="addDedicaceSlot">
      <div class="form-group">
        <label for="date">Date</label>
        <input
            type="date"
            id="date"
            v-model="date"
            required
        />
      </div>

      <div class="form-group" v-for="(time, index) in times" :key="index">
        <label :for="'time' + index">Horaire</label>
        <input
            type="time"
            :id="'time' + index"
            v-model="times[index]"
            required
        />
      </div>

      <button type="button" @click="addTime" class="addTime-button">Ajouter un horaire</button>
      <button v-if="times.length > 1" type="button" @click="delTime" class="delTime-button">Supprimer un horaire</button>
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
  name: 'AddDedicaceSlotForm',
  data() {
    return {
      date: '',
      times: [''],
    };
  },
  computed: {
    ...mapState('dedication', ['dedicationReservations', 'availableDates', 'animators']),
  },
  methods: {
    ...mapActions('dedication', ['addAvailableDate', 'getDedicationReservations', 'getAvailableDates', 'getAnimators']),
    addTime() {
      this.times.push('');
    },
    delTime() {
      this.times.pop();
    },
    addDedicaceSlot() {
      const anim_id = document.getElementById('anim_id').value;
      this.addAvailableDate({
        $date: this.date,
        times: this.times,
        anim_id,
      });
    },
  },
  watch: {
  },
  mounted() {
    this.getAvailableDates();
    this.getDedicationReservations();
    this.getAnimators();
  },
};

</script>

<style scoped>
.add-dedicace-slot-form {
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
}

.cancel-button:hover, .delTime-button:hover {
  background-color: #ff0000;
}
</style>