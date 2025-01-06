<template>
  <div class="goodie-list">

    <div class="head-goodies">
      <h2>Nos Goodies Disponibles</h2>
      <router-link to="">
        <button class="view-cart-button">Voir le Panier</button>
      </router-link>
    </div>

    <!-- Conteneur des cartes -->
    <div class="goodie-cards-container">
      <!-- Affichage des cartes pour chaque goodie -->
      <div class="goodie-card" v-for="sale in sales" :key="sale._id">
        <!-- Image du goodie -->
        <img :src="sale.goodie.imageUrl || require('@/assets/img/noteam.jpg')" alt="Goodie image" class="goodie-image"/>

        <!-- Infos du goodie -->
        <div class="goodie-info">
          <h3>{{ sale.goodie.name }}</h3>
          <p><strong>Prix : {{ sale.goodie.price }} €</strong></p>
          <p>Stock : {{ sale.quantity }}</p>
          <button class="add-basket" @click="addToBasket(sale)">Ajouter au Panier</button>
        </div>
      </div>
    </div>

    <!-- Bouton pour accéder au panier -->

  </div>
</template>

<script>
// Données des ventes de goodies
import {sale} from "@/datasource/data.js"; // Importation de la source des données de ventes

export default {
  name: "GoodiesView",
  data() {
    return {
      sales: sale,  // Liste des ventes de goodies disponibles
      basket: []  // Panier de l'utilisateur
    };
  },
  methods: {
    // Fonction pour ajouter un produit au panier
    addToBasket(sale) {
      this.basket.push(sale);
      console.log("Panier:", this.basket);
    }
  }
};
</script>

<style scoped>
.goodie-list {
  max-width: 1000px;
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

.goodie-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px;
}

.goodie-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.goodie-card:hover {
  transform: scale(1.05);
}

.goodie-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 2px solid #ddd;
}

.goodie-info {
  padding: 15px;
  text-align: center;
}

.goodie-info h3 {
  font-size: 1.2em;
  color: #333;
}

.goodie-info p {
  color: #555;
  margin: 5px 0;
}

.goodie-info strong {
  font-size: 1.1em;
  color: #007bff;
}

button.add-basket {
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
