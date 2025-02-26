<template>
  <div class="moderation-container">
    <h2 class="section-title">Modération de l'entrée</h2>
    <form @submit.prevent="submitModeration">
      <div class="form-group">
        <label for="userComment">Commentaire de l'utilisateur</label>
        <textarea id="userComment" v-model="comment"></textarea>
      </div>
      <button type="submit" class="form-submit-button">Soumettre</button>
      <button type="button" class="form-delete-button" @click="deleteEntry">Supprimer</button>
      <button type="button" class="form-back-button" @click="goBack">Retour</button>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex';

export default {
  name: 'AdminReportProcessed',
  data() {
    return {
      entry: {},
      comment: '',
    };
  },
  computed: {
    ...mapState('prestation', ['guestbookEntries']),
    ...mapGetters('prestation', ['getGuestbookEntryById', 'getReportsById']),
  },
  methods: {
    ...mapActions('prestation', ['getGuestbookEntries', 'modifyGuestbookEntry', 'modifyReport', 'deleteGuestbookEntry']),
    async fetchGuestbookEntry() {
      await this.getGuestbookEntries();
      const guestbookEntryId = this.$route.params.guestbook_entry_id;
      this.entry = await this.getGuestbookEntryById(guestbookEntryId);
      this.comment = this.entry.comment;
    },
    async submitModeration() {
      this.entry.comment = this.comment;
      await this.modifyGuestbookEntry(this.entry);
      const report = this.getReportsById(this.$route.query.report_id);
      report.state = '1';
      await this.modifyReport(report);
      this.$router.push({name: 'admin-reports'});
    },
    async deleteEntry() {
      await this.deleteGuestbookEntry(this.entry._id);
      this.$router.push({name: 'admin-reports'});
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  async created() {
    await this.fetchGuestbookEntry();
  },
};
</script>

<style scoped>
.moderation-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin: 30px auto;
}

.section-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 1em;
  width: 100%;
}

label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: bold;
}

textarea,
select {
  width: 100%;
  padding: 0.75em;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1em;
  transition: border-color 0.3s ease;
}

textarea:focus,
select:focus {
  border-color: #007bff;
  outline: none;
}

textarea[readonly] {
  background-color: #f9f9f9;
}

.form-submit-button,
.form-delete-button,
.form-back-button {
  display: block;
  width: 100%;
  padding: 0.75em;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;
  margin-top: 10px;
}

.form-submit-button {
  background-color: #007bff;
}

.form-submit-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.form-submit-button:active {
  background-color: #004494;
  transform: translateY(0);
}

.form-delete-button {
  background-color: #dc3545;
}

.form-delete-button:hover {
  background-color: #c82333;
  transform: translateY(-2px);
}

.form-delete-button:active {
  background-color: #bd2130;
  transform: translateY(0);
}

.form-back-button {
  background-color: #6c757d;
}

.form-back-button:hover {
  background-color: #5a6268;
  transform: translateY(-2px);
}

.form-back-button:active {
  background-color: #4e555b;
  transform: translateY(0);
}
</style>