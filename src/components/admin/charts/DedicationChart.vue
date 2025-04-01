<template>
  <div class="container">
    <h1>Réservations de Dédicace par Prestataire</h1>
    <canvas ref="dedicationChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import { mapActions, mapGetters, mapState } from "vuex";

Chart.register(...registerables);

export default {
  name: "DedicationChart",
  data() {
    return {
      providers: [],
      reservations: [],
      chart: null,
    };
  },
  computed: {
    ...mapState('account', ['customersAccounts']),
    ...mapGetters('prestation', ['getServiceCategoryById', 'getProviderServiceCategoriesByCustomerIdAndServiceID', 'getServiceReservationsByStandsReservationsIdAndServiceId']),
    ...mapGetters('stands', ['getStandsReservationsByCustomerId']),
    uniqueProviders() {
      return [...new Set(
          this.customersAccounts
              .filter(account => {
                const providerServiceCategory = this.getProviderServiceCategoriesByCustomerIdAndServiceID(account._id, '0');
                return providerServiceCategory && providerServiceCategory.service_id;
              })
              .map(account => {
                const providerServiceCategory = this.getProviderServiceCategoriesByCustomerIdAndServiceID(account._id, '0');
                return {
                  accountId: account._id,
                  accountName: account.name,
                  providerServiceCategoryId: providerServiceCategory._id,
                };
              })
      )];
    },
  },
  methods: {
    ...mapActions('prestation', ['getProviderServiceCategories', 'getServiceCategories', 'getServiceReservations']),
    ...mapActions('account', ['getCustomersAccounts']),
    ...mapActions('stands', ['getStandsReservations']),
    async fetchReservations() {
      for (const provider of this.uniqueProviders) {
        const standsReservations = await this.getStandsReservationsByCustomerId(provider.accountId);
        let reservations = []

        for(const standsReservation of standsReservations) {
          const serviceReservations = await this.getServiceReservationsByStandsReservationsIdAndServiceId(standsReservation._id, '0');
          reservations = [...reservations, ...serviceReservations];
        }

        this.reservations.push({
          provider: provider.accountName,
          count: reservations.length,
        });
      }
    },
    async updateChart() {
      if (this.chart) {
        this.chart.destroy();
      }

      const labels = this.reservations.map(reservation => reservation.provider);
      const data = this.reservations.map(reservation => reservation.count);

      this.chart = new Chart(this.$refs.dedicationChart, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Nombre de Réservations",
              data: data,
              backgroundColor: "rgb(75, 192, 192)",
            },
          ],
        },
      });
    },
  },
  async mounted() {
    await this.getServiceReservations();
    await this.getProviderServiceCategories();
    await this.getCustomersAccounts();
    await this.fetchReservations();
    this.updateChart();
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

canvas {
  max-width: 100%;
  max-height: 93%;
}
</style>