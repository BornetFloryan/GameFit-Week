<template>
  <div class="ticketing-container">
    <form v-if="!submissionSuccess" @submit.prevent="submitForm">
      <h2>Achat de Billet</h2>

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

      <div v-if="ticketsAgeCategories.length" class="form-group">
        <label for="event">Catégorie d'âge:</label>
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
      <br>
      <p>Votre billet numéro {{ticket[0]._id}}</p>
      <br>
      <div class="home-button-container">
        <router-link v-if="currentUser" :to="{ name: 'ticket' }">
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
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: 'TicketingFormView',
  components: {},
  data() {
    return {
      ticket: null,
      formData: {
        price: '',
        date: '',
        time: '',
        email: '',
        _idTicketAgeCategories: '',
        ticketCount: 1,
        paymentMethod: 'creditCard',
      },
      submissionSuccess: false,
    };
  },
  computed: {
    ...mapState('account', ['currentUser']),
    ...mapState('ticket', ['ticketsAgeCategories', "ticketPrices", "tickets"]),
    ...mapGetters('ticket', ['getTicketPriceByCategories']),
  },
  watch: {
    'formData._idTicketAgeCategories': function () {
      if (this.submissionSuccess === false) {
        this.updateTicketPrice(this.formData._idTicketAgeCategories);
      }
    },
    'formData.ticketCount': function () {
      if (this.submissionSuccess === false) {
        this.updateTicketPrice(this.formData._idTicketAgeCategories);
      }
    },
  },
  methods: {
    ...mapActions('ticket', ['getTickets', 'getTicketsAgeCategories', 'getTicketPrices', "addTickets"]),
    async submitForm() {
      this.formData.date = new Date().toLocaleDateString();
      this.formData.time = new Date().toLocaleTimeString();

      this.ticket = (await this.addTickets(this.formData)).data;
      this.submissionSuccess = true;

      this.formData = {
        price: '',
        date: '',
        time: '',
        email: '',
        _idTicketAgeCategories: '',
        ticketCount: 1,
        paymentMethod: 'creditCard',
      };
    },
    updateTicketPrice(_idTicketsAgeCategories) {
      const price = this.getTicketPriceByCategories(_idTicketsAgeCategories);
      if (price) {
        this.formData.price = price.price * this.formData.ticketCount;
      } else {
        this.formData.price = 0;
      }
    },
  },
  mounted() {
    if (this.currentUser) {
      this.formData.name = this.currentUser.name;
      this.formData.email = this.currentUser.email;
    }
    this.getTicketsAgeCategories();
    this.getTicketPrices()
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