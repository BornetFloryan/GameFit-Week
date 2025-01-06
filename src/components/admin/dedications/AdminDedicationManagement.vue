<template>
  <div class="provider-dedication-home">
    <router-link :to="{ name: 'admin-dedication-reservation'}">
      <button class="btn-action">Voir toutes les réservations</button>
    </router-link>
    <router-link to="/admin-dashboard/admin-dedication-add">
      <button class="btn-action">Ajouter un créneau de dédicace</button>
    </router-link>
    <AdminTable
        :title="title"
        :headers="headers"
        :fields="fields"
        :modifyName="modifyName"
        :showModifyButton="true"
        :modifyButtonText="'Modifier'"
        :showReservationsButton="enableRes"
        :reservationsButtonText="'Voir les réservations'"
        :reservationsRouteName="'admin-dedication-reservation'"
        :reservationsQueryParams="(item) => ({ stands_reservations_id: item._id })"
        :showDeleteButton="enableDelete"
        :deleteButtonText="'Supprimer'"
        @delete="handleDeleteButton"
        :dataSource="dataSource"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import AdminTable from "@/components/admin/AdminTable.vue";

export default {
  name: 'AdminDedicationManagement',
  components: { AdminTable },
  data() {
    return {
      title: "Gestion des dédicaces",
      headers: ['Numéro', 'Date', 'Heure de début', 'Heure de fin', 'Description', 'Prestataire', 'Service', 'Stand'],
      fields: ['_id', 'date', 'start_time', 'end_time', 'description', 'customer_id', 'service_id', 'stand_id'],
      modifyName: 'admin-dedication-edit',
      enableRes: true,
      enableDelete: true,
      dataSource: [],
    };
  },
  computed: {
    ...mapState('stands', ['standsReservations']),
    ...mapGetters('stands', ['getStandReservationsByStandId', 'getStandsReservationsByServiceId']),
  },
  methods: {
    ...mapActions('stands', ['getStands', 'getStandsReservations', 'deleteStandReservation']),
    ...mapActions('account', ['getCustomersAccounts', 'getProviderRequests']),
    ...mapActions('prestation', ['getServiceCategories', "getProviderServiceCategories"]),

    async handleDeleteButton(id) {
      if (confirm('Voulez-vous vraiment supprimer cette réservation ?')) {
        await this.deleteStandReservation(id);
        this.filterReservations();
      }
    },
    filterReservations() {
      if (this.$route.query.stand_id) {
        this.dataSource = this.getStandReservationsByStandId(this.$route.query.stand_id);
      } else {
        this.dataSource = this.getStandsReservationsByServiceId('0');
      }
    }
  },
  async mounted() {
    await this.getCustomersAccounts();
    await this.getStands();
    await this.getStandsReservations();
    await this.getProviderRequests();
    await this.getServiceCategories();
    await this.getProviderServiceCategories();
    this.filterReservations();
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

button:hover {
  background-color: #0056b3;
}

.btn-action {
  padding: 0.5em 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.3s ease;
  margin-bottom: 1em;
  margin-right: 1em;
}

.btn-action:hover {
  background-color: #0056b3;
}
</style>