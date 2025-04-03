<template>
  <div class="provider-list-container">
    <h2>{{ $t('provider_list.title') }}</h2>

    <div class="search-filter-container">
      <input type="text" v-model="searchTerm" :placeholder="$t('provider_list.search_placeholder')" class="search-bar" />
      <select v-model="selectedService" class="filter-dropdown">
        <option value="">{{ $t('provider_list.all_services') }}</option>
        <option v-for="service in uniqueServices" :key="service" :value="service">{{ service }}</option>
      </select>
      <div class="checkbox-group">
        <label>
          <input type="checkbox" v-model="selectedGuestbook" true-value="true" false-value="" />
          {{ $t('provider_list.guestbook') }}
        </label>
        <label>
          <input type="checkbox" v-model="selectedCalendar" true-value="true" false-value="" />
          {{ $t('provider_list.calendar') }}
        </label>
      </div>
    </div>

    <div class="providers">
      <div v-for="prestataire in filteredPrestataires" :key="prestataire._id" class="provider">
        <img v-if="prestataire.picture" 
             :src="require('@/assets/img/users/' + prestataire.picture)" 
             :alt="$t('provider_list.provider_image')" 
             class="provider-picture" />
        <div class="provider-details">
          <p><strong>{{ $t('provider_list.name') }} :</strong> {{ prestataire.name }}</p>
          <p><strong>{{ $t('provider_list.email') }} :</strong> {{ prestataire.email }}</p>
          <p><strong>{{ $t('provider_list.description') }} :</strong> <span v-html="prestataire.description"></span></p>
          <button @click="goToProviderInfo(prestataire._id)" class="info-button">
            {{ $t('provider_list.info_button') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'PrestataireList',
  data() {
    return {
      prestataires: [],
      searchTerm: '',
      selectedService: '',
      selectedGuestbook: '',
      selectedCalendar: '',
    };
  },
  computed: {
    ...mapState('account', ['providerRequests']),
    ...mapGetters('account', ['getCustomerById']),
    ...mapGetters('prestation', [
      'getProviderServiceCategoriesByCustomerId',
      'getServiceCategoryById',
      'getProviderGuestbookStatusByCustomerId',
      'getProviderScheduleStatusByCustomerId'
    ]),

    filteredPrestataires() {
      return this.prestataires.filter(prestataire => {
        const matchesSearch = prestataire.name.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesService = this.selectedService 
          ? prestataire.services.some(service => service.name === this.selectedService) 
          : true;
        const validService = prestataire.services.some(service => service.state === "1");
        const matchesGuestbook = this.selectedGuestbook 
          ? prestataire.guestbook === (this.selectedGuestbook === 'true') 
          : true;
        const matchesCalendar = this.selectedCalendar 
          ? prestataire.calendar === (this.selectedCalendar === 'true') 
          : true;

        return matchesSearch && matchesService && validService && matchesGuestbook && matchesCalendar;
      });
    },

    uniqueServices() {
      const services = this.prestataires.flatMap(prestataire => 
        prestataire.services.map(service => service.name)
      );
      return [...new Set(services)];
    },
  },
  methods: {
    ...mapActions('account', ['getCustomersAccounts', 'getProviderRequests']),
    ...mapActions('prestation', [
      'getProviderServiceCategories',
      'getServiceCategories',
      'getProviderGuestbookStatus',
      'getProviderScheduleStatus'
    ]),

    goToProviderInfo(providerId) {
      this.$router.push({ name: 'prestataire-info', params: { id: providerId } });
    },

    async loadProviders() {
      try {
        await this.getCustomersAccounts();
        await this.getProviderRequests();
        await this.getProviderServiceCategories();
        await this.getServiceCategories();
        await this.getProviderGuestbookStatus();
        await this.getProviderScheduleStatus();

        this.prestataires = this.providerRequests
          .filter(request => request.state === "1")
          .map(request => {
            const customer = this.getCustomerById(request.customer_id);
            const services = this.getProviderServiceCategoriesByCustomerId(request.customer_id);
            const serviceNames = services.map(service => ({
              name: this.getServiceCategoryById(service.service_id)?.name || this.$t('provider_list.unknown_service'),
              state: service.state
            }));
            const guestbook = this.getProviderGuestbookStatusByCustomerId(request.customer_id);
            const calendar = this.getProviderScheduleStatusByCustomerId(request.customer_id);

            return {
              _id: request.customer_id,
              name: customer?.name || this.$t('provider_list.unknown_name'),
              email: customer?.email || this.$t('provider_list.unknown_email'),
              description: customer?.description || this.$t('provider_list.no_description'),
              picture: customer?.picture || '',
              services: serviceNames,
              guestbook: guestbook?.guestbook_activated || false,
              calendar: calendar?.schedule_activated || false,
            };
          });
      } catch (error) {
        console.error(this.$t('provider_list.load_error'), error);
      }
    },
  },
  async created() {
    await this.loadProviders();
  },
};
</script>


<style scoped>
.checkbox-group {
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
}

.checkbox-group label {
  margin-bottom: 0.5em;
  display: flex;
  align-items: center;
}

.checkbox-group input[type="checkbox"] {
  margin-right: 0.5em;
}

.provider-list-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1em;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1em;
}

.search-filter-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
}

.search-bar {
  padding: 0.5em;
  margin-bottom: 0.5em;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  transition: border-color 0.3s ease;
}

.search-bar:focus {
  border-color: #007bff;
  outline: none;
}

.filter-dropdown {
  padding: 0.5em;
  margin-bottom: 0.5em;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  transition: border-color 0.3s ease;
}

.filter-dropdown:focus {
  border-color: #007bff;
  outline: none;
}

.providers {
  margin-top: 2em;
}

.provider {
  display: flex;
  align-items: center;
  padding: 1em;
  border-bottom: 1px solid #ccc;
}

.provider-picture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1em;
}

.provider-details {
  flex: 1;
}

.provider-details p {
  margin: 0.5em 0;
}

.info-button {
  display: block;
  margin-top: 1em;
  padding: 0.5em 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.info-button:hover {
  background-color: #0056b3;
}
</style>
