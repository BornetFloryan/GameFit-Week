<template>
  <div>
    <router-link :to="{ name: 'admin-dedication' }">
      <button class="btn-action">Retour à la gestion des dédicaces</button>
    </router-link>
    <router-link v-if="this.$route.query.stand_reservation_id" :to="{ name: 'admin-dedication-reservation'}">
      <button class="btn-action">Voir toutes les réservations de dédicaces</button>
    </router-link>
    <router-link to="/admin-dashboard/admin-dedication-reservation-add">
      <button class="btn-action">Ajouter une réservation de dédicace</button>
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
  name: 'AdminDedicationReservation',
  components: { AdminTable },
  data() {
    return {
      title: "Gestion des réservations de dédicace",
      headers: ['Numéro', 'Date', 'Heure', 'Numéro de ticket', 'Numéro de service', 'Numéro de réservation de stand'],
      fields: ['_id', 'date', 'time', 'ticket_id', 'service_id', 'stand_reservation_id'],
      modifyName: 'admin-dedication-reservation-edit',
      enableRes: false,
      enableDelete: true,
      dataSource: [],
    };
  },
  computed: {
    ...mapState('prestation', ['serviceReservations']),
    ...mapGetters('prestation', ['getServiceReservationByServiceId', 'getServiceReservationsByStandsReservationsIdAndServiceId']),
  },
  methods: {
    ...mapActions('account', ['getCustomersAccounts', 'getProviderRequests']),
    ...mapActions('prestation', ['getServiceCategories', 'getServiceReservations', 'deleteServiceReservation']),

    async handleDeleteButton(id) {
      if (confirm('Voulez-vous vraiment supprimer cette réservation ?')) {
        try {
          let response = await this.deleteServiceReservation(id);
          if (response.error !== 0) {
            alert(response.data);
          } else {
            // Update the dataSource after successful deletion
            this.filterReservations();
          }
        } catch (e) {
          alert('Impossible de supprimer cette réservation');
        }
      }
    },

    filterReservations() {
      if (this.$route.query.stand_reservation_id) {
        this.dataSource = this.getServiceReservationsByStandsReservationsIdAndServiceId(this.$route.query.stand_reservation_id, '0');
      } else {
        this.dataSource = this.getServiceReservationByServiceId('0');
      }
    }
  },
  async mounted() {
    await this.getCustomersAccounts();
    await this.getProviderRequests();
    await this.getServiceCategories();
    await this.getServiceReservations();
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