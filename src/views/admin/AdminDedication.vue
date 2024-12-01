<template>
  <div class="admin-dedication">
    <h1>Gestion des Dédicaces</h1>
    <button v-if="isShowDedicationAvailableDatesTableVisible === false" @click="showDedicationAvailableDatesTable">Voir les créneaux des animateurs</button>
    <button v-if="isShowCustomersDedicationTableVisible === false" @click="showCustomersDedicationTable">Voir les réservations clientes</button>
    <button v-if="isAddFormVisible === false" @click="showAddForm">Ajouter un créneaux de dédicace</button>
    <AddDedicaceSlotForm v-if="isAddFormVisible" @addDedicaceSlot="addDedicaceSlot"></AddDedicaceSlotForm>
    <AdminModifyDedicaceSlotForm v-if="isModifyFormVisible" :availableDate="selectedAvailableDate" @modifyDedicaceSlot="modifyDedicaceSlot"></AdminModifyDedicaceSlotForm>
    <table v-if="isShowDedicationAvailableDatesTableVisible">
      <thead>
      <tr>
        <th>Numéro</th>
        <th>Date</th>
        <th>Horaire</th>
        <th>Animateur</th>
        <th>Opérations</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="availableDate in availableDates" :key="availableDate._id">
        <td>{{ availableDate._id }}</td>
        <td>{{ availableDate.$date }}</td>
        <td>{{ availableDate.times }}</td>
        <td>{{ animators.find(e => e._id === availableDate.anim_id)?.name }}</td>
        <td>
          <button @click="showModifyForm(availableDate)">Modifier</button>
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
        <th>Animateur</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="dedicationReservation in dedicationReservations" :key="dedicationReservation._id">
        <td>{{ dedicationReservation._id }}</td>
        <td>{{ dedicationReservation.date }}</td>
        <td>{{ dedicationReservation.time }}</td>
        <td>{{ dedicationReservation._idCustomer }}</td>
        <td>{{ animators.find(e => e._id === dedicationReservation.anim_id)?.name }}</td>
      </tr>
      </tbody>
    </table>
    <p>
    </p>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import AddDedicaceSlotForm from "@/components/admin/AddDedicaceSlotForm.vue";
import AdminModifyDedicaceSlotForm from "@/components/admin/AdminModifyDedicaceSlotForm.vue";

export default {
  name: 'AdminDedication',
  components: {AddDedicaceSlotForm, AdminModifyDedicaceSlotForm},
  data() {
    return {
      isShowDedicationAvailableDatesTableVisible: true,
      isShowCustomersDedicationTableVisible: false,
      isAddFormVisible: false,
      isModifyFormVisible: false,
      selectedAvailableDate: null,
    };
  },
  computed: {
    ...mapState('dedication', ['dedicationReservations', 'availableDates', 'animators']),
  },
  methods: {
    ...mapActions('dedication', ['addAvailableDate', 'deleteAvailableDate', 'modifyAvailableDate', 'getDedicationReservations', 'getAvailableDates', 'getAnimators']),
    showDedicationAvailableDatesTable() {
      this.isShowDedicationAvailableDatesTableVisible = true;
      this.isShowCustomersDedicationTableVisible = false;
      this.isAddFormVisible = false;
      this.isModifyFormVisible = false;
    },
    showCustomersDedicationTable() {
      this.isShowDedicationAvailableDatesTableVisible = false;
      this.isShowCustomersDedicationTableVisible = true;
      this.isAddFormVisible = false;
      this.isModifyFormVisible = false;
    },
    showAddForm() {
      this.isShowDedicationAvailableDatesTableVisible = false;
      this.isShowCustomersDedicationTableVisible = false;
      this.isAddFormVisible = true;
      this.isModifyFormVisible = false;
    },
    showModifyForm(availableDate) {
      this.selectedAvailableDate = availableDate;
      this.isShowDedicationAvailableDatesTableVisible = false;
      this.isShowCustomersDedicationTableVisible = false;
      this.isAddFormVisible = false;
      this.isModifyFormVisible = true;
    },
    async addDedicaceSlot(data) {
      try {
        await this.addAvailableDate(data);
        this.showDedicationAvailableDatesTable();
      } catch (error) {
        console.error('Erreur lors de l\'ajout du créneau de dédicace:', error);
        alert('Erreur lors de l\'ajout du créneau de dédicace');
      }
    },
    async modifyDedicaceSlot(data) {
      try {
        await this.modifyAvailableDate(data.availableDate);
        this.showDedicationAvailableDatesTable();
      } catch (error) {
        console.error('Erreur lors de la modification du créneau de dédicace:', error);
        alert('Erreur lors de la modification du créneau de dédicace');
      }
    },
    async deleteDedicaceSlot(availableDate) {
      try {
        await this.deleteAvailableDate(availableDate);
        this.showDedicationAvailableDatesTable();
      } catch (error) {
        console.error('Erreur lors de la suppression du créneau de dédicace:', error);
        alert('Erreur lors de la suppression du créneau de dédicace');
      }
    },
  },
  mounted() {
    this.getAvailableDates();
    this.getDedicationReservations();
    this.getAnimators();
  },
};
</script>

<style scoped>
.admin-dedication {
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