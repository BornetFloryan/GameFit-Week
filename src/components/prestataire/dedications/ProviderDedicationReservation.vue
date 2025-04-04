<template>
  <div>
    <router-link :to="{ name: 'provider-dedication' }">
      <button class="btn-action">{{ $t('providerDedicationReservation.backToManagement') }}</button>
    </router-link>
    <router-link v-if="this.$route.query.stand_reservation_id" :to="{ name: 'provider-dedication-reservation'}">
      <button class="btn-action">{{ $t('providerDedicationReservation.viewAllReservations') }}</button>
    </router-link>
    <AdminTable
        :title="$t('providerDedicationReservation.title')"
        :headers="translatedHeaders"
        :fields="fields"
        :modifyName="modifyName"
        :showModifyButton="false"
        :modifyButtonText="$t('providerDedicationReservation.modify')"
        :showReservationsButton="enableRes"
        :reservationsButtonText="$t('providerDedicationReservation.viewReservations')"
        :showDeleteButton="enableDelete"
        :deleteButtonText="$t('providerDedicationReservation.delete')"
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
      fields: ['_id', 'date', 'time', 'ticket_id', 'service_id', 'stand_reservation_id'],
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
    translatedHeaders() {
      return [
        this.$t('providerDedicationReservation.number'),
        this.$t('providerDedicationReservation.date'),
        this.$t('providerDedicationReservation.time'),
        this.$t('providerDedicationReservation.ticketNumber'),
        this.$t('providerDedicationReservation.serviceNumber'),
        this.$t('providerDedicationReservation.standReservationNumber')
      ];
    }
  },
  methods: {
    ...mapActions('account', ['getCustomersAccounts', 'getProviderRequests']),
    ...mapActions('prestation', ['getServiceCategories', 'getServiceReservations', 'deleteServiceReservation']),

    async handleDeleteButton(id) {
      if (confirm(this.$t('providerDedicationReservation.deleteConfirmation'))) {
        try {
          let response = await this.deleteServiceReservation(id);
          if (response.error !== 0) {
            alert(response.data);
          } else {
            this.filterReservations();
          }
        } catch (e) {
          alert(this.$t('providerDedicationReservation.deleteError'));
        }
      }
    },

    filterReservations() {
      if (this.$route.query.stand_reservation_id) {
        this.dataSource = this.getServiceReservationsByStandsReservationsIdAndServiceId(this.$route.query.stand_reservation_id, '0');
      } else {
        const userStandsReservations = this.getStandsReservationsByCustomerIdAndServiceId(this.currentUser._id, '0');
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