<template>
  <div>
    <h1>Répartition des créneaux (Réservés, Annulés)</h1>
    <h2>{{ reservedSlots }} réservations</h2>
    <canvas ref="slotChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: "SlotChart",
  data() {
    return {
      reservedSlots: 0,
      cancelledSlots: 3, // Ajustez en fonction des données réelles
      freeSlots: 0,
    };
  },
  mounted() {
    const reservations = require("@/datasource/data.js").stands_reservations;

    // Calcul des créneaux
    const totalSlots = 24; // Exemple d'un total fixe, à ajuster selon vos besoins
    this.reservedSlots = reservations.length; // Créneaux réservés
    this.freeSlots = totalSlots - this.reservedSlots - this.cancelledSlots; // Créneaux libres

    // Création du graphique
    new Chart(this.$refs.slotChart, {
      type: "pie",
      data: {
        labels: [ "Libres", "Annulés"],
        datasets: [
          {
            label: "Répartition des créneaux",
            data: [ this.freeSlots, this.cancelledSlots],
            backgroundColor: [ "#36A2EB", "#FFCE56"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    });
  },
};
</script>

<style scoped>
canvas {
  max-width: 100%;
  max-height: 85%;
}

</style>
