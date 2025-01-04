<template>
  <div class="reservation-view">
    <table>
      <thead>
      <tr>
        <th>Numéro</th>
        <th>Date</th>
        <th>Horaire</th>
        <th>Animateur</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="dedicationReservation in customerDedicationReservations" :key="dedicationReservation._id">
        <td>{{ dedicationReservation._id }}</td>
        <td>{{ dedicationReservation.date }}</td>
        <td>{{ dedicationReservation.time }}</td>
        <td>{{ animators.find(e => e._id === dedicationReservation.customer_id)?.name }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
  name: 'ReservationView',
  data() {
    return {
      animateur: null,
    };
  },
  computed: {
    ...mapState('account', ['currentUser']),
    ...mapState('dedication', ['customerDedicationReservations', 'animators']),
  },
  methods: {
    ...mapActions('dedication', ['getCustomerDedicationReservations', 'getAnimators']),
  },
  watch: {
  },
  mounted() {
    this.getCustomerDedicationReservations(this.currentUser);
    this.getAnimators();
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