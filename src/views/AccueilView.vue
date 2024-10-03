<template >
  <div>
    <NavView />
    <div class = "container">
      <div class = "carousel">
        <div class = "carousel-inner">
          <div class = "carousel-item">
            <img :src="slides[currentIndex].imageSrc"
                 :alt="slides[currentIndex].alt"
                 :sizes="slides[currentIndex].sizes">
            <div class = "carousel-caption">
              <h3>{{slides[currentIndex].title}}</h3>
              <p>{{slides[currentIndex].text}}</p>
              <a :href="slides[currentIndex].link" class = "btn btn-primary">Voir plus</a>
            </div>
            <div class = "carousel-controls">
              <button @click="prevSlide" class = "btn btn-primary">Précédent</button>
              <button @click="nextSlide" class = "btn btn-primary">Suivant</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavView from '@/components/NavBar.vue';

export default {
  name: 'AccueilView',
  components: {NavView},
  props: { titles: Array },

  data : () => ({
    currentIndex: 0,
    slides: [],
    carouselProperties: {},
    file: '@/assets/img/',
  }),

  methods : {
    nextSlide(){
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    },
    prevSlide(){
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    },
  },
  mounted() {
    for(let i = 1; i <= 2 ; i++){
      this.slides.push({
        imageSrc: require(`@/assets/img/slide${i}.jpg`),
        alt: `Slide ${i}`,
        sizes: '(max-width: 600px) 480px',
        title: `Title ${i}`,
        text: `Description for slide ${i}`,
        link: `#`,
        variantItemId: `${i}`,
      });
    }
    setInterval(() => {
      this.nextSlide();
    }, 8000);
  }
};
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-inner {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-item img {
  object-fit: cover;
}

.carousel-caption {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
}

.carousel-controls {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
}
</style>