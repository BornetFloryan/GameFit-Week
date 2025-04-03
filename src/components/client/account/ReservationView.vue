<template>
  <div class="ticket-view">
    <table>
      <thead>
      <tr>
        <th>{{ $t('reservationView.number') }}</th>
        <th>{{ $t('reservationView.host') }}</th>
        <th>{{ $t('reservationView.stand') }}</th>
        <th>{{ $t('reservationView.service') }}</th>
        <th>{{ $t('reservationView.date') }}</th>
        <th>{{ $t('reservationView.time') }}</th>
        <th>{{ $t('reservationView.operation') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="customerServiceReservation in customerServiceReservations" :key="customerServiceReservation._id">
        <td>{{ customerServiceReservation._id }}</td>
        <td>
          {{
            getCustomerById(getStandReservationById(customerServiceReservation.stand_reservation_id)?.customer_id)?.name
          }}
        </td>
        <td>
          Stand {{
            Number(getStandReservationById(customerServiceReservation.stand_reservation_id)?.stand_id) + 1
          }}
        </td>
        <td>
          {{
            getServiceCategoryById(customerServiceReservation.service_id)
                ? $t(`service_categories.${getServiceCategoryById(customerServiceReservation.service_id).name.toLowerCase()}`)
                : 'Unknown'
          }}
        </td>
        <td>{{ customerServiceReservation.date }}</td>
        <td>{{ customerServiceReservation.time }}</td>
        <td>
          <button @click="cancelServiceReservation(customerServiceReservation._id)">
            {{ $t('reservationView.cancel') }}
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex';

export default {
  name: 'ReservationView',
  data() {
    return {
      customerTickets: [],
      customerServiceReservations: [],
      animateur: null,
    };
  },
  computed: {
    ...mapState('account', ['currentUser']),
    ...mapState('prestation', ['serviceReservations']),
    ...mapGetters('account', ['getCustomerById']),
    ...mapGetters('prestation', ['getServiceReservationsByTicketId', 'getServiceCategoryById']),
    ...mapGetters('stands', ['getStandReservationById']),
    ...mapGetters('ticket', ['getTicketsByCustomerId']),
  },
  methods: {
    ...mapActions('prestation', ['getServiceReservations', 'getServiceCategories', 'deleteServiceReservation']),
    ...mapActions('stands', ['getStandsReservations']),
    ...mapActions('ticket', ['getTickets']),
    ...mapActions('account', ['getCustomersAccounts']),

    async cancelServiceReservation(id) {
      try {
        let response = await this.deleteServiceReservation(id);
        if (response.error !== 0) {
          console.error(response.message);
        } else {
          await this.getServiceReservations();
          this.customerServiceReservations = this.customerTickets.flatMap(ticket =>
              this.getServiceReservationsByTicketId(ticket._id)
          );
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
  async mounted() {
    await this.getCustomersAccounts();

    await this.getTickets();
    this.customerTickets = this.getTicketsByCustomerId(this.currentUser._id);

    await this.getServiceReservations();
    this.customerServiceReservations = this.customerTickets.flatMap(ticket =>
        this.getServiceReservationsByTicketId(ticket._id)
    );

    await this.getStandsReservations();
    await this.getServiceCategories();
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