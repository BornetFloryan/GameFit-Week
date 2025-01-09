<template>
  <div class="prestataire-info-view">
    <NavView />
    <router-view />
  </div>
</template>

<script>
import NavView from "@/components/NavBar.vue";

export default {
  name: 'PrestataireInfoView',
  components: {NavView},
}
</script>

<style scoped>
</style>