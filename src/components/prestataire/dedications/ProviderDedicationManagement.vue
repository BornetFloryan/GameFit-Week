<template>
  <div class="provider-dedication-home">
    <div>
      <label>
        <input type="radio" v-model="serviceStatus" value="1" @change="toggleServiceStatus"> {{ $t('providerDedicationManagement.activateService') }}
      </label>
      <label>
        <input type="radio" v-model="serviceStatus" value="0" @change="toggleServiceStatus"> {{ $t('providerDedicationManagement.deactivateService') }}
      </label>
    </div>
    <div v-if="serviceStatus === '1'">
      <router-link :to="{ name: 'provider-dedication-reservation'}">
        <button class="btn-action">{{ $t('providerDedicationManagement.viewAllReservations') }}</button>
      </router-link>
      <router-link to="/provider-dashboard/provider-dedication-add">
        <button class="btn-action">{{ $t('providerDedicationManagement.addDedicationSlot') }}</button>
      </router-link>
      <AdminTable
          :title="$t('providerDedicationManagement.title')"
          :headers="translatedHeaders"
          :fields="fields"
          :modifyName="modifyName"
          :showModifyButton="false"
          :modifyButtonText="$t('providerDedicationManagement.modify')"
          :showReservationsButton="enableRes"
          :reservationsButtonText="$t('providerDedicationManagement.viewReservations')"
          :reservationsRouteName="'provider-dedication-reservation'"
          :reservationsQueryParams="(item) => ({ stand_reservation_id: item._id })"
          :showDeleteButton="enableDelete"
          :deleteButtonText="$t('providerDedicationManagement.delete')"
          @delete="handleDeleteButton"
          :dataSource="dataSource"
      />
    </div>
    <div v-else>
      <p>{{ $t('providerDedicationManagement.serviceDeactivated') }}</p>
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
      title: this.$t('providerDedicationManagement.title'),
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
    translatedHeaders() {
      return [
        this.$t('providerDedicationManagement.number'),
        this.$t('providerDedicationManagement.date'),
        this.$t('providerDedicationManagement.startTime'),
        this.$t('providerDedicationManagement.endTime'),
        this.$t('providerDedicationManagement.description'),
        this.$t('providerDedicationManagement.provider'),
        this.$t('providerDedicationManagement.service'),
        this.$t('providerDedicationManagement.stand')
      ];
    }
  },
  methods: {
    ...mapActions('stands', ['getStands', 'getStandsReservations', 'deleteStandReservation']),
    ...mapActions('account', ['getCustomersAccounts', 'getProviderRequests']),
    ...mapActions('prestation', ['getServiceCategories', "getProviderServiceCategories", 'updateProviderServiceCategoryState']),

    async handleDeleteButton(id) {
      if (confirm(this.$t('providerDedicationManagement.deleteConfirmation'))) {
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
        alert(this.serviceStatus === '1' ? this.$t('providerDedicationManagement.serviceActivatedSuccess') : this.$t('providerDedicationManagement.serviceDeactivatedSuccess'));
      } catch (e) {
        alert(this.$t('providerDedicationManagement.serviceStatusUpdateError'));
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