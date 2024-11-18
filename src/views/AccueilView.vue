<template>
  <div>
    <NavView/>
    <CarouselAccueil/>
    <ContentHome/>
  </div>
</template>

<script>
import NavView from "@/components/NavBar.vue";
import CarouselAccueil from "@/components/CarouselAccueil.vue";
import ContentHome from "@/components/ContentHome.vue";

export default {
  name: 'GameFitIntro',
  components: {ContentHome, CarouselAccueil, NavView},
};
</script>

<style scoped>

</style>
