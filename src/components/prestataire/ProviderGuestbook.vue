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
          <p><strong>Utilisateur :</strong> {{
              getCustomerById(getTicketById(getServiceReservationsById(entry.service_reservations_id)?.ticket_id)?.customer_id)?.name
            }}</p>
          <button class="report-button" @click="openReportModal(entry._id)">Signaler</button>
        </div>
      </div>
    </div>
    <p v-else>Le service n'est pas activé.</p>
    <div v-if="showReportModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeReportModal">&times;</span>
        <h2>Signaler une entrée</h2>
        <form @submit.prevent="submitReport">
          <div class="form-group">
            <label for="reason">Raison</label>
            <textarea v-model="reportReason" id="reason" required></textarea>
          </div>
          <button type="submit" class="form-submit-button">Valider</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'ProviderGuestbook',
  data() {
    return {
      serviceStatus: null,
      showReportModal: false,
      reportReason: '',
      reportEntryId: null,
    };
  },
  computed: {
    ...mapState('account', ['currentUser']),
    ...mapState('prestation', ['guestbookEntries', 'providerGuestbookStatus']),
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
    ...mapActions('prestation', ['getServiceReservations', 'getGuestbookEntries', 'getProviderGuestbookStatus', 'modifyProviderGuestbookStatus', 'addReport']),
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
      try {
        const providerGuestbookStatus = this.getProviderGuestbookStatusByCustomerId(this.currentUser._id);
        if (!providerGuestbookStatus) {
          alert('Erreur: Statut du livre d\'or non trouvé pour ce prestataire');
          return;
        }
        providerGuestbookStatus.guestbook_activated = this.serviceStatus;
        await this.modifyProviderGuestbookStatus(providerGuestbookStatus);
        alert(`Service ${this.serviceStatus ? 'activé' : 'désactivé'} avec succès`);
      } catch (e) {
        alert('Erreur lors de la mise à jour du statut du service');
      }
    },
    openReportModal(entryId) {
      this.reportEntryId = entryId;
      this.showReportModal = true;
    },
    closeReportModal() {
      this.showReportModal = false;
      this.reportReason = '';
      this.reportEntryId = null;
    },
    async submitReport() {
      if (this.reportEntryId && this.reportReason) {
        const response = await this.addReport({ date: new Date().toISOString(), reason: this.reportReason, state: "0", guestbook_entry_id: this.reportEntryId });
        if(response.error !== 0) {
          alert(response.data);
        } else {
          alert(`Votre signalement a bien été pris en compte.`);
          this.closeReportModal();
        }
      }
    },
  },
  created() {
    this.getGuestbookEntries();
    this.getProviderGuestbookStatus();
    this.getStandsReservations();
    this.getServiceReservations();
    const status = this.getProviderGuestbookStatusByCustomerId(this.currentUser._id);
    if (status) {
      this.serviceStatus = status.guestbook_activated;
    } else {
      this.serviceStatus = false;
    }
    this.fetchData();
  },
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

.form-group {
  margin-bottom: 1em;
}

textarea {
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-submit-button {
  display: block;
  width: 100%;
  padding: 0.5em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-submit-button:hover {
  background-color: #0056b3;
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

.star i {
  margin-right: 5px;
}

.report-button {
  margin-top: 10px;
  padding: 0.5em 1em;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.report-button:hover {
  background-color: #c82333;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>