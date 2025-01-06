<template>
  <div class="food-list">
    <div class="head-goodies">
      <h2>Nos Nourritures Disponibles</h2>
      <router-link to="">
        <button class="view-cart-button">Voir le Panier</button>
      </router-link>
    </div>

    <!-- Conteneur des cartes de nourritures -->
    <div class="food-cards-container">
      <div class="food-card" v-for="item in foodItems" :key="item._id">
        <img :src="item.food.img || require('@/assets/img/noteam.jpg')" alt="Food image" class="food-image" />
        <div class="food-info">
          <h3>{{ item.food.name }}</h3>
          <p><strong>Prix: {{ item.food.price }} €</strong></p>
          <p>Stock : {{ item.quantity }}</p>
          <p>Date de vente: {{ formatDate(item.date) }}</p>
          <button class="add-board">Ajouter au Plateau</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Importation des données ou source de données (ex: une API, une liste statique)
import { foodItems } from "@/datasource/data.js"; // Remplace par ta source de données réelle

export default {
  name: "RestaurantView",
  data() {
    return {
      foodItems: foodItems,  // Liste des nourritures disponibles
    };
  },
  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      return new Date(date).toLocaleDateString("fr-FR", options);
    },
  },
};
</script>

<style scoped>
.food-list {
  max-width: 1200px; /* Augmenter la largeur maximale du conteneur */
  margin: 20px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  border-radius: 8px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.food-cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.food-card {
  width: 250px; /* Augmenter la largeur des cartes */
  margin: 10px;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
}

.food-card:hover {
  transform: scale(1.05);
}

.food-image {
  max-width: 180px; /* Augmenter la taille de l'image */
  max-height: 180px;
  border-radius: 8px;
}

.food-info {
  text-align: center;
  margin-top: 10px;
}

.food-info h3 {
  margin: 0;
  font-size: 1.2em;
  color: #333;
}

.food-info p {
  color: #555;
}

.food-info strong {
  font-size: 1.1em;
  color: #007bff;
}

button.add-board {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button.view-cart-button {
  background-color: #28a745;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.view-cart-button:hover {
  background-color: #218838;
}

.head-goodies {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
