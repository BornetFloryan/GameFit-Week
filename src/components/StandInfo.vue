<template>
  <div class="stand-info">
    <div class="stand-card">
      <h3>{{ localizedStandTitle }}</h3>
      <ul class="stand-schedule">
        <li v-for="reservation in sortedStandReservations" :key="reservation._id" class="schedule-item">
          <span class="schedule-time">{{ reservation.start_time }}h - {{ reservation.end_time }}h</span>
          <p>
            {{ localizedServiceLabel }} :
            <router-link :to="getServicePath(reservation.service_id, reservation.customer_id)" class="schedule-service">
              {{ getLocalizedServiceCategoryName(reservation.service_id) }}
            </router-link>
          </p>
          <p>
            {{ localizedProviderLabel }} :
            <router-link :to="{ name: 'prestataire-info', params: { id: reservation.customer_id } }" class="schedule-prestataire">
              {{ getCustomerById(reservation.customer_id)?.name || 'Unknown' }}
            </router-link>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "StandInfo",
  props: {
    stand: {
      type: Object,
      required: true,
    },
    selectedDate: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      standReservations: [],
    };
  },
  computed: {
    ...mapState("stands", ["standsReservations"]),
    ...mapState("prestation", ["serviceCategories"]),
    ...mapState("account", ["customersAccounts"]),
    ...mapGetters('account', ['getCustomerById']),
    ...mapGetters('prestation', ['getServiceCategoryById', 'getProviderServiceCategoriesByCustomerId']),
    ...mapGetters('stands', ['getStandReservationsByStandId']),

    sortedStandReservations() {
      return this.getSortedStandReservations();
    },
    localizedStandTitle() {
      return this.$i18n.locale === 'en' ? `Stand Schedule: ${Number(this.stand._id) + 1}` : `Planning du stand : ${Number(this.stand._id) + 1}`;
    },
    localizedServiceLabel() {
      return this.$i18n.locale === 'en' ? 'Service' : 'Prestation';
    },
    localizedProviderLabel() {
      return this.$i18n.locale === 'en' ? 'Provider' : 'Prestataire';
    },
  },
  methods: {
    ...mapActions("stands", ["getStandsReservations"]),
    ...mapActions("prestation", ["getServiceCategories", 'getProviderServiceCategories']),
    ...mapActions("account", ["getCustomersAccounts"]),

    getSortedStandReservations() {
      return this.standReservations
          .filter(reservation => reservation.date === this.selectedDate)
          .slice()
          .sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.start_time}:00`);
            const dateB = new Date(`${b.date}T${b.start_time}:00`);
            return dateA - dateB;
          });
    },
    getServicePath(serviceId, customerId) {
      if (serviceId === '0') {
        return { name: 'dedication-home', query: { prestataireId: customerId } };
      } else if (serviceId === '1') {
        let providerServiceCategory = this.getProviderServiceCategoriesByCustomerId(customerId);
        if (providerServiceCategory.length !== 0) {
          return { name: 'goodies-seller', query: { providerServiceCategory: providerServiceCategory[0]._id } };
        }
      }
      return '';
    },
    getLocalizedServiceCategoryName(serviceId) {
      const serviceCategory = this.getServiceCategoryById(serviceId);
      if (serviceCategory) {
        return this.$i18n.t(`service_categories.${serviceCategory.name.toLowerCase()}`) || serviceCategory.name;
      }
      return 'Unknown';
    }
  },
  async mounted() {
    await this.getStandsReservations();
    this.standReservations = this.getStandReservationsByStandId(this.stand._id);
    await this.getCustomersAccounts();
    await this.getServiceCategories();
    await this.getProviderServiceCategories();
  },
};
</script>

<style scoped>
.stand-info {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  height: auto;
  overflow: hidden;
  width: 100%;
}

.stand-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
}

.stand-schedule {
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
}

.schedule-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.schedule-time {
  font-weight: bold;
  color: #333;
}

.schedule-prestataire,
.schedule-service {
  color: #1E90FF;
  cursor: pointer;
  text-decoration: underline;
}

.schedule-prestataire:hover,
.schedule-service:hover {
  color: #4682B4;
}

.stand-card::after {
  content: '';
  display: block;
  height: 4px;
  width: 60px;
  background-color: #4caf50;
  margin: 30px auto;
}
</style>