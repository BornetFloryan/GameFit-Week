<template>
  <div class="guestbook-container">
    <h2 class="section-title">Livre d'Or</h2>
    <form v-if="isAuthenticated && hasUsedService" @submit.prevent="addEntry">
      <div class="form-group">
        <label for="rating">Note</label>
        <div class="star-rating">
          <span v-for="star in 5" :key="star" class="star" @click="setRating(star)">
            <i :class="star <= newEntry.rating ? 'fas fa-star' : 'far fa-star'"></i>
          </span>
        </div>
      </div>
      <div class="form-group">
        <label for="comment">Commentaire</label>
        <textarea v-model="newEntry.comment" id="comment" required></textarea>
      </div>
      <button type="submit" class="form-submit-button">Ajouter une Entrée</button>
    </form>
    <p v-else-if="isAuthenticated">Vous devez avoir utilisé un service proposé par le prestataire pour pouvoir ajouter une entrée.</p>
    <p v-else>Vous devez être connecté pour ajouter une entrée.</p>
    <div class="entries">
      <div v-for="entry in entries" :key="entry._id" class="entry">
        <p><strong>Date :</strong> {{ formatDate(entry.date) }}</p>
        <p><strong>Note :</strong> <span v-html="getStars(entry.rating)"></span></p>
        <p><strong>Commentaire :</strong> {{ entry.comment }}</p>
        <p><strong>Utilisateur :</strong> {{ getCustomerById(getTicketById(getServiceReservationsById(entry.service_reservations_id)?.ticket_id)?.customer_id)?.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'GuestBook',
  data() {
    return {
      newEntry: {
        rating: 0,
        comment: '',
      }
    };
  },
  computed: {
    ...mapState('account', ['currentUser']),
    ...mapState('prestation', ['guestbookEntries']),
    ...mapGetters('prestation', ['getServiceReservationsById']),
    ...mapGetters('ticket', ['getTicketById', 'getTicketsByCustomerId']),
    ...mapGetters('account', ['getCustomerById']),
    ...mapGetters('prestation', ['getServiceReservationsByTicketId', 'getGuestbookEntriesByCustomerId']),
    ...mapGetters('stands', ['getStandReservationById']),

    prestataire(){
      const id = this.$route.params.id;
      return this.getCustomerById(id);
    },

    isAuthenticated() {
      return this.currentUser !== null;
    },

    hasUsedService() {
      if (!this.currentUser) return false;
      const tickets = this.getTicketsByCustomerId(this.currentUser._id);
      if (tickets.length === 0) return false;

      let serviceReservations = [];

      for(const ticket of tickets) {
        serviceReservations = this.getServiceReservationsByTicketId(ticket._id);
      }

      if (serviceReservations.length > 0){
        for(const serviceReservation of serviceReservations){
          const standReservation = this.getStandReservationById(serviceReservation.stand_reservation_id);
          if(standReservation && standReservation.customer_id === this.prestataire._id){
            return true;
          }
        }
      }
      return false;
    },

    entries() {
      return this.getGuestbookEntriesByCustomerId(this.prestataire?._id || '');
    }
  },
  methods: {
    ...mapActions('prestation', ['getGuestbookEntries', 'addGuestbookEntry', 'getServiceReservations']),
    ...mapActions('account', ['getCustomersAccounts']),
    ...mapActions('ticket', ['getTickets']),
    ...mapActions('stands', ['getStandsReservations']),
    async addEntry() {
      const newEntry = { ...this.newEntry };
      try{
        let response = await this.addGuestbookEntry({newEntry, currentUser: this.currentUser, prestataire: this.prestataire});
        if(response.error !==0){
          alert(response.message);
        }
      } catch (error) {
        console.error(error);
      }
      this.newEntry = {
        rating: 0,
        comment: '',
      };
    },
    setRating(star) {
      this.newEntry.rating = star;
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
      return dateObject.toLocaleString('fr-FR', { timeZone: 'UTC' });
    }
  },
  async created() {
    await this.getGuestbookEntries();
    await this.getServiceReservations();
    await this.getCustomersAccounts();
    await this.getTickets();
    await this.getStandsReservations();
  }
};
</script>

<style scoped>
.guestbook-container {
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

.form-group {
  margin-bottom: 1em;
}

label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: bold;
}

input,
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

.star-rating {
  display: flex;
}

.star {
  cursor: pointer;
  font-size: 24px;
  color: #ffd700;
}

.star i {
  margin-right: 5px;
}
</style>