<template>
  <div :style="carouselBackground" class="container-carousel">
    <div class="carousel-items" v-if="slides.length > 0">
      <h1>Bienvenue à <span>GameFit Week</span></h1>
      <p class="subtitle">
        L’événement incontournable qui fusionne sport et esport dans une expérience inédite et immersive.
      </p>
    </div>
    <div class="carousel-items" v-if="slides.length > 0">
      <h1>{{ slides[currentIndex].title }}</h1>
      <p>{{ slides[currentIndex].text }}</p>
      <router-link :to="slides[currentIndex].link" class="router-link">Voir plus</router-link>
    </div>

    <div class="carousel-controls" v-if="slides.length > 0">
      <button @click="prevSlide" class="btn"><i class="fa-solid fa-arrow-left"></i></button>
      <button @click="nextSlide" class="btn"><i class="fa-solid fa-arrow-right"></i></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarouselAccueil',
  data: () => ({
    currentIndex: 0,
    slides: [],
    routes: [],
  }),
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    },
  },
  mounted() {
    for (let i = 1; i <= 2; i++) {
      this.slides.push({
        imageSrc: require(`@/assets/img/slide${i}.jpg`),
        title: `Title ${i}`,
        text: `Description for slide ${i}`,
        link: this.routes[i-1] || '/',
      });
    }
    setInterval(() => {
      this.nextSlide();
    }, 8000);
  },
  computed: {
    carouselBackground() {
      if (this.slides.length > 0) {
        return {
          backgroundImage: `url(${this.slides[this.currentIndex].imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '86vh'
        };
      }
      // Default style if slides are not loaded
      return {
        backgroundColor: '#f1f1f1',
        width: '100%',
        height: '86vh'
      };
    }
  }
}
</script>

<style scoped>
.container-carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  min-height: 86vh;
}

.container-carousel .carousel-items {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  color: #f1f1f1;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 70px;
  border-radius: 5px;
}

.carousel-items h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.carousel-items h1 span {
  color: #00afea;
}

.carousel-items .subtitle {
  font-size: 1.2rem;
  font-style: italic;
  margin-bottom: 40px;
}

.carousel-items .router-link {
  padding: 5px 40px;
  border-radius: 5px;
  background-color: #00afea;
}

.container-carousel .carousel-controls {
  display: flex;
  gap: 30px;
}

.carousel-controls .btn {
  padding: 5px 40px;
  border-radius: 5px;
  background-color: #00afea;
  color: #f1f1f1;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>