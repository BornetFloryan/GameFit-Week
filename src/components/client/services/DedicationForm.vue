<template>
  <div class="form-container">
    <h1 v-if="!submitted">Réservation de créneau de dédicaces</h1>
    <h1 v-if="submitted">Réservation effectuée !</h1>
    <form>
      <div v-if="!submitted" class="animator-selection">
        <h2 v-if="!selectedAnimator">Sélectionnez votre animateur</h2>
        <h2 v-if="selectedAnimator">Votre animateur</h2>

        <div v-if="!selectedAnimator">
          <input
              type="text"
              v-model="searchQuery"
              placeholder="Rechercher un animateur..."
              class="search-bar"
          />

          <select v-model="selectedCategory">
            <option value="">Sélectionnez une catégorie</option>
            <option
                v-for="category in sportsCategories"
                :key="category._id"
                :value="category"
            >
              {{ category.name }}
            </option>
          </select>

          <div class="scroll-container">
            <div class="grid">
              <div
                  v-for="(card, index) in filteredCards"
                  :key="index"
                  class="card"
              >
                <img :src="card.imageSrc" alt="Image de la carte" />
                <h2>{{ card.name }}</h2>
                <button
                    v-if="!card.empty"
                    type="button"
                    @click="selectAnimator(card)"
                >
                  Réserver
                </button>
              </div>
            </div>
          </div>
        </div>
        <h2 v-if="selectedAnimator">{{ selectedAnimator.name }}</h2>

        <button
            type="button"
            v-if="selectedAnimator && !submitted"
            class="reset-btn"
            @click.prevent="resetForm"
        >
          Changer d'animateur
        </button>
      </div>

      <div class="time-slot-selection" v-if="selectedAnimator && !submitted">
        <h2>Sélectionnez votre créneau horaire</h2>
        <input type="date"
               v-model="selectedDate"
               :disabled="!selectedAnimator"
               min="2025-07-07"
               max="2025-07-12"
        />

        <div class="form-group" v-if="selectedDate">
          <label for="time">Heure :</label>
          <select v-model="selectedTime" required>
            <option value="" disabled>Sélectionnez une heure</option>
            <option
                v-for="time in dedicationTimes"
                :key="time"
                :value="time"
            >
              {{ time }}
            </option>
          </select>
        </div>

        <div class="form-buttons">
          <button
              v-if="selectedTime && !submitted"
              type="button"
              class="submit-btn"
              @click.prevent="submitForm"
          >
            Réserver
          </button>

          <button
              v-if="selectedTime && !submitted"
              type="button"
              class="reset-btn"
              @click.prevent="resetForm"
          >
            Annuler
          </button>
        </div>
      </div>

      <div v-if="submitted">
        <h3>Un mail de confirmation vous a été envoyé</h3>
        <p v-if="!currentUser">
          Vous pouvez retrouver votre réservation de dédicace via le compte
          associé à l'adresse mail du ticket ou en créant un compte avec cette
          adresse mail.
        </p>
        <br />
        <p>Votre réservation numéro {{ reservation._id }}</p>
        <p>
          Vous avez réservé un créneau de dédicace avec
          <b>{{ selectedAnimator.name }} !</b>
        </p>
        <p>Date : {{ formatDate(selectedDate) }}</p>
        <p>Heure : {{ selectedTime }}</p>

        <router-link :to="{ name: 'home' }">
          <button type="button" class="home-btn">
            Retour à la page principale
          </button>
        </router-link>
        <br />
        <router-link v-if="currentUser" :to="{ name: 'reservation' }">
          <button type="button" class="home-btn">
            Voir vos réservations
          </button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "DedicationFormView",
  data() {
    return {
      reservation: null,
      ticketNumber: this.$route.query.ticket || null,
      searchQuery: "",
      selectedDate: null,
      selectedTime: "",
      selectedAnimator: "",
      submitted: false,
      cards: [],
      selectedCategory: "",
    };
  },
  computed: {
    ...mapState("stands", ["standsReservations"]),
    ...mapState("prestation", ["serviceReservations"]),
    ...mapState("account", ["currentUser", "sportsCategories"]),
    ...mapGetters("stands", [
      "getStandsReservationsByServiceId",
      "getStandsReservationsByCustomerIdAndServiceId",
    ]),
    ...mapGetters("account", ["getCustomerById", "getCustomerByName"]),

    filteredCards() {
      return this.cards.filter((card) => {
        const animator = this.getCustomerByName(card.name);
        const matchesQuery =
            this.searchQuery === "" ||
            card.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesCategory =
            this.selectedCategory === "" ||
            (animator &&
                animator.sportsCategories_id.includes(this.selectedCategory._id));
        return matchesQuery && matchesCategory;
      });
    },
    dedicationTimes() {
      if (Array.isArray(this.serviceReservations)) {
        const selectedDateStr = new Date(this.selectedDate).toDateString();

        const availableTimes = this.animatorDedicationDates
            .filter(
                (date) => new Date(date.date).toDateString() === selectedDateStr
            )
            .map((date) => date.time);

        const reservedTimes = this.serviceReservations
            .filter(
                (reservation) =>
                    new Date(reservation.date).toDateString() === selectedDateStr
            )
            .map((reservation) => reservation.time);

        return availableTimes.filter((time) => !reservedTimes.includes(time));
      }
      return [];
    },
  },
  watch: {
    selectedAnimator(newAnimator) {
      if (newAnimator) {
        this.selectedDate = null;
        this.selectedTime = "";
        this.getStandsReservationsByCustomerIdAndServiceId(newAnimator, "0");
      }
    },
  },
  methods: {
    ...mapActions("stands", ["getStands", "getStandsReservations"]),
    ...mapActions("account", ["getCustomersAccounts", "getSportsCategories"]),
    ...mapActions("prestation", [
      "getServiceReservations",
      "addServiceReservation",
    ]),

    selectAnimator(card) {
      for (let animator of this.animators) {
        if (animator.name === card.name) {
          this.selectedAnimator = animator;
        }
      }
    },

    async submitForm() {
      if (!this.selectedDate || !this.selectedTime) {
        alert("Veuillez sélectionner une date et une heure");
        return;
      }
      try {
        this.reservation = await this.addServiceReservation({
          date: this.selectedDate,
          time: this.selectedTime,
          ticket_id: this.ticketNumber,
          customer_id: this.selectedAnimator._id,
        });
        this.submitted = true;
      } catch (error) {
        alert("Erreur réseau, impossible d'ajouter la réservation");
        console.error(error);
      }
    },

    resetForm() {
      this.selectedDate = null;
      this.selectedTime = "";
      this.selectedAnimator = "";
      this.submitted = false;
    },

    formatDate(date) {
      if (!date) return "";
      return `${date
          .getDate()
          .toString()
          .padStart(2, "0")}/${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}/${date.getFullYear()}`;
    },
  },
  created() {
    this.selectedAnimator = this.$route.params.selectedAnimator;
  },
  async mounted() {
    await this.getCustomersAccounts();
    await this.getSportsCategories();
    await this.getServiceReservations();
    await this.getStandsReservations();

    this.animatorDedicationDates = this.getStandsReservationsByServiceId("0");
    console.log("animatorDedicationDates", this.animatorDedicationDates);

    this.animators = this.animatorDedicationDates.map((date) =>
        this.getCustomerById(date.customer_id)
    );
    console.log("animators", this.animators);

    this.cards = this.animators.map((animator) => ({
      imageSrc: require(`@/assets/img/${animator.name}.jpg`),
      name: `${animator.name}`,
    }));
  },
};
</script>

<style scoped>
.scroll-container {
  height: 500px;
  overflow-y: auto;
}

.search-bar {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
  color: #333333;
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
  color: #f8f9fa;
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

.animator-selection {
  border: 2px solid #007bff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #1a365d;
}

.search-bar {
  width: calc(100% - 20px);
  margin: 0 auto;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 15px;
  background-color: #f8f9fa;
  color: #333;
}

.search-bar::placeholder {
  color: #666;
}

.search-bar:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

select {
  width: calc(100% - 20px);
  padding: 10px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f8f9fa;
  color: #333;
  font-size: 1rem;
  margin-bottom: 15px;
}

select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.scroll-container {
  height: 500px;
  overflow-y: auto;
  border: 2px solid #007bff;
  border-radius: 8px;
  background-color: #2a436a;
  padding: 10px;
}

button, .search-bar, select {
  transition: all 0.3s ease;
}
</style>