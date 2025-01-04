<template>
  <div>
    <NavView />
    <CarouselAccueil />
    <ContentHome />
    <InteractiveMap :title="title"
                    dateTitle="Sélectionnez la date de votre venue pour découvrir les prestations disponibles dans chaque stand !"
                    :minDate="minDate"
                    :maxDate="maxDate"
                    @zone-hover="handleZoneHover"
                    @update-selected-date="updateSelectedDate"
    />
    <div
        v-if="selectedZone"
        class="info-card"
        :style="{ top: cardY + 'px', left: cardX + 'px' }"
        @mouseenter="handleCardMouseEnter"
        @mouseleave="handleCardMouseLeave"
    >
      <h3>{{ selectedZone.name }}</h3>
      <img v-if="selectedZone.picture" :src="selectedZone.picture" alt="Prestataire" class="zone-image"/>
      <p v-html="selectedZone.description"></p>
      <button v-if="selectedZone.description !== 'Pour l\'instant aucune prestation n\'est prévue pour ce stand'"
              @click="showStandInfo()" class="btn-more-info">En savoir plus</button>
    </div>

    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <StandInfo :stand="this.stand"/>
        <button @click="closeModal" class="btn-close">Fermer</button>
      </div>
    </div>
  </div>
</template>

// src/views/AccueilView.vue
<script>
import NavView from "@/components/NavBar.vue";
import CarouselAccueil from "@/components/CarouselAccueil.vue";
import ContentHome from "@/components/ContentHome.vue";
import InteractiveMap from "@/components/InteractiveMap.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import StandInfo from "@/components/StandInfo.vue";

export default {
  name: 'GameFitIntro',
  components: { StandInfo, InteractiveMap, ContentHome, CarouselAccueil, NavView },
  data() {
    return {
      title: "Carte Interactive",
      minDate: '2025-07-07',
      maxDate: '2025-07-12',
      tooltipVisible: false,
      tooltipText: "",
      tooltipX: 0,
      tooltipY: 0,
      selectedZone: null,
      cardX: 0,
      cardY: 0,
      isCardHovered: false,
      showModal: false,
      selectedPrestataire: null,
      selectedDate: null,
      stand: '',
    };
  },
  computed: {
    ...mapState('stands', ['stands', 'standsReservations']),
    ...mapState('account', ['customersAccounts']),
    ...mapGetters('stands', ['getStandById', 'getStandsReservationsByStandIdAndDate']),
    ...mapGetters('account', ['getCustomerById', 'getProviderRequestById']),
  },
  methods: {
    ...mapActions('stands', ['getStands', 'getStandsReservations']),
    ...mapActions('account', ['getCustomersAccounts', 'getProviderRequests']),

    handleZoneHover(event) {
      const zoneId = event.target.id;

      if (!zoneId || zoneId === "Fond") return;

      const standNumberMatch = zoneId.match(/Stand\s*(\d+)/);
      const standNumber = standNumberMatch ? String(standNumberMatch[1] - 1) : null;

      if (!this.stands || !this.customersAccounts) {
        console.error("stands or customersAccounts is not defined");
        return;
      }

      this.stand = this.getStandById(standNumber);

      let standReservations = [];
      let prestataire = null;
      if (this.stand) {
        standReservations = this.getStandsReservationsByStandIdAndDate(this.stand._id, this.selectedDate);
        if (standReservations.length > 0 && standReservations[0].customer_id) {
          let provider_requests = this.getProviderRequestById(standReservations[0].customer_id);
          prestataire = this.getCustomerById(provider_requests.customer_id);
        }
      }

      const descriptions = standReservations.map(reservation => reservation.description).join('<br>');
      this.selectedZone = {
        name: this.stand ? this.stand.name : `${zoneId}`,
        description: descriptions || "Pour l'instant aucune prestation n'est prévue pour ce stand",
        prestataire: prestataire ? prestataire : null,
      };

      const boundingBox = event.target.getBoundingClientRect();
      this.cardX = boundingBox.left + window.scrollX + 10;
      this.cardY = boundingBox.top + window.scrollY;

      const windowWidth = window.innerWidth;
      const cardWidth = 600;
      if (this.cardX + cardWidth > windowWidth) {
        this.cardX = windowWidth - cardWidth - 30;
      }

      if (this.cardX < 0) {
        this.cardX = 10;
      }
    },

    showStandInfo() {
      if (!this.stand) return;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.stand = null;
    },

    handleCardMouseEnter() {
      this.isCardHovered = true;
    },

    handleCardMouseLeave() {
      this.isCardHovered = false;
      this.checkHideCard();
    },

    checkHideCard() {
      if (!this.isCardHovered) {
        this.selectedZone = null;
      }
    },

    updateSelectedDate(selectedDate) {
      this.selectedDate = selectedDate;
    }
  },
  async mounted() {
    await this.getStands();
    await this.getProviderRequests();
    await this.getCustomersAccounts();
    await this.getStandsReservations();

    this.selectedDate = this.minDate;
  },
};
</script>

<style scoped>
.info-card {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 20px;
  border-radius: 8px;
  color: white;
  margin-top: 20px;
  max-width: 600px;
  width: 90%;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 11;
}

.btn-more-info {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #1E90FF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-more-info:hover {
  background-color: #4682B4;
}

.zone-image {
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: 8px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 800px;
  width: 90%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff5c5c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-close:hover {
  background-color: #ff1c1c;
}
</style>