<template>
  <div class="provider-info">
    <div class="provider-card">
      <div class="image-container">
        <img :src="require('@/assets/img/' + prestataire.picture)" alt="Prestataire" class="provider-image" v-if="prestataire.picture" />
      </div>
      <h2 class="provider-name">{{ prestataire.name }}</h2>
      <p class="provider-description">{{ prestataire.description }}</p>

      <router-link :to="{ name: 'services', params: { selectedAnimator: prestataire } }" @click="setSelectService('dedication')">
        <button class="btn-more-info">Réserver une dédicace</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "PrestataireInfo",
  props: {
    prestataire: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions('service', ['setSelectService'])
  }
};
</script>

<style scoped>
.provider-info {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  height: 80vh;
  overflow: hidden;
}

.provider-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 90%;
  max-width: 600px;
  text-align: center;
  box-sizing: border-box;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
}

.provider-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.image-container {
  max-width: 100%;
  height: auto;
  border: 4px solid #4caf50;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.provider-image {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  max-height: 250px;
}

.provider-name {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  letter-spacing: 1px;
  word-wrap: break-word;
}

.provider-description {
  font-size: 18px;
  color: #666;
  line-height: 1.7;
  text-align: justify;
  margin-bottom: 30px;
  word-wrap: break-word;
}

.provider-card::after {
  content: '';
  display: block;
  height: 4px;
  width: 60px;
  background-color: #4caf50;
  margin: 30px auto;
}

@media (max-width: 800px) {
  .provider-card {
    padding: 20px;
  }

  .provider-name {
    font-size: 24px;
  }

  .provider-description {
    font-size: 16px;
  }

  .provider-image {
    max-height: 200px;
  }
}

@media (max-width: 600px) {
  .provider-card {
    padding: 15px;
  }

  .provider-name {
    font-size: 20px;
  }

  .provider-description {
    font-size: 14px;
  }

  .provider-image {
    max-height: 150px;
  }
}

.btn-more-info {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #1E90FF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-more-info:hover {
  background-color: #4682B4;
}
</style>
