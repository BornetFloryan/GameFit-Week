<template>
  <div class="provider-request-view">
    <h2>Demande pour devenir prestataire</h2>
    <table v-if="request">
      <thead>
      <tr>
        <th>Numéro</th>
        <th>Date</th>
        <th>Services</th>
        <th>Status</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{{ request._id }}</td>
        <td>{{ request.date }}</td>
        <td>
          <ul>
            {{services}}
            <li v-for="service in services" :key="service._id">{{ getServiceCategoryById(service._id).name }}</li>
          </ul>
        </td>
        <td>{{ request.status }}</td>
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
      request: null,
      services: [],
    };
  },
  computed: {
    ...mapState('account', ['currentUser']),
    ...mapGetters('account', ['getProviderRequestsByCustomerId']),
    ...mapGetters('prestation', ['getProviderServiceCategoriesByCustomerId', 'getServiceCategoryById']),
  },
  methods: {
    ...mapActions('account', ['getProviderRequests']),
    ...mapActions('prestation', ['getProviderServiceCategories']),
    async fetchData() {
      this.request = this.getProviderRequestsByCustomerId(this.currentUser._id);
      this.services = this.getProviderServiceCategoriesByCustomerId(this.currentUser._id);
    },
  },
  async created() {
    await this.getProviderRequests();
    await this.getProviderServiceCategories();
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
</style>