<template>
  <div class="provider-dedication-home">
    <h1>Gestion des Dédicaces</h1>
    <button v-if="isShowDedicationDatesTableVisible === false" @click="showDedicationDatesTable">Voir vos créneaux de dédicaces</button>
    <button v-if="isShowCustomersDedicationTableVisible === false" @click="showCustomersDedicationTable">Voir les réservations clientes</button>
    <button v-if="isAddFormVisible === false" @click="showAddForm">Ajouter un créneaux de dédicace</button>
    <ProviderAddDedicaceSlotForm v-if="isAddFormVisible" @addDedicaceSlot="addDedicaceSlot"></ProviderAddDedicaceSlotForm>
    <table v-if="isShowDedicationDatesTableVisible">
      <thead>
      <tr>
        <th>Numéro</th>
        <th>Date</th>
        <th>Horaire</th>
        <th>Opérations</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="providerDedicationDate in providerDedicationDates" :key="providerDedicationDate._id">
        <td>{{ providerDedicationDate._id }}</td>
        <td>{{ formatDate(providerDedicationDate.date) }}</td>
        <td>{{ providerDedicationDate.time }}</td>
        <td>
          <button @click="deleteDedicaceSlot(providerDedicationDate)">Supprimer</button>
        </td>
      </tr>
      </tbody>
    </table>
    {{providerDedicationDates}}

    <table v-if="isShowCustomersDedicationTableVisible">
      <thead>
      <tr>
        <th>Numéro</th>
        <th>Date</th>
        <th>Horaire</th>
        <th>Ticket</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="dedicationReservation in providerDedicationReservations" :key="dedicationReservation._id">
        <td>{{ dedicationReservation._id }}</td>
        <td>{{ formatDate(dedicationReservation.date) }}</td>
        <td>{{ dedicationReservation.time }}</td>
        <td>{{ dedicationReservation.ticket_id }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import ProviderAddDedicaceSlotForm from "@/components/prestataire/ProviderAddDedicaceSlotForm.vue";

export default {
  name: 'ProviderDedicationManagement',
  components: {ProviderAddDedicaceSlotForm},
  data() {
    return {
      providerDedicationDates: [],
      providerDedicationReservations: [],
      isShowDedicationDatesTableVisible: true,
      isShowCustomersDedicationTableVisible: false,
      isAddFormVisible: false,
      selectedDedicationDate: null,
    };
  },
  computed: {
    ...mapState('dedication', ['dedicationReservations', 'dedicationDates']),
    ...mapState('account', ['currentUser']),
  },
  methods: {
    ...mapActions('dedication', ['addDedicationDates', 'deleteDedicationDates', 'getDedicationReservations', 'getDedicationDates']),
    showDedicationDatesTable() {
      this.isShowDedicationDatesTableVisible = true;
      this.isShowCustomersDedicationTableVisible = false;
      this.isAddFormVisible = false;
    },
    showCustomersDedicationTable() {
      this.isShowDedicationDatesTableVisible = false;
      this.isShowCustomersDedicationTableVisible = true;
      this.isAddFormVisible = false;
    },
    showAddForm() {
      this.isShowDedicationDatesTableVisible = false;
      this.isShowCustomersDedicationTableVisible = false;
      this.isAddFormVisible = true;
      this.isModifyFormVisible = false;
    },
    async addDedicaceSlot(data) {
      try {
        await this.addDedicationDates(data);
        await this.getDedicationDates();
        this.providerDedicationDates = this.dedicationDates.filter(e => e.customer_id === this.currentUser._id);
        this.showDedicationDatesTable();
      } catch (error) {
        console.error('Erreur lors de l\'ajout du créneau de dédicace:', error);
        alert('Erreur lors de l\'ajout du créneau de dédicace');
      }
    },
    async deleteDedicaceSlot(dedicationDate) {
      try {
        await this.deleteDedicationDates(dedicationDate);
        this.providerDedicationDates = this.dedicationDates.filter(e => e.customer_id === this.currentUser._id);
        this.showDedicationDatesTable();
      } catch (error) {
        console.error('Erreur lors de la suppression du créneau de dédicace:', error);
        alert('Erreur lors de la suppression du créneau de dédicace');
      }
    },
    formatDate(date) {
      const options = {year: 'numeric', month: 'long', day: 'numeric'};
      return new Date(date).toLocaleDateString('fr-FR', options);
    }
  },
  async mounted() {
    await this.getDedicationReservations();
    await this.getDedicationDates();
    this.providerDedicationDates = this.dedicationDates.filter(e => e.customer_id === this.currentUser._id);
    this.providerDedicationReservations = this.dedicationReservations.filter(e => e.customer_id === this.currentUser._id);
  },
};
</script>

<style scoped>
.provider-dedication-home {
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