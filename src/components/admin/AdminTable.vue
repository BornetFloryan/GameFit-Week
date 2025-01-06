<template>
  <div class="stand-table-container">
    <h1>{{ title }}</h1>
    <table class="stand-table">
      <thead>
      <tr>
        <th v-for="header in headers" :key="header">{{ header }}</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in dataSource" :key="item._id">
        <td v-for="field in fields" :key="field">
          <p v-if="field === 'pavillon_id'">
            {{ getPavillonById(item[field])?.name || 'Unknown' }}
          </p>
          <p v-else-if="field === 'customer_id'">
            {{ getCustomerById(item[field])?.name || 'Unknown' }}
          </p>
          <p v-else-if="field === 'service_id'">
            {{ getServiceCategoryById(item[field])?.name || 'Unknown' }}
          </p>
          <p v-else-if="field === 'stand_id'">
            {{ getStandById(item[field])?.name || 'Unknown' }}
          </p>
          <p v-else-if="field === 'privilege'">
            {{ getPrivilegeLabel(item[field]) || 'Unknown' }}
          </p>
          <div v-else-if="field === 'services'">
            <div v-for="service in item[field]" :key="service._id">
              <label>
                <input type="checkbox" :checked="service.state === '1'" :disabled="isServiceUsed(service)" @change="emitToggleServiceState(service, $event)">
                {{ getServiceCategoryById(service.service_category_id).name }}
              </label>
            </div>
          </div>
          <p v-else>
            {{ item[field] }}
          </p>
        </td>
        <td>
          <div class="actions-container">
            <router-link :to="{ name: modifyName, params: { item_id: item._id } }">
              <button v-if="showModifyButton" class="btn-action">{{ modifyButtonText }}</button>
            </router-link>
            <router-link :to="{ name: reservationsRouteName, query: reservationsQueryParams(item) }">
              <button v-if="showReservationsButton" class="btn-action">{{ reservationsButtonText }}</button>
            </router-link>
            <button v-if="showDeleteButton" @click="handleDeleteButton(item._id)" class="btn-action">{{ deleteButtonText }}</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AdminTable',
  props: {
    title: String,
    headers: Array,
    fields: Array,
    modifyName: String,
    showModifyButton: {
      type: Boolean,
      default: true,
    },
    modifyButtonText: {
      type: String,
      default: 'Modifier',
    },
    showReservationsButton: {
      type: Boolean,
      default: true,
    },
    reservationsButtonText: {
      type: String,
      default: 'Voir les réservations',
    },
    reservationsRouteName: {
      type: String,
      default: 'admin-stand-reservation',
    },
    reservationsQueryParams: {
      type: Function,
      default: (item) => ({ stand_id: item._id }),
    },
    showDeleteButton: {
      type: Boolean,
      default: true,
    },
    deleteButtonText: {
      type: String,
      default: 'Supprimer',
    },
    dataSource: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters('stands', ['getPavillonById', 'getStandById', 'getStandsReservationsByCustomerIdAndServiceId']),
    ...mapGetters('prestation', ['getServiceCategoryById']),
    ...mapGetters('account', ['getCustomerById']),
  },
  methods: {
    ...mapActions('prestation', ['modifyProviderServiceCategory']),
    handleDeleteButton(_id) {
      this.$emit('delete', _id);
    },
    getPrivilegeLabel(privilege) {
      switch (privilege) {
        case '0':
          return 'Client';
        case '1':
          return 'Prestataire';
        case '2':
          return 'Admin';
        default:
          return 'Unknown';
      }
    },
    emitToggleServiceState(service, event) {
      service.state = event.target.checked ? '1' : '0';
      this.$emit('toggle-service-state', {service});
    },
    isServiceUsed(service) {
      let providerStandReservations = this.getStandsReservationsByCustomerIdAndServiceId(service.customer_id, service.service_category_id);
      return providerStandReservations.length > 0;
    },
  },
};
</script>

<style scoped>
.stand-table-container {
  padding: 2em;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  margin-bottom: 1.5em;
  text-align: center;
  color: #333;
  font-size: 1.8em;
}

.stand-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stand-table thead {
  background-color: #333;
  color: white;
}

.stand-table th,
.stand-table td {
  padding: 0.75em 1em;
  text-align: left;
  font-size: 0.9em;
}

.stand-table th {
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stand-table tbody tr:nth-child(even) {
  background-color: #f8f9fa;
}

.stand-table tbody tr:hover {
  background-color: #e9ecef;
}

.stand-table td {
  border-bottom: 1px solid #dee2e6;
}

.actions-container {
  display: flex;
  gap: 0.5em;
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
}

.btn-action:hover {
  background-color: #0056b3;
}
</style>