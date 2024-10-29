<template>
  <div class="form-container">
    <h1>Réservation de créneau de dédicace</h1>
    <form>
      <div class="animator-selection">
        <h2>Sélectionnez votre animateur</h2>
        <div class="form-group">
          <label for="animator">Animateur :</label>
          <select v-model="selectedAnimator" required>
            <option value="" disabled>Sélectionnez un animateur</option>
            <option v-for="animator in animators" :key="animator._id" :value="animator._id">{{ animator.name }}</option>
          </select>
        </div>
      </div>
      <div class="time-slot-selection" v-if="selectedAnimator">
        <h2>Sélectionnez votre créneau horaire</h2>
        <date-picker
            v-model="selectedDate"
            format="DD/MM/YYYY"
            :lang="fr"
            :disabled-date="disabledDates"
        />
        <div class="form-group" v-if="selectedDate">
          <label for="time">Heure :</label>
          <select v-model="selectedTime" required>
            <option value="" disabled>Sélectionnez une heure</option>
            <option v-for="time in availableTimes" :key="time" :value="time">{{ time }}</option>
          </select>
        </div>
        <button type="button" @click.prevent="submitForm">Réserver</button>
        <div v-if="submitted">
          <h3>Réservation confirmée !</h3>
          <p>Date : {{ formatDate(selectedDate) }}</p>
          <p>Heure : {{ selectedTime }}</p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { mapState, mapActions } from 'vuex';
import fr from 'vue2-datepicker/locale/fr';

export default {
  name: 'DedicationView',
  components: {
    DatePicker,
  },
  data() {
    return {
      selectedDate: null,
      selectedTime: '',
      selectedAnimator: '',
      submitted: false,
      fr: fr,
    };
  },
  computed: {
    ...mapState(['animatorAvailableDates', 'availableTimes', 'animators']),
    disabledDates() {
      const availableDatesSet = new Set(this.animatorAvailableDates.map(date => new Date(date).toDateString()));
      return date => !availableDatesSet.has(date.toDateString());
    },
  },
  watch: {
    selectedDate(newDate) {
      if (newDate) {
        this.getAvailableTimes(newDate);
      }
    },
    selectedAnimator(newAnimator) {
      if (newAnimator) {
        this.selectedDate = null;
        this.selectedTime = '';
        this.getAnimatorAvailableDates(newAnimator);
      }
    }
  },
  methods: {
    ...mapActions(['getAnimatorAvailableDates', 'getAvailableTimes', "getAnimators"]),
    submitForm() {
      if (this.selectedDate && this.selectedTime) {
        this.submitted = true;
      } else {
        alert('Veuillez sélectionner une date et une heure');
      }
    },
    formatDate(date) {
      if (!date) return '';
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    }
  },
  mounted() {
    this.getAnimators();
  },
};
</script>

<style scoped>
.form-container {
  border: 2px solid #007BFF;
  border-radius: 8px;
  padding: 20px;
  max-width: 800px;
  margin: 20px auto;
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  margin-top: 5px;
  font-size: 50px;
}

form {
  margin-top: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>