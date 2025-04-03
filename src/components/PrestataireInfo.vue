<template>
  <div class="prestataire-page">
    <div class="header">
      <div class="image-container">
        <img v-if="prestataire && prestataire.picture" :src="require('@/assets/img/users/' + prestataire.picture)" alt="Prestataire" class="provider-image" />
      </div>
      <div class="header-text">
        <h1 class="provider-name">{{ prestataire?.name }}</h1>
        <p class="provider-description" v-html="prestataire?.description"></p>
      </div>
    </div>
    <div class="content">
      <div class="services-section">
        <h2 class="section-title">{{ $t('prestataireInfo.servicesOffered') }}</h2>
        <ul class="service-list">
          <li v-for="service in servicesPrestataires" :key="service._id" class="service-item">
            <router-link :to="getServicePath(service._id, prestataire._id)" class="service-link">{{ service.name }}</router-link>
          </li>
        </ul>
      </div>
      <ProviderSchedule :provider="prestataire" />
    </div>
    <div class="guestbook-section" v-if="guestbookActivated">
      <Guestbook />
    </div>
    <p v-else>{{ $t('prestataireInfo.guestbookNotActivated') }}</p>
    <button @click="goBack" class="back-button">{{ $t('prestataireInfo.back') }}</button>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import Guestbook from "@/components/Guestbook.vue";
import ProviderSchedule from "@/components/prestataire/ProviderSchedule.vue";

export default {
  name: "PrestataireInfo",
  components: {
    Guestbook,
    ProviderSchedule
  },
  data() {
    return {
      guestbookActivated: false,
    };
  },
  computed: {
    ...mapState('prestation', ['providerGuestbookStatus']),
    ...mapGetters('account', ['getCustomerById']),
    ...mapGetters('prestation', ['getProviderServiceCategoriesByCustomerId', 'getServiceCategoryById', 'getProviderGuestbookStatusByCustomerId']),
    prestataire() {
      const id = this.$route.params.id;
      return this.getCustomerById(id);
    },
    servicesPrestataires() {
      if (!this.prestataire) return [];
      const serviceCategories = this.getProviderServiceCategoriesByCustomerId(this.prestataire._id);
      return serviceCategories
          .filter(category => category.state === '1')
          .map(category => this.getServiceCategoryById(category.service_id));
    },
  },
  methods: {
    ...mapActions('prestation', ['getServiceCategories', 'getProviderServiceCategories', 'getProviderGuestbookStatus']),
    ...mapActions('stands', ['getStandsReservations']),
    goBack() {
      this.$router.go(-1);
    },
    async fetchGuestbookStatus() {
      await this.getProviderGuestbookStatus();
      const status = await this.getProviderGuestbookStatusByCustomerId(this.prestataire._id);
      if (status) {
        this.guestbookActivated = status.guestbook_activated;
      }
    },
    getServicePath(serviceId, customerId) {
      if (serviceId === '0') {
        return {name: 'dedication-home', query: {prestataireId: customerId}};
      } else if (serviceId === '1') {
        let providerServiceCategory = this.getProviderServiceCategoriesByCustomerId(customerId);
        if (providerServiceCategory.length !== 0) {
          return {name: 'goodies-seller', query: {providerServiceCategory: providerServiceCategory[0]._id}};
        }
      }
      return '';
    }
  },
  async created() {
    await this.getServiceCategories();
    await this.getProviderServiceCategories();
    await this.getStandsReservations();
    await this.fetchGuestbookStatus();
  },
};
</script>

<style scoped>
.prestataire-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 40px;
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.image-container {
  flex: 0 0 200px;
  height: 200px;
  border: 4px solid #4caf50;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  margin-right: 20px;
}

.provider-image {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  max-height: 200px;
}

.header-text {
  flex: 1;
}

.provider-name {
  font-size: 36px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
}

.provider-description {
  font-size: 20px;
  color: #666;
  line-height: 1.6;
}

.content, .guestbook-section {
  width: 100%;
  max-width: 1200px;
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.services-section {
  margin-top: 30px;
}

.section-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.service-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.service-item {
  margin: 10px 0;
}

.service-link {
  color: #1E90FF;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s ease;
}

.service-link:hover {
  color: #4682B4;
}

.guestbook-section {
  margin-top: 30px;
}

.back-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #0056b3;
}
</style>