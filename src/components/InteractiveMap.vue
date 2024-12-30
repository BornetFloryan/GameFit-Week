<template>
  <div class="interactive-map" @mousemove="updateTooltipPosition">
    <h2>Carte Interactive</h2>
    <div ref="svgContainer" class="svg-container" v-html="svgContent"></div>

    <div v-if="tooltipVisible" class="tooltip" :style="{ top: tooltipY + 'px', left: tooltipX + 'px' }">
      {{ tooltipText }}
    </div>

    <div
        v-if="selectedZone"
        class="info-card"
        :style="{ top: cardY + 'px', left: cardX + 'px' }"
        @mouseenter="handleCardMouseEnter"
        @mouseleave="handleCardMouseLeave"
    >
      <h3>{{ selectedZone.name }}</h3>
      <img v-if="selectedZone.picture" :src="selectedZone.picture" alt="Prestataire" class="zone-image" />
      <p>{{ selectedZone.description }}</p>
      <button @click="showPrestataireInfo(selectedZone.prestataire)" class="btn-more-info">En savoir plus</button>
    </div>

    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <PrestataireInfo :prestataire="selectedPrestataire" />
        <button @click="closeModal" class="btn-close">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PrestataireInfo from "@/components/PrestataireInfo.vue";

export default {
  name: "InteractiveMap",
  components: { PrestataireInfo },
  data() {
    return {
      svgContent: "",
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
    };
  },
  methods: {
    ...mapActions('stands', ['getStands']),
    ...mapActions('account', ['getCustomersAccounts']),
    async fetchSvgContent() {
      try {
        const response = await fetch(require("@/assets/svg/Carte GFW.svg"));
        if (!response.ok) throw new Error("Erreur lors du chargement du SVG");

        let svg = await response.text();

        svg = svg.replace(/<rect id="(Stand[^"]*|Scene[^"]*)"/g, '<rect id="$1" class="interactive-zone"');

        svg = svg.replace(/<rect id="Terrain de football"/g, '<rect id="Terrain de Football" class="interactive-zone"');

        svg = svg.replace(/<circle id="Palais des Sports_2"/g, '<circle id="Palais des Sports" class="interactive-zone"');

        this.svgContent = svg;

        this.$nextTick(() => {
          this.attachEventListenersToSvg();
        });
      } catch (error) {
        console.error("Erreur lors du chargement du SVG :", error);
      }
    },

    attachEventListenersToSvg() {
      const svgElement = this.$refs.svgContainer.querySelector("svg");

      if (svgElement) {
        const interactiveZones = svgElement.querySelectorAll(".interactive-zone");

        interactiveZones.forEach((zone) => {
          zone.addEventListener("mouseover", this.handleZoneHover);
          zone.addEventListener("mouseleave", this.handleZoneLeave);
          zone.addEventListener("click", this.handleZoneClick);
        });
      }
    },

    handleZoneHover(event) {
      const target = event.target;

      if (target && target.classList.contains("interactive-zone") && target.id !== "Fond") {
        this.tooltipVisible = true;
        this.tooltipText = target.id || "Zone sans ID";
        target.style.fill = "#1E90FF";
      }
    },

    handleZoneLeave(event) {
      const target = event.target;

      if (target && target.classList.contains("interactive-zone")) {
        this.tooltipVisible = false;
        target.style.fill = "";
      }
    },

    handleZoneClick(event) {
      const zoneId = event.target.id;

      if (!zoneId || zoneId === "Fond") return;

      const standNumberMatch = zoneId.match(/Stand\s*(\d+)/);
      const standNumber = standNumberMatch ? String(standNumberMatch[1] - 1) : null;
      const stand = this.stands.find(stand => stand._id === standNumber);

      let prestataireName = null;
      let prestatairePicture = null;
      let prestataire = null;
      if (stand && stand.prestataire_id) {
        prestataire = this.customersAccounts.find(e => e._id === stand.prestataire_id);
        prestataireName = prestataire ? prestataire.name : null;
        prestatairePicture = prestataire ? prestataire.picture : null;
      }

      this.selectedZone = {
        picture: prestatairePicture ? require('@/assets/img/' + prestatairePicture)  : null,
        name: `${zoneId}`,
        description: stand ? stand.description + (prestataireName ? prestataireName : "") : "Description non disponible",
        prestataire: prestataire ? prestataire : null,
      };

      const boundingBox = event.target.getBoundingClientRect();
      this.cardX = boundingBox.left + window.scrollX + 10;
      this.cardY = boundingBox.top + window.scrollY + 10;

      const windowWidth = window.innerWidth;
      const cardWidth = 600;
      if (this.cardX + cardWidth > windowWidth) {
        this.cardX = windowWidth - cardWidth - 30;
      }

      if (this.cardX < 0) {
        this.cardX = 10;
      }
    },

    showPrestataireInfo(prestataire) {
      if(!prestataire) return;
      this.selectedPrestataire = prestataire;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.selectedPrestataire = null;
    },

    updateTooltipPosition(event) {
      this.tooltipX = event.pageX + 10;
      this.tooltipY = event.pageY + 10;
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
  },
  computed: {
    ...mapState('stands', ['stands']),
    ...mapState('account', ['customersAccounts']),
  },
  mounted() {
    this.fetchSvgContent();
    this.getStands();
    this.getCustomersAccounts();
  },
};
</script>

<style scoped>
.interactive-map {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #222;
  color: #fff;
}

.svg-container {
  width: 90%;
  max-width: 1200px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.interactive-zone {
  cursor: pointer;
  transition: fill 0.3s ease;
}

.tooltip {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  pointer-events: none;
  white-space: nowrap;
  z-index: 10;
}

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