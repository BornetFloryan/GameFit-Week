<template>
  <div class="provider-list-container">
    <h2>Liste des Prestataires</h2>
    <div class="providers">
      <div v-for="prestataire in prestataires" :key="prestataire._id" class="provider">
        <img :src="require('@/assets/img/' + prestataire.picture)" alt="Prestataire" class="provider-picture" v-if="prestataire.picture" />
        <div class="provider-details">
          <p><strong>Nom :</strong> {{ prestataire.name }}</p>
          <p><strong>Email :</strong> {{ prestataire.email }}</p>
          <p><strong>Description :</strong> <span v-html="prestataire.description"></span></p>
          <button @click="goToProviderInfo(prestataire._id)" class="info-button">Accéder à l'espace du prestataire</button>
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
      prestataires: []
    };
  },
  computed: {
    ...mapState('account', ['providerRequests']),
    ...mapGetters('account', ['getCustomerById']),
  },
  methods: {
    ...mapActions('account', ['getCustomersAccounts', 'getProviderRequests']),
    goToProviderInfo(providerId) {
      this.$router.push({name: 'prestataire-info', params: {id: providerId}});
    },
  },
  async created() {
    await this.getCustomersAccounts();
    await this.getProviderRequests();
    this.prestataires = this.providerRequests
        .filter(request => request.state === 1)
        .map(request => this.getCustomerById(request.customer_id));
  }
};
</script>

<style scoped>
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