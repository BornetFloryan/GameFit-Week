<template>
  <div class="interactive-map" @mousemove="updateTooltipPosition">
    <h2>{{ title }}</h2>
    <div class="date-picker-container">
      <label for="reservation-date">{{ dateTitle }}</label>
      <br>
      <input @change="updateSelectedDate" type="date" id="reservation-date" v-model="selectedDate" :min="minDate"
             :max="maxDate"/>
    </div>
    <div ref="svgContainer" class="svg-container" v-html="svgContent"></div>
  </div>
</template>

<script>
export default {
  name: "InteractiveMap",
  props: {
    title: {
      type: String,
      required: true
    },
    minDate: {
      type: String,
    },
    maxDate: {
      type: String,
    },
    dateTitle: {
      type: String,
    },
  },
  data() {
    return {
      svgContent: "",
      selectedDate: this.minDate,
    };
  },
  methods: {
    async fetchSvgContent() {
      try {
        const response = await fetch(require("@/assets/svg/Carte GFW.svg"));
        if (!response.ok) throw new Error("Erreur lors du chargement du SVG");

        let svg = await response.text();

        svg = svg.replace(/<rect id="(Stand[^"]*)"/g, '<rect id="$1" class="interactive-zone"');
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
      } else {
        console.warn("SVG element not found");
      }
    },

    handleZoneHover(event) {
      this.$emit("zone-hover", event);
    },

    handleZoneLeave(event) {
      this.$emit("zone-leave", event);
    },

    handleZoneClick(event) {
      this.$emit("zone-click", event);
    },

    updateTooltipPosition(event) {
      this.$emit("update-tooltip-position", event);
    },

    updateSelectedDate() {
      this.$emit("update-selected-date", this.selectedDate);
    },
  },
  computed: {},
  mounted() {
    this.fetchSvgContent();
  },
};
</script>

<style scoped>
h2 {
  color: #fff;
  text-align: center;
  margin: 20px 0;
}

.interactive-map {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #222;
  color: #fff;
  min-height: 100vh;
  box-sizing: border-box;
}

.svg-container {
  width: 100%;
  max-width: 1200px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.date-picker-container {
  margin: 20px 0;
  text-align: center;
}

.date-picker-container label {
  margin-right: 10px;
  font-weight: bold;
}

.date-picker-container input {
  padding: 5px;
  font-size: 16px;
}

@media (max-width: 768px) {
  .interactive-map {
    padding: 10px;
  }

  .date-picker-container input {
    width: 100%;
    font-size: 14px;
  }
}
</style>