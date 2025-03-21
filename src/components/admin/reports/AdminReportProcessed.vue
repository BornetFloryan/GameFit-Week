<template>
  <div class="moderation-container">
    <h2 class="section-title">Modération de l'entrée</h2>
    <div class="entry" v-if="entry">
      <p><strong>Date :</strong> {{ formatDate(entry.date) }}</p>
      <p><strong>Note :</strong> <span v-html="getStars(entry.rating)"></span></p>
      <p><strong>Commentaire :</strong><textarea id="userComment" v-model="entry.comment"></textarea></p>
      <p><strong>Utilisateur :</strong> {{ getCustomerById(getTicketById(getServiceReservationsById(entry.service_reservations_id)?.ticket_id)?.customer_id)?.name }}</p>
    </div>
    <form @submit.prevent="confirmSubmitModeration" class="button-group">
      <button type="submit" class="form-submit-button">Soumettre</button>
      <button type="button" class="form-delete-button" @click="confirmDeleteEntry">Supprimer</button>
      <button type="button" class="form-back-button" @click="goBack">Retour</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'AdminReportProcessed',
  data() {
    return {
      entry: null,
      comment: '',
    };
  },
  computed: {
    ...mapState('prestation', ['guestbookEntries']),
    ...mapGetters('prestation', ['getGuestbookEntryById', 'getReportsById', 'getServiceReservationsById']),
    ...mapGetters('ticket', ['getTicketById']),
    ...mapGetters('account', ['getCustomerById']),
  },
  methods: {
    ...mapActions('prestation', ['getServiceReservations', 'getGuestbookEntries', 'modifyGuestbookEntry', 'modifyReport', 'deleteGuestbookEntry', 'deleteReport']),
    ...mapActions('account', ['getCustomersAccounts']),
    ...mapActions('ticket', ['getTickets']),
    async fetchGuestbookEntry() {
      await this.getServiceReservations();
      await this.getTickets();
      await this.getCustomersAccounts();
      await this.getGuestbookEntries();
      const guestbookEntryId = this.$route.params.guestbook_entry_id;
      this.entry = await this.getGuestbookEntryById(guestbookEntryId);
      this.comment = this.entry.comment;
    },
    async submitModeration() {
      console.log(this.entry);
      try{
        let response = await this.modifyGuestbookEntry(this.entry);
        console.log(response);
        if(response.data.error === 0){
          const report = this.getReportsById(this.$route.query.report_id);
          report.state = '1';
          await this.modifyReport(report);
          this.$router.push({ name: 'admin-reports' });
        }
      } catch(error){
        alert('Erreur lors de la soumission de la modération.', error);
      }
    },
    async deleteEntry() {
      await this.deleteGuestbookEntry(this.entry._id);
      await this.deleteReport(this.$route.query.report_id);
      this.$router.push({name: 'admin-reports'});
    },
    confirmSubmitModeration() {
      if (confirm('Êtes-vous sûr de vouloir soumettre cette modération ?')) {
        this.submitModeration();
      }
    },
    confirmDeleteEntry() {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette entrée ?')) {
        this.deleteEntry();
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    formatDate(dateString) {
      const dateObject = new Date(dateString);
      return dateObject.toLocaleString('fr-FR', {timeZone: 'UTC'});
    },
    getStars(rating) {
      let stars = '';
      for (let i = 1; i <= 5; i++) {
        stars += `<i class="${i <= rating ? 'fas fa-star' : 'far fa-star'}"></i>`;
      }
      return stars;
    },
  },
  async created() {
    await this.fetchGuestbookEntry();
  },
};
</script>

<style scoped>
.moderation-container {
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

label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: bold;
}

textarea {
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.form-submit-button,
.form-delete-button,
.form-back-button {
  flex: 1;
  padding: 0.75em;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.form-submit-button {
  background-color: #28a745;
}

.form-submit-button:hover {
  background-color: #218838;
  transform: translateY(-2px);
}

.form-delete-button {
  background-color: #dc3545;
}

.form-delete-button:hover {
  background-color: #c82333;
  transform: translateY(-2px);
}

.form-back-button {
  background-color: #6c757d;
}

.form-back-button:hover {
  background-color: #5a6268;
  transform: translateY(-2px);
}

.entry {
  padding: 1em;
  border-bottom: 1px solid #ccc;
  margin-bottom: 1em;
}

.entry p {
  margin: 0.5em 0;
}

.star i {
  margin-right: 5px;
}
</style>