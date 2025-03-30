<template>
  <div class="prestataire-page">
    <div class="header">
      <div class="image-container">
        <img v-if="prestataire && prestataire.picture" :src="require('@/assets/img/' + prestataire.picture)" alt="Prestataire" class="provider-image" />
      </div>
      <div class="header-text">
        <h1 class="provider-name">{{ prestataire?.name }}</h1>
        <VueEditor v-model="description" />
      </div>
    </div>
    <button @click="saveDescription" class="save-button">Enregistrer</button>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { VueEditor } from 'vue2-editor';

export default {
  name: 'ProviderEditor',
  components: {
    VueEditor,
  },
  data() {
    return {
      description: '',
    };
  },
  computed: {
    ...mapState('account', ['currentUser']),
    ...mapGetters('account', ['getCustomerById']),
    ...mapGetters('prestation', ['getProviderServiceCategoriesByCustomerId', 'getServiceCategoryById', 'getProviderGuestbookStatusByCustomerId']),
    prestataire() {
      return this.currentUser ? this.getCustomerById(this.currentUser._id) : null;
    },
    servicesPrestataires() {
      if (!this.prestataire) return [];
      const serviceCategories = this.getProviderServiceCategoriesByCustomerId(this.prestataire._id);
      return serviceCategories
          .filter(category => category.state === '1')
          .map(category => this.getServiceCategoryById(category.service_id));
    },
  },
  watch: {
    prestataire: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.description = newVal.description || '';
        }
      },
    },
  },
  methods: {
    ...mapActions('account', ['getCustomersAccounts', 'modifyCustomerAccount']),
    ...mapActions('prestation', ['getServiceCategories', 'getProviderServiceCategories', 'getProviderGuestbookStatus']),
    async saveDescription() {
      if (this.prestataire) {
        this.prestataire.description = this.description;
        await this.modifyCustomerAccount(this.prestataire, this.currentUser.session);
      } else {
        console.error('Prestataire is undefined');
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  async created() {
    await this.getServiceCategories();
    await this.getProviderServiceCategories();
    await this.getCustomersAccounts();

    this.provider = this.getCustomerById(this.$route.params.id) || this.currentUser;
    if (this.provider && this.provider._id) {
      await this.getCustomerById(this.provider._id);
    } else {
      console.error('Provider or provider ID is undefined');
    }
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

.content {
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

.save-button, .back-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-button {
  background-color: #007bff;
}

.save-button:hover {
  background-color: #0056b3;
}

.back-button {
  background-color: #007bff;
}

.back-button:hover {
  background-color: #0056b3;
}
</style>