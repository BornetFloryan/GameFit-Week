<template>
  <div class="provider-request-view">
    <h2>{{ $t('providerRequestView.title') }}</h2>
    <table v-if="requests.length">
      <thead>
      <tr>
        <th>{{ $t('providerRequestView.number') }}</th>
        <th>{{ $t('providerRequestView.date') }}</th>
        <th>{{ $t('providerRequestView.services') }}</th>
        <th>{{ $t('providerRequestView.status') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="request in requests" :key="request._id">
        <td>{{ request._id }}</td>
        <td>{{ request.date }}</td>
        <td>
          <ul>
            <li v-for="service in services" :key="service._id">
              {{ getServiceCategoryById(service.service_id)?.name || $t('providerRequestView.unknown') }}
            </li>
          </ul>
        </td>
        <td>{{ getStatusText(request.state) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'ProviderRequestView',
  data() {
    return {
      requests: [],
      services: [],
    };
  },
  computed: {
    ...mapState('account', ['currentUser']),
    ...mapState('prestation', ['providerServiceCategories']),
    ...mapGetters('account', ['getProviderRequestsByCustomerId']),
    ...mapGetters('prestation', ['getProviderServiceCategoriesByCustomerId', 'getServiceCategoryById']),
  },
  methods: {
    ...mapActions('account', ['getProviderRequests']),
    ...mapActions('prestation', ['getServiceCategories', 'getProviderServiceCategories']),
    async fetchData() {
      try {
        const requests = this.getProviderRequestsByCustomerId(this.currentUser._id);
        const services = this.getProviderServiceCategoriesByCustomerId(this.currentUser._id);
        if (requests && requests.length) {
          this.requests = requests;
        } else {
          console.error('Aucune demande trouvée pour l\'utilisateur actuel.');
        }
        if (services) {
          this.services = services;
        } else {
          console.error('Aucun service trouvé pour l\'utilisateur actuel.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    },
    getStatusText(state) {
      switch (state) {
        case '0':
          return this.$t('providerRequestView.statusTexts.pending');
        case '1':
          return this.$t('providerRequestView.statusTexts.approved');
        case '2':
          return this.$t('providerRequestView.statusTexts.rejected');
        default:
          return this.$t('providerRequestView.statusTexts.unknown');
      }
    }
  },
  async created() {
    await this.getProviderRequests();
    await this.getProviderServiceCategories();
    await this.getServiceCategories();
    this.fetchData();
  },
};
</script>

<style scoped>
.provider-request-view {
  padding: 20px;
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

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>