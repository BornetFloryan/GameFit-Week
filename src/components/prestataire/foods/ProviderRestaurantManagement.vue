<template>
  <div class="provider-restaurant-home">
    <div>
      <label>
        <input type="radio" v-model="serviceStatus" value="1" @change="toggleServiceStatus"> Activer le service
      </label>
      <label>
        <input type="radio" v-model="serviceStatus" value="0" @change="toggleServiceStatus"> Désactiver le service
      </label>
    </div>
    <h1>Gestion des Réservations de Restaurant</h1>
    <button v-if="isShowReservationDatesTableVisible === false" @click="showReservationDatesTable">Voir vos créneaux de réservation</button>
    <button v-if="isShowCustomersReservationTableVisible === false" @click="showCustomersReservationTable">Voir les réservations clients</button>
    <button v-if="isAddFormVisible === false" @click="showAddForm">Ajouter un créneau de réservation</button>
    <ProviderAddReservationSlotForm v-if="isAddFormVisible" @addReservationSlot="addReservationSlot"></ProviderAddReservationSlotForm>
    <table v-if="isShowReservationDatesTableVisible">
      <thead>
      <tr>
        <th>Numéro</th>
        <th>Date</th>
        <th>Horaire</th>
        <th>Opérations</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="providerReservationDate in providerReservationDates" :key="providerReservationDate._id">
        <td>{{ providerReservationDate._id }}</td>
        <td>{{ formatDate(providerReservationDate.date) }}</td>
        <td>{{ providerReservationDate.time }}</td>
        <td>
          <button @click="deleteReservationSlot(providerReservationDate)">Supprimer</button>
        </td>
      </tr>
      </tbody>
    </table>

    <table v-if="isShowCustomersReservationTableVisible">
      <thead>
      <tr>
        <th>Numéro</th>
        <th>Date</th>
        <th>Horaire</th>
        <th>Ticket</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="reservation in providerReservations" :key="reservation._id">
        <td>{{ reservation._id }}</td>
        <td>{{ formatDate(reservation.date) }}</td>
        <td>{{ reservation.time }}</td>
        <td>{{ reservation.ticket_id }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';


export default {
  name: 'ProviderRestaurantManagement',
  components: { },
  data() {
    return {
      providerReservationDates: [],
      providerReservations: [],
      isShowReservationDatesTableVisible: true,
      isShowCustomersReservationTableVisible: false,
      isAddFormVisible: false,
      selectedReservationDate: null,
      providerServiceCategory: {},
      serviceStatus: '1',
    };
  },
  computed: {
    ...mapState('restaurant', ['reservations', 'reservationDates']),
    ...mapState('account', ['currentUser']),
  },
  methods: {
    ...mapActions('restaurant', ['addReservationDates', 'deleteReservationDates', 'getReservations', 'getReservationDates']),
    showReservationDatesTable() {
      this.isShowReservationDatesTableVisible = true;
      this.isShowCustomersReservationTableVisible = false;
      this.isAddFormVisible = false;
    },
    showCustomersReservationTable() {
      this.isShowReservationDatesTableVisible = false;
      this.isShowCustomersReservationTableVisible = true;
      this.isAddFormVisible = false;
    },
    showAddForm() {
      this.isShowReservationDatesTableVisible = false;
      this.isShowCustomersReservationTableVisible = false;
      this.isAddFormVisible = true;
    },
    async addReservationSlot(data) {
      try {
        await this.addReservationDates(data);
        await this.getReservationDates();
        this.providerReservationDates = this.reservationDates.filter(e => e.provider_id === this.currentUser._id);
        this.showReservationDatesTable();
      } catch (error) {
        console.error('Erreur lors de l\'ajout du créneau de réservation:', error);
        alert('Erreur lors de l\'ajout du créneau de réservation');
      }
    },
    async deleteReservationSlot(reservationDate) {
      try {
        await this.deleteReservationDates(reservationDate);
        this.providerReservationDates = this.reservationDates.filter(e => e.provider_id === this.currentUser._id);
        this.showReservationDatesTable();
      } catch (error) {
        console.error('Erreur lors de la suppression du créneau de réservation:', error);
        alert('Erreur lors de la suppression du créneau de réservation');
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('fr-FR', options);
    },
    async toggleServiceStatus() {
      try {
        this.providerServiceCategory.state = this.serviceStatus;
        await this.updateProviderServiceCategoryState({ customer_id: this.currentUser._id, status: this.serviceStatus });
        alert(`Service ${this.serviceStatus === '1' ? 'activé' : 'désactivé'} avec succès`);
      } catch (e) {
        alert('Erreur lors de la mise à jour du statut du service');
      }
    },
  },
  async mounted() {
    await this.getReservations();
    await this.getReservationDates();
    this.providerReservationDates = this.reservationDates.filter(e => e.provider_id === this.currentUser._id);
    this.providerReservations = this.reservations.filter(e => e.provider_id === this.currentUser._id);
    this.providerServiceCategory = this.getProviderServiceCategoriesByCustomerIdAndServiceID(this.currentUser._id, '2');
    this.serviceStatus = this.providerServiceCategory.state;
  },
};
</script>

<style scoped>
.provider-restaurant-home {
  display: flex;
  flex-direction: column;
}

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

button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>
