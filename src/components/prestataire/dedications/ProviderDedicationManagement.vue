<template>
  <div class="provider-dedication-home">
    <div>
      <label>
        <input type="radio" v-model="serviceStatus" value="1" @change="toggleServiceStatus"> Activer le service
      </label>
      <label>
        <input type="radio" v-model="serviceStatus" value="0" @change="toggleServiceStatus"> Désactiver le service
      </label>
    </div>
    <div v-if="serviceStatus === '1'">
      <router-link :to="{ name: 'provider-dedication-reservation'}">
        <button class="btn-action">Voir toutes les réservations</button>
      </router-link>
      <router-link to="/provider-dashboard/provider-dedication-add">
        <button class="btn-action">Ajouter un créneau de dédicace</button>
      </router-link>
      <AdminTable
          :title="title"
          :headers="headers"
          :fields="fields"
          :modifyName="modifyName"
          :showModifyButton="false"
          :modifyButtonText="'Modifier'"
          :showReservationsButton="enableRes"
          :reservationsButtonText="'Voir les réservations'"
          :reservationsRouteName="'provider-dedication-reservation'"
          :reservationsQueryParams="(item) => ({ stand_reservation_id: item._id })"
          :showDeleteButton="enableDelete"
          :deleteButtonText="'Supprimer'"
          @delete="handleDeleteButton"
          :dataSource="dataSource"
      />
    </div>
    <div v-else>
      <p>Le service est désactivé.</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import AdminTable from "@/components/admin/AdminTable.vue";

export default {
  name: 'ProviderDedicationManagement',
  components: { AdminTable },
  data() {
    return {
      title: "Gestion des dédicaces",
      headers: ['Numéro', 'Date', 'Heure de début', 'Heure de fin', 'Description', 'Prestataire', 'Service', 'Stand'],
      fields: ['_id', 'date', 'start_time', 'end_time', 'description', 'customer_id', 'service_id', 'stand_id'],
      modifyName: '',
      enableRes: true,
      enableDelete: true,
      dataSource: [],
      providerServiceCategory: {},
      serviceStatus: '0',
    };
  },
  computed: {
    ...mapState('stands', ['standsReservations']),
    ...mapState('account', ['currentUser']),
    ...mapState('prestation', ['serviceReservations', "providerServiceCategories"]),
    ...mapGetters('stands', ['getStandReservationsByStandId', 'getStandsReservationsByServiceId', 'getStandsReservationsByCustomerIdAndServiceId']),
    ...mapGetters('prestation', ["getProviderServiceCategoriesByCustomerIdAndServiceID"]),
  },
  methods: {
    ...mapActions('stands', ['getStands', 'getStandsReservations', 'deleteStandReservation']),
    ...mapActions('account', ['getCustomersAccounts', 'getProviderRequests']),
    ...mapActions('prestation', ['getServiceCategories', "getProviderServiceCategories", 'updateProviderServiceCategoryState']),

    async handleDeleteButton(id) {
      if (confirm('Voulez-vous vraiment supprimer cette réservation ?')) {
        await this.deleteStandReservation({ _id: id });
        this.filterReservations();
      }
    },

    filterReservations() {
      if (this.$route.query.stand_id) {
        this.dataSource = this.getStandReservationsByStandId(this.$route.query.stand_id);
      } else {
        this.dataSource = this.getStandsReservationsByCustomerIdAndServiceId(this.currentUser._id, '0');
      }
    },

    async toggleServiceStatus() {
      try {
        this.providerServiceCategory.state = this.serviceStatus;
        await this.updateProviderServiceCategoryState(this.providerServiceCategory);
        alert(`Service ${this.serviceStatus === '1' ? 'activé' : 'désactivé'} avec succès`);
      } catch (e) {
        alert('Erreur lors de la mise à jour du statut du service');
      }
    },
  },
  async mounted() {
    await this.getCustomersAccounts();
    await this.getStands();
    await this.getStandsReservations();
    await this.getProviderRequests();
    await this.getServiceCategories();
    await this.getProviderServiceCategories();
    this.providerServiceCategory = this.getProviderServiceCategoriesByCustomerIdAndServiceID(this.currentUser._id, '0');
    this.serviceStatus = this.providerServiceCategory.state;
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