<template>
  <div class="stand-info">
    <div class="stand-card">
      <h3>Planning du stand : {{stand._id}}</h3>
      <ul class="stand-schedule">
        <li v-for="reservation in standReservations" :key="reservation._id" class="schedule-item">
          <span class="schedule-time">{{ reservation.start_time }}h - {{ reservation.end_time }}h</span>
          <p>
            Prestation :
            <router-link :to="{path: 'services/dedication/dedication-home'}" class="schedule-service">
             {{ serviceCategories.find(cat => cat._id === reservation.service_id)?.name || 'Unknown' }}
            </router-link>
          </p>
          <p>
            Prestataire :
            <router-link :to="{path: '/prestataire/'}" class="schedule-prestataire">
              {{ customersAccounts.find(account => account._id === reservation.prestataire_id)?.name || 'Unknown' }}
          </router-link>
          </p>

        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "StandInfo",
  props: {
    stand: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      standReservations: null,
    };
  },
  computed: {
    ...mapState("stands", ["standsReservations"]),
    ...mapState("prestation", ["serviceCategories"]),
    ...mapState("account", ["customersAccounts"]),
  },
  methods: {
    ...mapActions("stands", ["getStandsReservations"]),
    ...mapActions("prestation", ["getServiceCategories"]),
    ...mapActions("account", ["getCustomersAccounts"]),
  },
  async mounted() {
    await this.getStandsReservations();
    this.standReservations = this.standsReservations.filter(
        (reservation) => reservation.stand_id === this.stand._id
    );
    await this.getCustomersAccounts();
    await this.getServiceCategories();
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