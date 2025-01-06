<template>
  <div>
    <NavView />
    <router-view></router-view> <!-- Les vues enfants (goodies, restaurant) seront rendues ici -->
  </div>
</template>

<script>
import NavView from "@/components/NavBar.vue";

export default {
  name: "PrestationLayout",
  components: {NavView},
};
</script>

<style scoped>
/* Ajoutez des styles pour le composant */
</style>
