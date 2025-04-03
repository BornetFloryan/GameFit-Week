<template>
  <div class="cover-page">
    <div class="hero">
      <img class="hero-image" src="../../../assets/img/users/Bugha.jpg" alt="Image Hero" />
      <div class="hero-content">
        <h1>{{ $t('dedication_home.title') }}</h1>
        <p>{{ $t('dedication_home.description') }}</p>
        <br>
        <input 
          type="text" 
          v-model="ticketNumber" 
          @input="validateTicket" 
          :placeholder="$t('dedication_home.search_placeholder')"
        >
        <router-link :to="dedicationFormLink">
          <button class="cta-button" :disabled="!isTicketValid">{{ $t('dedication_home.reserve_button') }}</button>
        </router-link>
      </div>
    </div>
    <div class="features">
      <div class="feature">
        <h2>{{ $t('dedication_home.feature_simple') }}</h2>
        <p>{{ $t('dedication_home.feature_simple_desc') }}</p>
      </div>
      <div class="feature">
        <h2>{{ $t('dedication_home.feature_anytime') }}</h2>
        <p>{{ $t('dedication_home.feature_anytime_desc') }}</p>
      </div>
      <div class="feature">
        <h2>{{ $t('dedication_home.feature_custom') }}</h2>
        <p>{{ $t('dedication_home.feature_custom_desc') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "DedicationHomeView",
  data() {
    return {
      ticketNumber: null,
      isTicketValid: false,
      prestataireId: this.$route.query.prestataireId || null,
    };
  },
  computed: {
    ...mapState("ticket", ["tickets"]),
    ...mapGetters("ticket", ["getTicketById"]),
    dedicationFormLink() {
      const query = { ticket: this.ticketNumber };
      if (this.prestataireId) {
        query.prestataireId = this.prestataireId;
      }
      return { path: '/services/dedication/dedication-form', query };
    }
  },
  methods: {
    ...mapActions("ticket", ["getTickets"]),
    validateTicket() {
      if (this.ticketNumber) {
        this.isTicketValid = !!this.getTicketById(this.ticketNumber);
      } else {
        this.isTicketValid = false;
      }
    }
  },
  mounted() {
    this.getTickets();
  },
};
</script>

<style scoped>
.cover-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: 'Arial', sans-serif;
  margin-top: 0;
}

.hero {
  position: relative;
  height: 60vh;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  padding: 20px;
  box-shadow: inset 0px 0px 60px rgba(0, 0, 0, 0.1);
}

.hero-content {
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  padding: 0 10px;
}

.hero-content input {
  width: 90%;
  max-width: 300px;
  margin-bottom: 20px;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.hero h1 {
  font-size: 2.5em;
  margin: 0;
  text-align: center;
}

.hero p {
  font-size: 1em;
  margin-top: 10px;
  text-align: center;
}

.cta-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.cta-button:hover:enabled {
  background-color: #0056b3;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
  text-align: center;
  background-color: #f4f4f4;
}

.feature {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.feature h2 {
  font-size: 1.5em;
  color: #333;
}

.feature p {
  font-size: 0.9em;
  color: #555;
}
</style>
