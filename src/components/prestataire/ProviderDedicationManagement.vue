<template>
  <div class="provider-dedication-home">
    <h1>Gestion des Dédicaces</h1>
    <button v-if="isShowDedicationAvailableDatesTableVisible === false" @click="showDedicationAvailableDatesTable">Voir vos créneaux de dédicaces</button>
    <button v-if="isShowCustomersDedicationTableVisible === false" @click="showCustomersDedicationTable">Voir les réservations clientes</button>
    <button v-if="isAddFormVisible === false" @click="showAddForm">Ajouter un créneaux de dédicace</button>
    <ProviderAddDedicaceSlotForm v-if="isAddFormVisible" @addDedicaceSlot="addDedicaceSlot"></ProviderAddDedicaceSlotForm>
    <table v-if="isShowDedicationAvailableDatesTableVisible">
      <thead>
      <tr>
        <th>Numéro</th>
        <th>Date</th>
        <th>Horaire</th>
        <th>Opérations</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="availableDate in providerAvailableDates" :key="availableDate._id">
        <td>{{ availableDate._id }}</td>
        <td>{{ formatDate(availableDate.date) }}</td>
        <td>{{ availableDate.times }}</td>
        <td>
          <button @click="deleteDedicaceSlot(availableDate)">Supprimer</button>
        </td>
      </tr>
      </tbody>
    </table>

    <table v-if="isShowCustomersDedicationTableVisible">
      <thead>
      <tr>
        <th>Numéro</th>
        <th>Date</th>
        <th>Horaire</th>
        <th>Client</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="dedicationReservation in providerAvailableDates" :key="dedicationReservation._id">
        <td>{{ dedicationReservation._id }}</td>
        <td>{{ formatDate(dedicationReservation.date) }}</td>
        <td>{{ dedicationReservation.time }}</td>
        <td>{{ dedicationReservation._idCustomer }}</td>
      </tr>
      </tbody>
    </table>
    {{providerAvailableDates}}
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
      providerAvailableDates: [],
      providerDedicationReservations: [],
      isShowDedicationAvailableDatesTableVisible: true,
      isShowCustomersDedicationTableVisible: false,
      isAddFormVisible: false,
      selectedAvailableDate: null,
    };
  },
  computed: {
    ...mapState('dedication', ['dedicationReservations', 'dedicationDates']),
    ...mapState('account', ['currentUser']),
  },
  methods: {
    ...mapActions('dedication', ['addDedicationDates', 'deleteDedicationDates', 'getDedicationReservations', 'getDedicationDates']),
    showDedicationAvailableDatesTable() {
      this.isShowDedicationAvailableDatesTableVisible = true;
      this.isShowCustomersDedicationTableVisible = false;
      this.isAddFormVisible = false;
    },
    showCustomersDedicationTable() {
      this.isShowDedicationAvailableDatesTableVisible = false;
      this.isShowCustomersDedicationTableVisible = true;
      this.isAddFormVisible = false;
    },
    showAddForm() {
      this.isShowDedicationAvailableDatesTableVisible = false;
      this.isShowCustomersDedicationTableVisible = false;
      this.isAddFormVisible = true;
      this.isModifyFormVisible = false;
    },
    async addDedicaceSlot(data) {
      try {
        await this.addDedicationDates(data);
        await this.getDedicationDates();
        this.providerAvailableDates = this.availableDates.filter(e => e.anim_id === this.currentUser._id);
        this.showDedicationAvailableDatesTable();
      } catch (error) {
        console.error('Erreur lors de l\'ajout du créneau de dédicace:', error);
        alert('Erreur lors de l\'ajout du créneau de dédicace');
      }
    },
    async deleteDedicaceSlot(availableDate) {
      try {
        await this.deleteDedicationDates(availableDate);
        await this.getDedicationDates();
        this.providerAvailableDates = this.availableDates.filter(e => e.anim_id === this.currentUser._id);
        this.showDedicationAvailableDatesTable();
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
    this.providerAvailableDates = this.availableDates.filter(e => e.anim_id === this.currentUser._id);
    this.providerDedicationReservations = this.dedicationReservations.filter(e => e.anim_id === this.currentUser._id);
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