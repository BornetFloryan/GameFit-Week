<template>
  <div>
    <NavView />
    <CarouselAccueil />
  </div>
</template>

<script>
import NavView from '@/components/NavBar.vue';
import CarouselAccueil from "@/components/CarouselAccueil.vue";

export default {
  name: 'AccueilView',
  components: {NavView, CarouselAccueil},
  props: {titles: Array},
  };
</script>
