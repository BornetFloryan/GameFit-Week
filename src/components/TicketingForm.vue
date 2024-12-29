<template>
  <div class="ticketing-container">
    <form v-if="!submissionSuccess" @submit.prevent="submitForm">
      <h2>Achat de Billet</h2>
      <div class="form-group">
        <label for="name">Nom complet:</label>
        <input
            type="text"
            id="name"
            v-model="formData.name"
            required
            placeholder="Entrez votre nom"
            value="name"
        />
      </div>

      <div class="form-group">
        <label for="email">Adresse e-mail:</label>
        <input
            type="email"
            id="email"
            v-model="formData.email"
            required
            placeholder="Entrez votre e-mail"
            value="email"
        />
      </div>

      <div v-if="ticketsAnimationCategories.length" class="form-group">
        <label for="event">Animation:</label>
        <select v-model="formData._idTicketAnimationCategories" required>
          <option value="" disabled>Choisissez votre catégorie d'animation</option>
          <option v-for="animation in ticketsAnimationCategories"
                  :value="animation._id"
                  :key="animation._id">
            {{ animation.name }}
          </option>
        </select>
      </div>

      <div v-if="ticketsAgeCategories.length && formData._idTicketAnimationCategories" class="form-group">
        <label for="event">Âge:</label>
        <select v-model="formData._idTicketAgeCategories" required>
          <option value="" disabled>Choisissez votre catégorie d'âge</option>
          <option v-for="age in ticketsAgeCategories"
                  :value="age._id"
                  :key="age._id">
            {{ age.name }}
          </option>
        </select>
      </div>

      <div v-if="formData._idTicketAgeCategories" class="form-group">
        <label for="ticketCount">Nombre de billets:</label>
        <input
            type="number"
            id="ticketCount"
            v-model.number="formData.ticketCount"
            min="1"
            required
            placeholder="Nombre de billets"
        />
      </div>

      <div v-if="formData._idTicketAgeCategories" class="form-group">
        <label for="price">Tarif:</label>
        <input
            type="number"
            id="price"
            v-model="formData.price"
            disabled
        />
      </div>

      <div class="form-group">
        <label for="payment">Méthode de paiement:</label>
        <select v-model="formData.paymentMethod" required>
          <option value="creditCard">Carte de crédit</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>
      <div class="form-button">
        <button type="submit" class="buy-button">Acheter</button>
      </div>

    </form>

    <div v-if="submissionSuccess">
      <h2>Merci pour votre réservation !</h2>
      <p>Un e-mail de confirmation a été envoyé.</p>
      <div class="home-button-container">
        <router-link :to="{ name: 'ticket' }">
          <button type="button" class="ticket-button">Voir les tickets</button>
        </router-link>
        <router-link :to="{ name: 'home' }">
          <button type="button" class="home-button">Retour à la page d'accueil</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: 'TicketingFormView',
  components: {
  },
  data() {
    return {
      formData: {
        name: '',
        price: '',
        $date: '',
        time: '',
        email: '',
        _idTicketAnimationCategories: '',
        _idTicketAgeCategories: '',
        ticketCount: 1,
        paymentMethod: 'creditCard',
      },
      submissionSuccess: false,
          };
  },
  computed: {
    ...mapState('account', ['currentUser']),
    ...mapState('ticket', ['ticketsAnimationCategories', 'ticketsAgeCategories', "ticketPrice", "tickets"]),
  },
  watch: {
    'formData._idTicketAnimationCategories': function () {
      if(this.submissionSuccess === false){
        this.formData.price = '';
        this.getTicketsAgeCategories(this.formData);
      }
    },
    'formData._idTicketAgeCategories': function () {
      if(this.submissionSuccess === false){
        this.updateTicketPrice();
      }
    },
    'formData.ticketCount': function () {
      if(this.submissionSuccess === false){
        this.updateTicketPrice();
      }
    },
  },
  methods: {
    ...mapActions('ticket', ['getTickets', 'getTicketsAnimationCategories', 'getTicketsAgeCategories', 'getTicketPrice', "addTickets"]),
    submitForm() {
      this.formData.$date = new Date().toLocaleDateString();
      this.formData.time = new Date().toLocaleTimeString();

      this.addTickets(this.formData);
      this.submissionSuccess = true;

      this.formData = {
        name: '',
        price: '',
        $date: '',
        time: '',
        email: '',
        _idTicketAnimationCategories: '',
        _idTicketAgeCategories: '',
        ticketCount: 1,
        paymentMethod: 'creditCard',
      };
    },
    updateTicketPrice() {
      this.getTicketPrice(this.formData).then(() => {
        this.formData.price = this.ticketPrice * this.formData.ticketCount;
      });
    },
  },
  mounted() {
    if(this.currentUser){
      this.formData.name = this.currentUser.name;
      this.formData.email = this.currentUser.email;
    }
    this.getTicketsAnimationCategories();
    this.getTickets();
  },
};
</script>

<style scoped>
.ticketing-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: #f3f4f6;
  text-align: center;
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

input[type="text"],
input[type="email"],
input[type="number"],
input[type="password"],
select {
  width: 100%;
  padding: 0.75em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="number"]:focus,
input[type="password"]:focus,
select:focus {
  border-color: #007bff;
}

.form-button {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
}

.buy-button {
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

.buy-button:hover {
  background-color: #218838;
}

.home-button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ticket-button, .home-button {
  background-color: #007bff;
  color: white;
  padding: 0.75em;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 10px;
  width: 200px; /* Set a fixed width */
}

.ticket-button:hover, .home-button:hover {
  background-color: #0056b3;
}
</style>