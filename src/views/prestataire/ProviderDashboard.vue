<template>
  <div class="provider-dashboard-container">
    <ProviderSideBar />
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import ProviderSideBar from "@/components/prestataire/ProviderSideBar.vue";

export default {
  name: 'ProviderDashboard',
  components: {ProviderSideBar},
};
</script>

<style scoped>
.provider-dashboard-container {
  display: flex;
  height: 100vh;
}

.main-content {
  padding: 20px;
}
</style>
