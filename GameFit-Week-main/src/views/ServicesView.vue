<template>
  <div class="services-view">
    <NavView />
    <div v-if="selectedService === 'dedication'">
      <DedicationView />
    </div>
  </div>
</template>

<script>
import NavView from '@/components/NavBar.vue';
import DedicationView from '@/components/Dedication.vue';
import { mapState } from 'vuex';

export default {
  name: 'ServicesView',
  components: { NavView, DedicationView },
  computed: {
    ...mapState('service', ['selectedService'])
  },
};
</script>

<style scoped>
.services-view {
  padding-top: 84px;
}
</style>
