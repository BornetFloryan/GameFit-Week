<template>
  <div class="reservation-view">
    <table v-if="currentUser">
      <thead>
      <tr>
        <th>Numéro</th>
        <th>Date</th>
        <th>Adresse e-mail</th>
        <th>Catégorie d'animation</th>
        <th>Catégorie d'âge</th>
        <th>Prix</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="customerTicket in customerTickets" :key="customerTicket._id">
        <td>{{ customerTicket._id }}</td>
        <td>{{ customerTicket.date }}</td>
        <td>{{ currentUser.email }}</td>
        <td>{{ ticketAnimationCategory(customerTicket)?.name }}</td>
        <td>{{ ticketAgeCategory(customerTicket)?.name }}</td>
        <td>{{ price(customerTicket)?.price }}</td>
        <td>
          <button @click="deleteTicketAction(customerTicket)">Supprimer</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex';

export default {
  name: 'TicketView',
  data() {
    return {
      customerTickets: [],
    };
  },
  computed: {
    ...mapState('account', ['currentUser']),
    ...mapState('ticket', ['tickets', 'ticketsAnimationCategories', 'ticketsAgeCategories', 'ticketPrices']),
    ...mapGetters('ticket', ["getTicketsByCustomerId", 'getTicketPricesPriceById', "getTicketsAnimationCategoryById", "getTicketsAgeCategoriesgoryById"]),
    price() {
      return (ticket) => {
        if (!this.ticketPrices) return null;
        return this.getTicketPricesPriceById(ticket.price_id);
      };
    },
    ticketAnimationCategory() {
      return (ticket) => {
        const price = this.price(ticket);
        if (!price || !this.ticketsAnimationCategories) return null;
        return this.getTicketsAnimationCategoryById(price.animation_category_id);
      };
    },
    ticketAgeCategory() {
      return (ticket) => {
        const price = this.price(ticket);
        if (!price || !this.ticketsAgeCategories) return null;
        return this.getTicketsAgeCategoriesgoryById(price.age_category_id);
      };
    }
  },
  methods: {
    ...mapActions('ticket', ['getTickets', 'getTicketsAnimationCategories', 'getTicketsAgeCategories', 'getTicketPrices', 'deleteTicket']),
    deleteTicketAction(ticket) {
      this.deleteTicket(ticket._id);
      this.customerTickets = this.customerTickets.filter(t => t._id !== ticket._id);
    },
  },
  mounted() {
    this.getTickets()
        .then(() => {
          this.customerTickets = this.getTicketsByCustomerId(this.currentUser?._id);
        })
    this.getTicketsAnimationCategories();
    this.getTicketsAgeCategories();
    this.getTicketPrices();
  },
};
</script>

<style scoped>
.reservation-view {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f9fafb;
}

table {
  width: 90%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

th {
  background-color: #2a4269;
  color: white;
  padding: 12px 15px;
  text-align: left;
  text-transform: uppercase;
  font-size: 14px;
}

td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: #f1f1f1;
  transition: background-color 0.3s ease;
}

button {
  padding: 8px 12px;
  font-size: 14px;
  color: white;
  background-color: #ff6b6b;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #ff3b3b;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>