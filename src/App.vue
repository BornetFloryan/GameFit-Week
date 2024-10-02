<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import NavBar from '@/components/NavBar.vue';


// export default {
//   name: 'App',
//   components: {
//     NavBar,
//   },
//
//   data: () => ({
//     currentIndex: 0,
//     slides: [],
//     carouselProperties: {},
//   }),
//
//   methods: {
//     nextSlide() {
//       this.currentIndex = (this.currentIndex + 1) % this.slides.length;
//     },
//
//     prevSlide() {
//       this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
//     },
//   },
//
//   mounted() {
//     for(let i = 1; i <= 2 ; i++){
//       this.slides.push({
//         imageSrc: require(`@/assets/slide${i}.jpg`),
//         alt: `Slide ${i}`,
//         sizes: '(max-width: 600px) 480px',
//         title: `Title ${i}`,
//         text: `Description for slide ${i}`,
//         link: `#`,
//         variantItemId: `${i}`,
//       });
//     }
//     setInterval(() => {
//       this.nextSlide();
//     }, 8000);
//   }
// };
</script>

<!--<style scoped>-->
<!--#app {-->
<!--  background-color: black;-->
<!--}-->
<!--h1{-->
<!--  color: white;-->
<!--  text-align: center;-->

<!--}-->
<!--.carousel {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--}-->
<!--.slides {-->
<!--  list-style-type: none;-->
<!--  padding: 0;-->
<!--  margin: 0;-->
<!--}-->
<!--.component-content {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--}-->
<!--.carousel > h1 {-->
<!--  position: absolute;-->
<!--  margin-top: 10vh;-->
<!--  top: 0;-->
<!--  color: white;-->
<!--  text-align: center;-->
<!--  z-index: 1;-->
<!--}-->
<!--.slide-img {-->
<!--  width: 100dvw;-->
<!--  height: 100dvh;-->
<!--  object-fit: cover;-->
<!--  opacity: 0.4;-->
<!--}-->
<!--button {-->
<!--  margin-top: 10px;-->
<!--  cursor: pointer;-->
<!--  padding: 10px;-->
<!--  font-size: 16px;-->
<!--}-->
<!--.button-container {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--}-->
<!--.text-overlay{-->
<!--  position: absolute;-->
<!--  text-align: center;-->
<!--  color: white;-->
<!--}-->
<!--.text-overlay h1{-->
<!--  font-size: 3em;-->
<!--}-->
<!--.btn-solid-primary{-->
<!--  margin-top: 5vh;-->
<!--}-->
<!--.btn-solid-primary a{-->
<!--  color: white;-->
<!--  text-decoration: none;-->
<!--}-->
<!--</style>-->

<style>
*, ::before, ::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  background-color: #f4f4f4;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>