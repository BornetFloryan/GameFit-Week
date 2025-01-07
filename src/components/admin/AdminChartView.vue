<template>
  <div>
    <h1>Nombre de tickets Achetés par Date</h1>
    <canvas ref="testChartadmin"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import { format } from "date-fns"; // Importer la fonction format de date-fns

// Charger les données depuis data.js via require
const { dailyTickets } = require("@/datasource/data.js");

Chart.register(...registerables);

export default {
  name: "testChartadmin",
  mounted() {
    // Formater les dates avec date-fns (par exemple: 'dd/MM/yyyy')
    const formattedDates = dailyTickets.map((ticket) =>
        format(new Date(ticket.date), "dd/MM/yyyy") // Format personnalisé
    );

    new Chart(this.$refs.testChartadmin, {
      type: "line", // Utilisation du graphique linéaire
      data: {
        labels: formattedDates, // Utilisation des dates formatées
        datasets: [
          {
            label: "Tickets achetés",
            data: dailyTickets.map((ticket) => ticket.tickets),
            fill: false, // Ne pas remplir sous la ligne
            borderColor: "rgb(51, 114, 20)",
            tension: 0, // Lissage de la ligne
          },
        ],
      },
    });
  },
};
</script>

<style scoped>
canvas {
  max-width: 100%;
  max-height: 93%;
}
</style>
