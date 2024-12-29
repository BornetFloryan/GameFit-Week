<template>
  <div class="services-view">
    <NavView />
    <div v-if="selectedService === 'dedication'">
      <DedicationView />
    </div>
    <div v-if="selectedService === 'stream'">
      <StreamView />
    </div>
    <div v-if="selectedService === 'tournois'">
      <BracketsDisplay />
    </div>
  </div>
</template>

<script>
import NavView from '@/components/NavBar.vue';
import DedicationView from '@/components/Dedication.vue';
import StreamView from "@/components/StreamView.vue";
import BracketsDisplay from "@/components/BracketsDisplay.vue";
import { mapState } from 'vuex';

export default {
  name: 'ServicesView',
  components: { NavView, DedicationView, StreamView, BracketsDisplay },
  computed: {
    ...mapState('service', ['selectedService'])
  },
};
</script>

<style scoped>
</style>
