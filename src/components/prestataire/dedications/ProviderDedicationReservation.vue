<template>
  <div>
    <router-link :to="{ name: 'provider-dedication' }">
      <button class="btn-action">Retour à la gestion des dédicaces</button>
    </router-link>
    <router-link v-if="this.$route.query.stands_reservations_id" :to="{ name: 'provider-dedication-reservation'}">
      <button class="btn-action">Voir toutes les réservations de dédicaces</button>
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
  name: 'ProviderDedicationReservation',
  components: { AdminTable },
  data() {
    return {
      title: "Gestion des réservations de dédicace",
      headers: ['Numéro', 'Date', 'Heure', 'Numéro de ticket', 'Numéro de service', 'Numéro de réservation de stand'],
      fields: ['_id', 'date', 'time', 'ticket_id', 'service_id', 'stands_reservations_id'],
      modifyName: '',
      enableRes: false,
      enableDelete: true,
      dataSource: [],
    };
  },
  computed: {
    ...mapState('prestation', ['serviceReservations']),
    ...mapState('account', ['currentUser']),
    ...mapGetters('prestation', ['getServiceReservationsByStandsReservationsIdAndServiceId']),
    ...mapGetters('stands', ['getStandsReservationsByCustomerIdAndServiceId']),
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
            this.filterReservations();
          }
        } catch (e) {
          alert('Impossible de supprimer cette réservation');
        }
      }
    },

    filterReservations() {
      if (this.$route.query.stands_reservations_id) {
        this.dataSource = this.getServiceReservationsByStandsReservationsIdAndServiceId(this.$route.query.stands_reservations_id, '0');
      } else {
        const userStandsReservations = this.getStandsReservationsByCustomerIdAndServiceId(this.currentUser._id, '0');
        console.log(userStandsReservations);
        this.dataSource = userStandsReservations.flatMap(reservation =>
            this.getServiceReservationsByStandsReservationsIdAndServiceId(reservation._id, '0')
        );
      }
    },
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