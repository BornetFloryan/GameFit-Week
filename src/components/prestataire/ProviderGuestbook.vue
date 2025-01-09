<template>
  <div class="provider-guestbook-container">
    <div>
      <label>
        <input type="radio" v-model="serviceStatus" :value="true" @change="toggleServiceStatus"> Activer le service
      </label>
      <label>
        <input type="radio" v-model="serviceStatus" :value="false" @change="toggleServiceStatus"> Désactiver le service
      </label>
    </div>
    <h2 class="section-title">Retours sur le Livre d'Or</h2>
    <div v-if="serviceStatus">
      <div class="entries">
        <div v-for="entry in entries" :key="entry._id" class="entry">
          <p><strong>Date :</strong> {{ formatDate(entry.date) }}</p>
          <p><strong>Note :</strong> <span v-html="getStars(entry.rating)"></span></p>
          <p><strong>Commentaire :</strong> {{ entry.comment }}</p>
          <p><strong>Utilisateur :</strong> {{ getCustomerById(getTicketById(getServiceReservationsById(entry.service_reservations_id)?.ticket_id)?.customer_id)?.name }}</p>
        </div>
      </div>
    </div>
    <p v-else>Le service n'est pas activé.</p>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'ProviderGuestbook',
  data() {
    return {
      serviceStatus: true,
    };
  },
  computed: {
    ...mapState('account', ['currentUser']),
    ...mapState('prestation', ['guestbookEntries']),
    ...mapGetters('prestation', ['getServiceReservationsById', 'getProviderGuestbookStatusByCustomerId']),
    ...mapGetters('ticket', ['getTicketById']),
    ...mapGetters('account', ['getCustomerById']),
    ...mapGetters('prestation', ['getGuestbookEntriesByCustomerId']),

    prestataire() {
      return this.getCustomerById(this.currentUser._id);
    },

    entries() {
      if (!this.prestataire) {
        return [];
      }
      return this.getGuestbookEntriesByCustomerId(this.prestataire._id || '');
    },
  },
  methods: {
    ...mapActions('prestation', ['getServiceReservations', 'getGuestbookEntries', 'getProviderGuestbookStatus', 'modifyProviderGuestbookStatus']),
    ...mapActions('account', ['getCustomersAccounts']),
    ...mapActions('ticket', ['getTickets']),
    ...mapActions('stands', ['getStandsReservations']),
    async fetchData() {
      await this.getGuestbookEntries();
      await this.getCustomersAccounts();
      await this.getTickets();
    },
    getStars(rating) {
      let stars = '';
      for (let i = 1; i <= 5; i++) {
        stars += `<i class="${i <= rating ? 'fas fa-star' : 'far fa-star'}"></i>`;
      }
      return stars;
    },
    formatDate(dateString) {
      const dateObject = new Date(dateString);
      return dateObject.toLocaleString('fr-FR', {timeZone: 'UTC'});
    },
    async toggleServiceStatus() {
      const providerGuestbookStatus = this.getProviderGuestbookStatusByCustomerId(this.currentUser._id);
      if (!providerGuestbookStatus) {
        alert('Erreur: Statut du livre d\'or non trouvé pour ce prestataire');
        return;
      }
      providerGuestbookStatus.guestbook_activated = this.serviceStatus;
      console.log(providerGuestbookStatus);
      try {
        await this.modifyProviderGuestbookStatus(providerGuestbookStatus);
        alert(`Service ${this.serviceStatus ? 'activé' : 'désactivé'} avec succès`);
      } catch (e) {
        alert('Erreur lors de la mise à jour du statut du service');
      }
    }
  },
  async created() {
    await this.getGuestbookEntries();
    await this.getStandsReservations();
    await this.getProviderGuestbookStatus();
    await this.getServiceReservations();
    const status = this.getProviderGuestbookStatusByCustomerId(this.currentUser._id);
    if (status) {
      this.serviceStatus = status.guestbook_activated;
    }
    await this.fetchData();
  }
};
</script>

<style scoped>
.provider-guestbook-container {
  width: 100%;
  max-width: 1200px;
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
}

.section-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.entries {
  margin-top: 2em;
}

.entry {
  padding: 1em;
  border-bottom: 1px solid #ccc;
}

.entry p {
  margin: 0.5em 0;
}
</style>