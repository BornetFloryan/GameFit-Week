<template>
  <div class="content-accueil">
    <div class="explain">
      <h2 v-if="content.explain" v-html="content.explain.title"></h2>
      <p v-if="content.explain" v-html="content.explain.description"></p>
    </div>

    <div class="card-container">
      <div class="card" v-for="(card, index) in content.cards" :key="index">
        <div class="card-content">
          <div v-if="card" class="card-content-text">
            <h3 v-html="card.title"></h3>
            <p v-html="card.description"></p>
          </div>
          <img v-if="card.image_url" :src="getImageUrl(card.image_url)" :alt="card.title">
          <p v-else>Aucune image disponible</p>
        </div>
      </div>
    </div>

    <router-link :to="{ name: 'ticketing' }" class="btn">{{ $t('home.join_button') }}</router-link>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ContentHome',
  computed: {
    ...mapState('home', ['content_home']),
    content() {
      const explain = {
        title: this.$t('home.explain.title'),
        description: this.$t('home.explain.description'),
      };
      
      const cards = this.content_home
        .filter(item => item.section === 'card')
        .map((card, index) => ({
          title: this.$t(`home.cards[${index}].title`),
          description: this.$t(`home.cards[${index}].description`),
          image_url: card.image_url || null,
        }));

      return { explain, cards };
    }
  },
  methods: {
    ...mapActions('home', ['getContentHome']),
    getImageUrl(imageUrl) {
      try {
        return require(`@/assets/img/home/${imageUrl}`);
      } catch (e) {
        console.error(`Cannot find module '@/assets/img/home/${imageUrl}'`);
        return '';
      }
    }
  },
  async mounted() {
    await this.getContentHome();
  }
};
</script>

<style scoped>
.content-accueil {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 20px auto;
  width: 70vw;
}

.card-container {
  display: flex;
  justify-content: space-evenly;
  gap: 20px;
  flex-wrap: wrap;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  background-color: #3c4c59;
  color: white;
  flex-shrink: 0;
}

.card-content img {
  width: 100%;
  aspect-ratio: 16/9;
}

.btn {
  margin: 0 auto;
  padding: 10px 40px;
  border-radius: 5px;
  background-color: #00afea;
  color: #f1f1f1;
  border: none;
  font-size: 20px;
  width: fit-content;
  cursor: pointer;
}

span {
  color: #00afea;
}
</style>
