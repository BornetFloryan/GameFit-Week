<template>
  <div>
    <router-link :to="{ name: 'admin-stand-management' }">
      <button class="btn-action">Retour à la gestion des stands</button>
    </router-link>
    <router-link v-if="this.$route.query.stand_id" :to="{ name: 'admin-stand-reservation'}">
      <button class="btn-action">Voir toutes les réservations</button>
    </router-link>
    <router-link to="/admin-dashboard/admin-add-stand-reservation">
      <button class="btn-action">Ajouter une réservation</button>
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
        :showDeleteButton="enableDelete"
        :deleteButtonText="'Supprimer'"
        @delete="handleDeleteButton"
        :dataSource="dataSource"
    />
  </div>
</template>

<script>
import AdminTable from "@/components/admin/AdminTable.vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: 'AdminStandReservation',
  components: { AdminTable },
  data() {
    return {
      title: "Gestion des réservation des stands",
      headers: ['Numéro', 'Date', 'Heure de début', 'Heure de fin', 'Description', 'Prestataire', 'Service', 'Stand'],
      fields: ['_id', 'date', 'start_time', 'end_time', 'description', 'customer_id', 'service_id', 'stand_id'],
      modifyName: 'admin-stand-reservation-edit',
      enableRes: false,
      enableDelete: true,
      dataSource: [],
    };
  },
  computed: {
    ...mapState('stands', ['standsReservations']),
    ...mapState('account', ['currentUser']),
    ...mapGetters('stands', ['getStandReservationsByStandId']),
  },
  methods: {
    ...mapActions('stands', ['getStandsReservations', 'deleteStandReservation']),
    ...mapActions('account', ['getCustomersAccounts', 'getProviderRequests']),
    ...mapActions('prestation', ['getServiceCategories']),

    async handleDeleteButton(id) {
      if (confirm('Voulez-vous vraiment supprimer cette réservation ?')) {
        await this.deleteStandReservation({ _id: id });
        await this.getStandsReservations();
      }
    },
    filterReservations() {
      if (this.$route.query.stand_id) {
        this.dataSource = this.getStandReservationsByStandId(this.$route.query.stand_id);
      } else {
        this.dataSource = this.standsReservations;
      }
    }
  },
  async mounted() {
    await this.getCustomersAccounts();
    await this.getStandsReservations();
    await this.getProviderRequests();
    await this.getServiceCategories();
    this.filterReservations();
  },
};
</script>

<style scoped>
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