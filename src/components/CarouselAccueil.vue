<template>
  <div :style="carouselBackground" class="container-carousel">
    <div class="carousel-items" v-if="slides.length > 0">
      <h1>Bienvenue à <span>GameFit Week</span></h1>
      <p class="subtitle">
        L’événement incontournable qui fusionne sport et esport dans une expérience inédite et immersive <span>du 7 au 12 juillet 2025.</span>
      </p>
    </div>
    <div class="carousel-items" v-if="slides.length > 0">
      <h2>{{ slides[currentIndex].title }}</h2>
      <p v-html="formattedText"></p>
      <router-link :to="{ path: slides[currentIndex].link }">
        <p class="router-link">Voir plus</p>
      </router-link>
    </div>

    <div class="carousel-controls" v-if="slides.length > 0">
      <button @click="prevSlide" class="btn"><i class="fa-solid fa-arrow-left"></i></button>
      <button @click="nextSlide" class="btn"><i class="fa-solid fa-arrow-right"></i></button>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

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
    this.slides = [
      {
        imageSrc: require('@/assets/img/slide1.jpg'),
        title: 'Réservation de Dédicaces',
        text: 'Rencontrez vos idoles de l’esport et du sport en personne ! ' +
            '\nRéservez une séance de dédicaces privée et repartez avec un souvenir personnalisé.',
        link: '/services/dedication/dedication-home',
      },
      {
        imageSrc: require('@/assets/img/slide2.jpg'),
        title: 'Diffusion en direct',
        text: 'Suivez GameFit Week en temps réel avec nos streams en haute définition. ' +
            '\nNe manquez aucune compétition, interview ou moment clé, où que vous soyez.',
        link: '/services/stream',
      },
      {
        imageSrc: require('@/assets/img/slide3.jpg'),
        title: 'Les Tournois',
        text: "Assistez aux matchs palpitants entre équipes sportives ou esportives lors de GameFit Week. " +
            "\nSuivez l'intensité de la compétition et soutenez vos équipes favorites dans des affrontements spectaculaires.",
        link: '/services/brackets',
      }
    ];
    setInterval(() => {
      this.nextSlide();
    }, 8000);
  },
  computed: {
    ...mapState('service', ['selectedService']),
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
    },
    formattedText() {
      return this.slides[this.currentIndex].text.replace(/\n/g, '<br>');
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
  text-align: center;
}

.container-carousel .carousel-items {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  color: #f1f1f1;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px 70px;
  border-radius: 5px;
  text-align: center;
}
.carousel-items h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.carousel-items h1 span {
  color: #00afea;
}

.carousel-items p span {
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