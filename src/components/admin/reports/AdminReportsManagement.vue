<template>
  <div class="provider-guestbook-container">
    <h2 class="section-title">Signalement</h2>
    <div>
      <div class="entries">
        <div v-for="report in reports" :key="report._id" class="report">
          <p><strong>Numéro :</strong> {{report._id}}</p>
          <p><strong>Date :</strong> {{ formatDate(report.date) }}</p>
          <p><strong>Raison :</strong> {{report.reason}}</p>
          <p><strong>Etat :</strong> {{ formatState(report.state) }}</p>
          <p><strong>Numéro d'entrée dans le livre d'or :</strong> {{report.guestbook_entry_id}}</p>
          <div class="button-group">
            <button class="moderate-button" @click="ModerateReport(report)">Modérer</button>
            <button class="delete-button" @click="DeleteReport(report)">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
  name: 'AdminReportsManagement',
  data() {
    return {};
  },
  computed: {
    ...mapState('account', ['currentUser']),
    ...mapState('prestation', ['reports']),
  },
  methods: {
    ...mapActions('prestation', ['getReports', 'deleteReport']),
    formatDate(dateString) {
      const dateObject = new Date(dateString);
      return dateObject.toLocaleString('fr-FR', {timeZone: 'UTC'});
    },
    formatState(state) {
      return state === "0" ? "en attente de traitement" : "traité";
    },
    ModerateReport(report) {
      this.$router.push({
        name: 'admin-reports-processed',
        params: {guestbook_entry_id: report.guestbook_entry_id},
        query: {report_id: report._id}
      });
    },
    async DeleteReport(report) {
      await this.deleteReport(report._id);
    },
  },
  created() {
    this.getReports();
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
  margin-top: 20px;
}

.report {
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.report p {
  margin: 10px 0;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.moderate-button,
.delete-button {
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

.moderate-button {
  background-color: #007bff;
}

.moderate-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.delete-button {
  background-color: #dc3545;
}

.delete-button:hover {
  background-color: #c82333;
  transform: translateY(-2px);
}
</style>