<template>
  <div class="reservation-view">
    <table>
      <thead>
      <tr>
        <th>Numéro</th>
        <th>Nom complet</th>
        <th>Adresse e-mail</th>
        <th>Catégorie d'animation</th>
        <th>Catégorie d'âge</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="customerTicket in customerTickets" :key="customerTicket._id">
        <td>{{ customerTicket._id }}</td>
        <td>{{ currentUser.name }}</td>
        <td>{{ currentUser.email }}</td>
        <td>{{ customerTicket._idTicketAnimationCategories }}</td>
        <td>{{ customerTicket._idTicketAgeCategories }}</td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
  name: 'TicketView',
  data() {
    return {
      customerTickets: [],
    };
  },
  computed: {
    ...mapState('login', ['currentUser']),
    ...mapState('ticket', ['tickets']),
  },
  methods: {
    ...mapActions('ticket', ['getTickets']),
  },
  watch: {
  },
  mounted() {
    this.getTickets()
        .then(() => {
          this.customerTickets = this.tickets.filter(ticket => ticket._idCustomer === this.currentUser._id);
        });
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}
</style>