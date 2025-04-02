<template>
  <div class="ticket-view">
    <table v-if="currentUser">
      <thead>
      <tr>
        <th>Numéro</th>
        <th>Date</th>
        <th>Adresse e-mail</th>
        <th>Catégorie d'âge</th>
        <th>Prix</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="customerTicket in customerTickets" :key="customerTicket._id">
        <td>{{ customerTicket._id }}</td>
        <td>{{ customerTicket.date }}</td>
        <td>{{ currentUser.email }}</td>
        <td>{{ ticketAgeCategory(customerTicket)?.name }}</td>
        <td>{{ price(customerTicket)?.price }}</td>
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
    ...mapState('ticket', ['tickets', 'ticketsAgeCategories', 'ticketPrices']),
    ...mapGetters('ticket', ["getTicketsByCustomerId", 'getTicketPricesPriceById', "getTicketsAgeCategoryById"]),
    price() {
      return (ticket) => {
        if (!this.ticketPrices) return null;
        return this.getTicketPricesPriceById(ticket.price_id);
      };
    },
    ticketAgeCategory() {
      return (ticket) => {
        const price = this.price(ticket);
        if (!price || !this.ticketsAgeCategories) return null;
        return this.getTicketsAgeCategoryById(price.age_category_id);
      };
    }
  },
  methods: {
    ...mapActions('ticket', ['getTickets', 'getTicketsAgeCategories', 'getTicketPrices', 'deleteTicket']),
    async deleteTicketAction(ticket) {
      try{
        let response = await this.deleteTicket(ticket._id)
        if(response.error !==0){
          alert(response.data);
          return;
        }
        this.customerTickets = this.customerTickets.filter(t => t._id !== ticket._id);
      } catch (error){
        console.error('error', error);
      }

    },
  },
  mounted() {
    this.getTickets()
        .then(() => {
          this.customerTickets = this.getTicketsByCustomerId(this.currentUser?._id);
        })
    this.getTicketsAgeCategories();
    this.getTicketPrices();
  },
};
</script>

<style scoped>
.ticket-view {
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