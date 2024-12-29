<template>
  <div>
    <NavView/>
    <CarouselAccueil/>
    <ContentHome/>
    <InteractiveMap/>
  </div>
</template>

<script>
import NavView from "@/components/NavBar.vue";
import CarouselAccueil from "@/components/CarouselAccueil.vue";
import ContentHome from "@/components/ContentHome.vue";
import InteractiveMap from "@/components/InteractiveMap.vue";

export default {
  name: 'GameFitIntro',
  components: {InteractiveMap, ContentHome, CarouselAccueil, NavView},
};
</script>

<style scoped>

</style>
