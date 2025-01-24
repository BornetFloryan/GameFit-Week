<template>
  <div class="services-view">
    <NavView />
    <router-view />
  </div>
</template>

<script>
import NavView from '@/components/NavBar.vue';

export default {
  name: 'ServicesView',
  components: { NavView },
};
</script>

<style scoped>
</style>
