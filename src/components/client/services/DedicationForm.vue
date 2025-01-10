<template>
  <div class="form-container">
    <h1 v-if="!reservation">Réservation de créneau de dédicaces</h1>
    <h1 v-if="reservation">Réservation effectuée !</h1>
    <form>
      <div v-if="!reservation" class="animator-selection">
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
                <img v-if="card.imageSrc" :src="card.imageSrc" alt="Image de la carte" />
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
            v-if="selectedAnimator && !reservation"
            class="reset-btn"
            @click.prevent="resetForm"
        >
          Changer d'animateur
        </button>
      </div>

      <div class="time-slot-selection" v-if="selectedAnimator && !reservation">
        <h2>Sélectionnez votre créneau horaire</h2>
        <input
            required
            type="date"
            v-model="date"
            :id="date"
            :disabled="!selectedAnimator"
            min="2025-07-07"
            max="2025-07-12"
            @change="updateAvailableTimes(date)"
        />

        <div class="form-group" v-if="date">
          <label for="time">Heure :</label>
          <select
              required
              v-model="time"
              :id="time"
              :disabled="!selectedAnimator"
          >
            <option value="" disabled>Sélectionnez une heure</option>
            <option
                v-for="option in availableTimes"
                :key="option.value"
                :value="option.value"
            >
              {{ option.text }}
            </option>
          </select>
        </div>

        <div class="form-buttons">
          <button
              v-if="time && !reservation"
              type="button"
              class="submit-btn"
              @click.prevent="submitForm"
          >
            Réserver
          </button>

          <button
              v-if="time && !reservation"
              type="button"
              class="reset-btn"
              @click.prevent="resetForm"
          >
            Annuler
          </button>
        </div>
      </div>

      <div v-if="reservation && reservation">
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
        <p>Date : {{ formatDate(date) }}</p>
        <p>Heure : {{ time }}</p>

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
      ticket_id: this.$route.query.ticket || null,
      searchQuery: "",
      selectedAnimator: "",
      cards: [],
      selectedCategory: "",
      date: "",
      availableTimes: [],
      time: "",
    };
  },
  computed: {
    ...mapState("stands", ["standsReservations"]),
    ...mapState("prestation", ["serviceReservations"]),
    ...mapState("account", ["currentUser", "sportsCategories", "provider_sport_categories"]),
    ...mapGetters("stands", [
      "getStandsReservationsByServiceId",
      "getStandsReservationsByCustomerIdAndServiceId",
    ]),
    ...mapGetters("account", ["getCustomerById", "getCustomerByName"]),
    ...mapGetters("prestation", [
      "getServiceReservationsByTicketIdAndDate",
      "getServiceReservationsByDate",
    ]),
    ...mapGetters('stands', ['getStandsReservationsByCustomerIdAndServiceIdAndDate']),

    filteredCards() {
      return this.cards.filter((card) => {
        const animator = this.getCustomerByName(card.name);
        const matchesQuery =
            this.searchQuery === "" ||
            card.name.toLowerCase().includes(this.searchQuery.toLowerCase());

        const providerSportCategories = this.provider_sport_categories.filter(
            (category) => animator && category.customer_id === animator._id
        );

        const matchesCategory =
            this.selectedCategory === "" ||
            (animator && providerSportCategories.some(
                (category) => category.sport_id.includes(this.selectedCategory._id)
            ));

        return matchesQuery && matchesCategory;
      });
    },
  },
  watch: {
    selectedAnimator(newAnimator) {
      if (newAnimator) {
        this.date = null;
        this.time = "";
        this.getStandsReservationsByCustomerIdAndServiceId(newAnimator, "0");
      }
    },
  },
  methods: {
    ...mapActions("stands", ["getStands", "getStandsReservations"]),
    ...mapActions("account", ["getCustomersAccounts", "getSportsCategories", "getProviderSportCategories"]),
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
      this.date = "";
      this.time = "";
    },

    updateAvailableTimes(date) {
      this.date = date;
      const availableTimes = this.filterAvailableTimes(date, this.selectedAnimator._id);
      this.availableTimes = availableTimes.filter((time) => time !== "18:00").map((time) => ({value: time, text: time}));
      if (availableTimes.length === 0) {
        this.date = "";
        alert("Aucun créneau disponible pour cette date");
      }
    },

    filterAvailableTimes(date, customer_id) {
      const customerReservations = this.getServiceReservationsByTicketIdAndDate(this.ticket_id, date);
      const ServiceReservations = this.getServiceReservationsByDate(date);
      const prestataireAvailableTimes = this.getPrestataireAvailableTimes(customer_id, date);

      const usedTimes = [...customerReservations, ...ServiceReservations].map((reservation) => reservation.time);

      const availableTimes = prestataireAvailableTimes
          .filter((time) => !usedTimes.includes(time) && time !== "18:00")
          .sort((a, b) => {
            const [aHours, aMinutes] = a.split(':').map(Number);
            const [bHours, bMinutes] = b.split(':').map(Number);
            return aHours * 60 + aMinutes - (bHours * 60 + bMinutes);
          });

      return availableTimes.length > 0 ? availableTimes : [];
    },

    getPrestataireAvailableTimes(customer_id, date) {
      const schedules = this.getStandsReservationsByCustomerIdAndServiceIdAndDate(customer_id, "0", date);

      if (!schedules || schedules.length === 0) {
        return [];
      }

      const times = [];
      schedules.forEach(schedule => {
        const start = parseInt(schedule.start_time.split(':')[0], 10) * 60 + parseInt(schedule.start_time.split(':')[1], 10);
        const end = parseInt(schedule.end_time.split(':')[0], 10) * 60 + parseInt(schedule.end_time.split(':')[1], 10);

        for (let minutes = start; minutes < end; minutes += 5) {
          const hours = Math.floor(minutes / 60);
          const mins = minutes % 60;
          const time = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
          times.push(time);
        }
      });

      return times;
    },

    async submitForm() {
      if (!this.date || !this.time) {
        alert("Veuillez sélectionner une date et une heure");
        return;
      }
      const standReservations = this.getStandsReservationsByCustomerIdAndServiceIdAndDate(this.selectedAnimator._id, "0", this.date);
      const selectedTime = this.time;

      const standReservation = standReservations.find(reservation => {
        const startTime = parseInt(reservation.start_time.split(':')[0], 10) * 60 + parseInt(reservation.start_time.split(':')[1], 10);
        const endTime = parseInt(reservation.end_time.split(':')[0], 10) * 60 + parseInt(reservation.end_time.split(':')[1], 10);
        const selectedMinutes = parseInt(selectedTime.split(':')[0], 10) * 60 + parseInt(selectedTime.split(':')[1], 10);
        return selectedMinutes >= startTime && selectedMinutes < endTime;
      });

      let data = {
        date: this.date,
        time: this.time,
        ticket_id: this.ticket_id,
        customer_id: this.selectedAnimator._id,
      };

      if (standReservation) {
        data.stand_reservation_id = standReservation._id;
      } else {
        alert("No valid stand reservation found for the selected time.");
        return;
      }

      data.service_id = "0";

      try {
        let response = await this.addServiceReservation(data);
        if (response.error === 0) {
          this.reservation = response.data;
          return;
        }
        alert(response.data);
      } catch (e) {
        alert("Une erreur s'est produite lors de l'ajout de la réservation");
      }
    },

    resetForm() {
      this.date = null;
      this.time = "";
      this.selectedAnimator = "";
      this.reservation = "";
    },

    formatDate(date) {
      if (!date) return "";
      const dateObj = new Date(date);
      return `${dateObj.getDate().toString().padStart(2, "0")}/${(dateObj.getMonth() + 1).toString().padStart(2, "0")}/${dateObj.getFullYear()}`;
    },
  },
  async mounted() {
    await this.getCustomersAccounts();
    await this.getSportsCategories();
    await this.getServiceReservations();
    await this.getStandsReservations();
    await this.getProviderSportCategories();

    this.animatorDedicationDates = this.getStandsReservationsByServiceId("0");

    this.animators = this.animatorDedicationDates.map((date) =>
        this.getCustomerById(date.customer_id)
    );

    this.cards = this.animators.map((animator) => {
      let imageSrc;
      try {
        imageSrc = require(`@/assets/img/${animator.name}.jpg`);
      } catch (e) {
        imageSrc = null;
      }
      return {
        imageSrc: imageSrc,
        name: `${animator.name}`,
      };
    });

    const prestataireId = this.$route.query.prestataireId;
    if (prestataireId) {
      const selectedAnimator = this.getCustomerById(prestataireId);
      if (selectedAnimator) {
        this.selectedAnimator = selectedAnimator;
      }
    }
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