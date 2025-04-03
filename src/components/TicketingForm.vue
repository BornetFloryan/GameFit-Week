<template>
  <div class="ticketing-container">
    <form v-if="!submissionSuccess" @submit.prevent="submitForm">
      <h2>{{ $t('ticketing.title') }}</h2>

      <div class="form-group">
        <label for="email">{{ $t('ticketing.emailLabel') }}:</label>
        <input
            type="email"
            id="email"
            v-model="formData.email"
            required
            :placeholder="$t('ticketing.emailLabel')"
        />
      </div>

      <div v-if="ticketsAgeCategories.length" class="form-group">
        <label for="event">{{ $t('ticketing.ageCategoryLabel') }}:</label>
        <select v-model="formData._idTicketAgeCategories" required>
          <option value="" disabled>{{ $t('ticketing.selectAgeCategory') }}</option>
          <option v-for="age in ticketsAgeCategories" :value="age._id" :key="age._id">
            {{ getLocalizedAgeCategoryName(age.name) }}
          </option>
        </select>
      </div>

      <div v-if="formData._idTicketAgeCategories" class="form-group">
        <label for="ticketCount">{{ $t('ticketing.ticketCountLabel') }}:</label>
        <input
            type="number"
            id="ticketCount"
            v-model.number="formData.ticketCount"
            min="1"
            required
            :placeholder="$t('ticketing.ticketCountLabel')"
        />
      </div>

      <div v-if="formData._idTicketAgeCategories" class="form-group">
        <label for="price">{{ $t('ticketing.priceLabel') }}:</label>
        <input
            type="number"
            id="price"
            v-model="formData.price"
            disabled
        />
      </div>

      <div class="form-group">
        <label for="payment">{{ $t('ticketing.paymentMethodLabel') }}:</label>
        <select v-model="formData.paymentMethod" required>
          <option value="creditCard">{{ $t('ticketing.creditCard') }}</option>
        </select>
      </div>

      <div v-if="formData.paymentMethod === 'creditCard'">
        <div class="form-group">
          <label for="cardNumber">{{ $t('ticketing.cardNumber') }}</label>
          <input type="text" id="cardNumber" v-model="formData.cardNumber" required maxlength="16" inputmode="numeric" pattern="\d{16}" />
        </div>
        <div class="form-group">
          <label for="expiryDate">{{ $t('ticketing.expiryDate') }}</label>
          <input type="date" id="expiryDate" v-model="formData.expiryDate" required />
        </div>
        <div class="form-group">
          <label for="cvv">{{ $t('ticketing.cvv') }}</label>
          <input type="text" id="cvv" v-model="formData.cvv" required maxlength="3" inputmode="numeric" pattern="\d{3}" />
        </div>
      </div>

      <div class="form-button">
        <button type="submit" class="buy-button">{{ $t('ticketing.buyButton') }}</button>
      </div>
    </form>

    <div v-if="submissionSuccess">
      <h2>{{ $t('ticketing.successTitle') }}</h2>
      <p>{{ $t('ticketing.successMessage') }}</p>
      <br>
      <p>{{ $t('ticketing.ticketNumber') }}: {{ ticket[0]._id }}</p>
      <br>
      <div class="home-button-container">
        <router-link v-if="currentUser" :to="{ name: 'ticket' }">
          <button type="button" class="ticket-button">{{ $t('ticketing.viewTickets') }}</button>
        </router-link>
        <router-link :to="{ name: 'home' }">
          <button type="button" class="home-button">{{ $t('ticketing.homeButton') }}</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

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
        cardNumber: '',
        expiryDate: '',
        cvv: ''
      },
      submissionSuccess: false,
    };
  },
  computed: {
    ...mapState('account', ['currentUser']),
    ...mapState('ticket', ['ticketsAgeCategories', 'ticketPrices', 'tickets']),
    ...mapGetters('ticket', ['getTicketPriceByCategories']),
  },
  watch: {
    'formData._idTicketAgeCategories': function () {
      if (!this.submissionSuccess) {
        this.updateTicketPrice(this.formData._idTicketAgeCategories);
      }
    },
    'formData.ticketCount': function () {
      if (!this.submissionSuccess) {
        this.updateTicketPrice(this.formData._idTicketAgeCategories);
      }
    },
  },
  methods: {
    ...mapActions('ticket', ['getTickets', 'getTicketsAgeCategories', 'getTicketPrices', 'addTickets']),
    async submitForm() {
      this.formData.date = new Date().toLocaleDateString();
      this.formData.time = new Date().toLocaleTimeString();

      try {
        const response = await this.addTickets(this.formData);
        this.ticket = response.data;
        this.submissionSuccess = true;
      } catch (error) {
        console.error("Erreur lors de l'achat de billet :", error);
      }

      this.resetFormData();
    },
    updateTicketPrice(id) {
      const price = this.getTicketPriceByCategories(id);
      if (price) {
        this.formData.price = price.price * this.formData.ticketCount;
      } else {
        this.formData.price = 0;
      }
    },
    resetFormData() {
      this.formData = {
        price: '',
        date: '',
        time: '',
        email: '',
        _idTicketAgeCategories: '',
        ticketCount: 1,
        paymentMethod: 'creditCard',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
      };
    },
    getLocalizedAgeCategoryName(name) {
      if (this.$i18n.locale === 'en') {
        return this.$t(`ticketing.ageCategories.${name.toLowerCase()}`) || name;
      }
      return name;
    }
  },
  mounted() {
    if (this.currentUser) {
      this.formData.email = this.currentUser.email;
    }
    this.getTicketsAgeCategories();
    this.getTicketPrices();
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
  overflow-y: auto;
}

form {
  background: white;
  padding: 1em;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h2 {
  margin-bottom: 1em;
  color: #333;
  font-size: 1.5em;
}

.form-group {
  margin-bottom: 1em;
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
input[type="date"],
select {
  width: 100%;
  padding: 0.5em;
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
input[type="date"]:focus,
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
  padding: 0.5em;
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
  padding: 0.5em;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 10px;
  width: 200px;
}

.ticket-button:hover, .home-button:hover {
  background-color: #0056b3;
}
</style>