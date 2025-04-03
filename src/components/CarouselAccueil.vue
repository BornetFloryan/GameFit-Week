<template>
  <div :style="carouselBackground" class="container-carousel">
    <div class="carousel-items" v-if="slides.length > 0">
      <h1 v-if="content" v-html="localizedContentTitle"></h1>
      <p class="subtitle" v-if="content" v-html="localizedContentDescription"></p>
    </div>
    <div class="carousel-items" v-if="slides.length > 0">
      <h2>{{ localizedCurrentSlideTitle }}</h2>
      <p v-html="localizedCurrentSlideText"></p>
      <router-link :to="{ path: currentSlide.link }">
        <p class="router-link">{{ localizedCurrentSlideLinkText }}</p>
      </router-link>
    </div>

    <div class="carousel-controls" v-if="slides.length > 0">
      <button @click="prevSlide" class="btn"><i class="fa-solid fa-arrow-left"></i></button>
      <button @click="nextSlide" class="btn"><i class="fa-solid fa-arrow-right"></i></button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: 'CarouselAccueil',
  data: () => ({
    currentIndex: 0,
    slides: [],
  }),
  methods: {
    ...mapActions('home', ['getContentHome']),
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    },
    updateSlides() {
      this.slides = [
        {
          imageSrc: require('@/assets/img/home/slide1.jpg'),
          title: this.$t('home.carousel.slides.slide1.title'),
          text: this.$t('home.carousel.slides.slide1.text'),
          link: '/services/dedication/dedication-home',
          linkText: this.$t('home.carousel.slides.slide1.link'),
        },
        {
          imageSrc: require('@/assets/img/home/slide2.jpg'),
          title: this.$t('home.carousel.slides.slide2.title'),
          text: this.$t('home.carousel.slides.slide2.text'),
          link: '/services/stream',
          linkText: this.$t('home.carousel.slides.slide2.link'),
        },
        {
          imageSrc: require('@/assets/img/home/slide3.jpg'),
          title: this.$t('home.carousel.slides.slide3.title'),
          text: this.$t('home.carousel.slides.slide3.text'),
          link: '/services/brackets',
          linkText: this.$t('home.carousel.slides.slide3.link'),
        }
      ];
    }
  },
  async mounted() {
    await this.getContentHome();
    this.updateSlides();
    setInterval(() => {
      this.nextSlide();
    }, 8000);
  },
  computed: {
    ...mapState('home', ['content_home']),
    content() {
      return this.content_home.find(item => item.section === 'main');
    },
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
      return {
        backgroundColor: '#f1f1f1',
        width: '100%',
        height: '86vh'
      };
    },
    currentSlide() {
      return this.slides[this.currentIndex] || {};
    },
    localizedContentTitle() {
      return this.$i18n.locale === 'en' ? this.$t('home.main.title') : this.content.title;
    },
    localizedContentDescription() {
      return this.$i18n.locale === 'en' ? this.$t('home.main.description') : this.content.description;
    },
    localizedCurrentSlideTitle() {
      return this.$i18n.locale === 'en' ? this.currentSlide.title : this.currentSlide.title;
    },
    localizedCurrentSlideText() {
      return this.$i18n.locale === 'en' ? this.currentSlide.text : this.currentSlide.text;
    },
    localizedCurrentSlideLinkText() {
      return this.$i18n.locale === 'en' ? this.currentSlide.linkText : this.currentSlide.linkText;
    }
  },
  watch: {
    '$i18n.locale'() {
      this.updateSlides();
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

.carousel-items h1, .carousel-items h2 {
  color: #f1f1f1;
}

.carousel-items h1 {
  font-size: 3rem;
  margin-bottom: 20px;
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