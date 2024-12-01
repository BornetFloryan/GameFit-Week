<template>
  <div class="admin-dedication">
    <h1>Gestion des Dédicaces</h1>
    <button v-if="isShowDedicationAvailableDatesTableVisible === false" @click="showDedicationAvailableDatesTable">Voir les créneaux des animateurs</button>
    <button v-if="isShowCustomersDedicationTableVisible === false" @click="showCustomersDedicationTable">Voir les réservations clientes</button>
    <button v-if="isAddFormVisible === false" @click="showAddForm">Ajouter un créneaux de dédicace</button>
    <AddDedicaceSlotForm v-if="isAddFormVisible"></AddDedicaceSlotForm>
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
          <button>Modifier</button>
          <button>Supprimer</button>
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

export default {
  name: 'AdminDedication',
  components: {AddDedicaceSlotForm},
  data() {
    return {
      isShowDedicationAvailableDatesTableVisible: true,
      isShowCustomersDedicationTableVisible: false,
      isAddFormVisible: false,
    };
  },
  computed: {
    ...mapState('dedication', ['dedicationReservations', 'availableDates', 'animators']),
  },
  methods: {
    ...mapActions('dedication', ['getDedicationReservations', 'getAvailableDates', 'getAnimators']),
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
    },
  },
  watch: {
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
</style>