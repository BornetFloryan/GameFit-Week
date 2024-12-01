<template>
  <div class="form-container">
    <h1>Réservation de créneau de dédicaces</h1>
    <form>
      <div v-if="!submitted" class="animator-selection">
        <h2 v-if="!selectedAnimator">Sélectionnez votre animateur</h2>
        <h2 v-if="selectedAnimator">Votre animateur</h2>
        <div v-if="!selectedAnimator" class="scroll-container">
          <div class="grid">
            <div v-for="(card, index) in cards" :key="index" class="card">
              <img :src="card.imageSrc" alt="Image de la carte" />
              <h2>{{ card.name }}</h2>
              <button v-if="!card.empty" type="button" @click="selectAnimator(card)">Réserver</button>
            </div>
          </div>
        </div>
        <h2 v-if="selectedAnimator">{{ selectedAnimator.name }}</h2>
        <button type="button" v-if="selectedAnimator && !submitted" class="reset-btn" @click.prevent="resetForm">Changer d'animateur</button>
      </div>
      <div class="time-slot-selection" v-if="selectedAnimator && !submitted">
        <h2 v-if="!submitted">Sélectionnez votre créneau horaire</h2>
        <date-picker v-if="!submitted"
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
        <div class="form-buttons">
          <button v-if="selectedTime && !submitted" type="button" class="submit-btn" @click.prevent="submitForm">Réserver</button>
          <button v-if="selectedTime && !submitted" type="button" class="reset-btn" @click.prevent="resetForm">Annuler</button>
        </div>
      </div>
      <div v-if="submitted && logged">
        <h3>Réservation confirmée !</h3>
        <p>Vous avez réservé un créneau de dédicace avec <b>{{ selectedAnimator.name }} !</b></p>
        <p>Date : {{ formatDate(selectedDate) }}</p>
        <p>Heure : {{ selectedTime }}</p>
        <router-link :to="{ name: 'home' }">
          <button type="button" class="home-btn">Retour à la page principale</button>
        </router-link>
        <br>
        <router-link :to="{ name: 'account' }">
          <button @click="setSelectedAccountInfo('reservations')" type="button" class="home-btn">Voir vos réservations</button>
        </router-link>
      </div>
      <div v-if="submitted && !logged">
        <h3>Vous devez être connecté pour réserver un créneau de dédicace</h3>
        <router-link :to="{ name: 'login' }">
          <button type="button" class="home-btn">Se connecter</button>
        </router-link>
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
      cards: [],
      logged: false,
    };
  },
  computed: {
    ...mapState('dedication', ['animatorAvailableDates', 'availableTimes', 'animators', "dedicationReservations"]),
    ...mapState('login', ['currentUser']),
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
    },
  },
  methods: {
    ...mapActions('dedication', ['getAnimatorAvailableDates', 'getAvailableTimes', 'getAnimators', "addDedicationReservation", "getDedicationReservations"]),
    ...mapActions('account', ['setSelectedAccountInfo']),

    selectAnimator(card) {
      for (let animator of this.animators) {
        if (animator.name === card.name) {
          this.selectedAnimator = animator;
        }
      }
    },

    async submitForm() {
      if (!this.selectedDate && !this.selectedTime) {
        alert('Veuillez sélectionner une date et une heure');
      }
      await this.addDedicationReservation({
        date: this.selectedDate,
        time: this.selectedTime,
        customer: this.currentUser,
        anim_id: this.selectedAnimator._id,
      });
      this.submitted = true;
    },

    resetForm() {
      this.selectedDate = null;
      this.selectedTime = '';
      this.selectedAnimator = '';
      this.submitted = false;
    },

    formatDate(date) {
      if (!date) return '';
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    },
  },
  created() {
    this.selectedAnimator = this.$route.params.selectedAnimator;
  },
  mounted() {
    this.getAnimators().then(() => {
      if (this.animators.length > 0) {
        this.cards = this.animators.map(animator => ({
          imageSrc: require(`@/assets/img/${animator.name}.jpg`),
          name: `${animator.name}`,
        }));
      }
    });

    if(this.currentUser)
      this.logged = true;

    this.getDedicationReservations();
  },
};
</script>

<style scoped>
.scroll-container {
  height: 500px;
  overflow-y: auto;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 180px;
  gap: 10px;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  color: #333;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.card img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.card h2 {
  font-size: 1em;
  margin-bottom: 5px;
}

.card button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.card button:hover {
  background-color: #0056b3;
}

.form-container {
  border-radius: 8px;
  padding: 20px;
  max-width: 800px;
  min-height: 86vh;
  margin: 20px auto;
  background-color: #2a436a;
  color: white;
}

h1 {
  text-align: center;
  margin-top: 5px;
  font-size: 50px;
}

h2 {
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 30px;
}

form {
  margin-top: 20px;
  text-align: center;
}

form .animator-selection {
  border: 2px solid #007BFF;
  width: 100%;
}

form .time-slot-selection {
  margin-top: 1vh;
  border: 2px solid #007BFF;
}

form .time-slot-selection .form-group {
  margin-top: 1vh;
}

form .form-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 1vh;
}

form .form-buttons button {
  margin: 0 10px;
}

.reset-btn {
  background-color: #dc3545;
}

.home-btn {
  margin-bottom: 1vh;
}

.form-group {
  margin-top: 1vh;
  margin-bottom: 1vh;
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