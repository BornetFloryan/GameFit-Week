<template>
  <div class="content-accueil">
    <div class="explain">
      <h2 v-if="content.explain" v-html="localizedExplainTitle"></h2>
      <p v-if="content.explain" v-html="localizedExplainDescription"></p>
    </div>

    <div class="card-container">
      <div class="card" v-for="(card, index) in content.cards" :key="index">
        <div class="card-content">
          <div v-if="card" class="card-content-text">
            <h3 v-html="localizedCardTitle(card, index)"></h3>
            <p v-html="localizedCardDescription(card, index)"></p>
          </div>
          <img :src="getImageUrl(card.image_url)" :alt="card.title">
        </div>
      </div>
    </div>

    <router-link :to="{ name: 'ticketing' }" class="btn">{{ localizedJoinButton }}</router-link>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
  name: 'ContentHome',
  computed: {
    ...mapState('home', ['content_home']),
    content() {
      const explain = this.content_home.find(item => item.section === 'explain') || {title: '', description: ''};
      const cards = this.content_home.filter(item => item.section === 'card').map(card => ({
        ...card,
        title: card.title || '',
        description: card.description || '',
        image_url: card.image_url || ''
      }));
      return {explain, cards};
    },
    localizedExplainTitle() {
      return this.$i18n.locale === 'en' ? this.$t('home.explain.title') : this.content.explain.title;
    },
    localizedExplainDescription() {
      return this.$i18n.locale === 'en' ? this.$t('home.explain.description') : this.content.explain.description;
    },
    localizedJoinButton() {
      return this.$i18n.locale === 'en' ? this.$t('home.join_button') : 'Rejoignez-nous';
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
    },
    localizedCardTitle(card, index) {
      return this.$i18n.locale === 'en' ? this.$t(`home.cards[${index}].title`) : card.title;
    },
    localizedCardDescription(card, index) {
      return this.$i18n.locale === 'en' ? this.$t(`home.cards[${index}].description`) : card.description;
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