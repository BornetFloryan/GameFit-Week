<template>
  <div class="provider-dedication-home">
    <h1>Gestion des Dédicaces</h1>
    <button v-if="isShowDedicationDatesTableVisible === false" @click="showDedicationDatesTable">Voir les créneaux des animateurs</button>
    <button v-if="isShowCustomersDedicationTableVisible === false" @click="showCustomersDedicationTable">Voir les réservations clientes</button>
    <button v-if="isAddFormVisible === false" @click="showAddForm">Ajouter un créneaux de dédicace</button>
    <AdminAddDedicaceSlotForm v-if="isAddFormVisible" @addDedicaceSlot="addDedicaceSlot"></AdminAddDedicaceSlotForm>
    <AdminModifyDedicaceSlotForm v-if="isModifyFormVisible" :dedicationDate="selectedDedicationDate" @modifyDedicaceSlot="modifyDedicaceSlot"></AdminModifyDedicaceSlotForm>
    <table v-if="isShowDedicationDatesTableVisible">
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
      <tr v-for="dedicationDate in dedicationDates" :key="dedicationDate._id">
        <td>{{ dedicationDate._id }}</td>
        <td>{{ dedicationDate.date }}</td>
        <td>{{ dedicationDate.time }}</td>
        <td>{{ animators.find(e => e._id === dedicationDate.anim_id)?.name }}</td>
        <td>
          <button @click="showModifyForm(dedicationDate)">Modifier</button>
          <button @click="deleteDedicaceSlot(dedicationDate)">Supprimer</button>
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
  </div>
</template>
<script>
import {mapActions, mapState} from 'vuex';
import AdminAddDedicaceSlotForm from "@/components/admin/AdminAddDedicaceSlotForm.vue";
import AdminModifyDedicaceSlotForm from "@/components/admin/AdminModifyDedicaceSlotForm.vue";

export default {
  name: 'AdminDedicationManagement',
  components: {AdminAddDedicaceSlotForm, AdminModifyDedicaceSlotForm},
  data() {
    return {
      isShowDedicationDatesTableVisible: true,
      isShowCustomersDedicationTableVisible: false,
      isAddFormVisible: false,
      isModifyFormVisible: false,
      selectedDedicationDate: null,
    };
  },
  computed: {
    ...mapState('dedication', ['dedicationReservations', 'dedicationDates', 'animators']),
  },
  methods: {
    ...mapActions('dedication', ['addDedicationDates', 'deleteDedicationDates', 'modifyDedicationDates', 'getDedicationReservations', 'getDedicationDates', 'getAnimators']),
    showDedicationDatesTable() {
      this.isShowDedicationDatesTableVisible = true;
      this.isShowCustomersDedicationTableVisible = false;
      this.isAddFormVisible = false;
      this.isModifyFormVisible = false;
    },
    showCustomersDedicationTable() {
      this.isShowDedicationDatesTableVisible = false;
      this.isShowCustomersDedicationTableVisible = true;
      this.isAddFormVisible = false;
      this.isModifyFormVisible = false;
    },
    showAddForm() {
      this.isShowDedicationDatesTableVisible = false;
      this.isShowCustomersDedicationTableVisible = false;
      this.isAddFormVisible = true;
      this.isModifyFormVisible = false;
    },
    showModifyForm(dedicationDate) {
      this.selectedDedicationDate = dedicationDate;
      this.isShowDedicationDatesTableVisible = false;
      this.isShowCustomersDedicationTableVisible = false;
      this.isAddFormVisible = false;
      this.isModifyFormVisible = true;
    },
    async addDedicaceSlot(data) {
      try {
        await this.addDedicationDates(data);
        this.showDedicationDatesTable();
      } catch (error) {
        console.error('Erreur lors de l\'ajout du créneau de dédicace:', error);
        alert('Erreur lors de l\'ajout du créneau de dédicace');
      }
    },
    async modifyDedicaceSlot(data) {
      try {
        await this.modifyDedicationDates(data.dedicationDate);
        this.showDedicationDatesTable();
      } catch (error) {
        console.error('Erreur lors de la modification du créneau de dédicace:', error);
        alert('Erreur lors de la modification du créneau de dédicace');
      }
    },
    async deleteDedicaceSlot(dedicationDate) {
      try {
        await this.deleteDedicationDates(dedicationDate);
        this.showDedicationDatesTable();
      } catch (error) {
        console.error('Erreur lors de la suppression du créneau de dédicace:', error);
        alert('Erreur lors de la suppression du créneau de dédicace');
      }
    },
  },
  mounted() {
    this.getDedicationDates();
    this.getDedicationReservations();
    this.getAnimators();
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