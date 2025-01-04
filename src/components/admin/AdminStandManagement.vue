<template>
  <div>
    <InteractiveMap :title="title"
                    dateTitle="Date de l'événement"
                    :minDate="minDate"
                    :maxDate="maxDate"
                    @zone-hover='handleZoneHover'
                    @zone-leave='handleZoneLeave'
                    @zone-click='handleZoneClick'
                    @update-tooltip-position='updateTooltipPosition'
    />
    <div v-if="tooltipVisible" class="tooltip" :style="{ top: tooltipY + 'px', left: tooltipX + 'px' }">
      {{ tooltipText }}
    </div>
    <div
        v-if="stand"
        class="info-card"
        :style="{ top: cardY + 'px', left: cardX + 'px' }"
        @mouseenter="handleCardMouseEnter"
        @mouseleave="handleCardMouseLeave"
    >
      <h3>{{ stand.name }}</h3>
      <p>Id : {{ stand._id }}</p>
      <p>Prix : {{ stand.price }}</p>
      <p>Pavillon : {{ stand.pavillon_id }}</p>
      <div class="actions-container">
        <router-link :to="'/admin-dashboard/admin-stand-management/' + stand._id">
          <button class="btn-action">Modifier</button>
        </router-link>
        <router-link :to="'/admin-dashboard/admin-add-stand-reservation/' + stand._id">
          <button class="btn-action">Faire une réservation</button>
        </router-link>
        <router-link :to="{ name: 'admin-stand-reservations', query: { stand_id: stand._id } }">
          <button class="btn-action">Voir les réservations</button>
        </router-link>
      </div>
    </div>
    <div class="button-container">
      <router-link :to="{ name: 'admin-stand-reservations'}">
        <button class="btn-action">Voir toutes les réservations</button>
      </router-link>
    </div>
    <AdminStandTable
        title="Tableau des stands"
        :headers="headers"
        :fields="fields"
        :modifyName="modifyName"
        :enableRes="enableRes"
        :enableDelete="enableDelete"
        :dataSource="dataSource"
        @delete="handleDeleteStand"
    />
  </div>
</template>

<script>
import InteractiveMap from "@/components/InteractiveMap.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import AdminStandTable from "@/components/admin/AdminStandTable.vue";

export default {
  name: 'AdminStandManagement',
  components: { AdminStandTable, InteractiveMap },
  data() {
    return {
      title: "Gestion des stands",
      minDate: '2025-07-07',
      maxDate: '2025-07-12',
      tooltipVisible: false,
      tooltipText: "",
      tooltipX: 0,
      tooltipY: 0,
      stand: null,
      cardX: 0,
      cardY: 0,
      headers: ['Id', 'Nom', 'Prix', 'Pavillon'],
      fields: ['_id', 'name', 'price', 'pavillon_id'],
      modifyName: 'admin-stand-management-edit',
      enableRes: true,
      enableDelete: false,
      dataSource: [],
    };
  },
  computed: {
    ...mapState('stands', ['stands', 'standsReservations']),
    ...mapGetters('stands', ['getStandReservationsByStandId']),
  },
  methods: {
    ...mapActions('stands', ['getStands', 'getStandsReservations', 'deleteStand', 'getPavillons']),

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

      if (!this.stands) {
        console.error("stands is not defined");
        return;
      }

      this.stand = this.stands.find(stand => stand._id === standNumber);

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
        this.stand = null;
      }
    },

    async handleDeleteStand(_id) {
      const reservations = this.getStandReservationsByStandId(_id);
      if (reservations.length > 0) {
        alert(`Impossible de supprimer le stand ${parseInt(_id) + 1}. Il y a des réservations avec les identifiants suivants : ${reservations.map(res => res._id).join(', ')}`);
        return;
      }
      if (confirm(`Êtes-vous sûr de vouloir supprimer le stand ${parseInt(_id) + 1} ?`)) {
        await this.deleteStand(_id);
        await this.getStands();
      }
    }
  },
  async mounted() {
    await this.getStands();
    await this.getPavillons();
    await this.getStandsReservations();
    this.dataSource = this.stands;
  },
};
</script>

<style scoped>
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

.button-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.btn-action {
  padding: 0.5em 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.3s ease;
  margin-bottom: 1em;
  margin-right: 1em;
}

.btn-action:hover {
  background-color: #0056b3;
}
</style>