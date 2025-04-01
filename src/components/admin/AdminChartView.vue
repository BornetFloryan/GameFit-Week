<template>
  <div class="chart-container">
    <GoodiesSizeChart />
    <DedicationChart />
  </div>
</template>

<script>
import GoodiesSizeChart from "@/components/admin/charts/GoodiesSizeChart.vue";
import DedicationChart from "@/components/admin/charts/DedicationChart.vue";

export default {
  name: "AdminChartView",
  components: {
    GoodiesSizeChart,
    DedicationChart,
  },
};
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
}
</style>