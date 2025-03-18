<template>
  <div class="goodie-list">

    <div class="head-goodies">
      <h2>Les Goodies Disponibles</h2>
      <router-link to="/panier">
        <button class="view-cart-button">Voir le Panier</button>
      </router-link>
    </div>

    <div v-if="goodies.length > 0" class="goodie-cards-container">
      <div class="goodie-card" v-for="goodie in goodies" :key="goodie._id">

        <img :src="goodie.image ? require(`@/assets/img/goodies/${goodie.image}`) : require('@/assets/img/noteam.jpg')" alt="Goodie image" class="goodie-image"/>

        <div class="goodie-info">
          <h3>{{ goodie.name }}</h3>
          <p><strong>Prix : {{ goodie.price ? goodie.price : 'N/A' }} €</strong></p>
          <p v-for="(stock, size) in goodieStock(goodie)" :key="size">Stock ({{ size }}): {{ stock }}</p>
          <button class="add-basket" @click="addToBasket(goodie)">Ajouter au Panier</button>
        </div>
      </div>
    </div>

    <div v-else class="no-goodies">
      <p>Aucun goodie disponible pour le moment.</p>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "GoodiesView",
  computed: {
    ...mapState("goodies", ["goodies", "goodieVariations", "goodiesSizes"]),
  },
  methods: {
    ...mapActions("goodies", ["getAllGoodies", "getGoodieVariations", "getGoodiesSizes"]),

    goodieStock(goodie) {
      let stockBySize = {};
      for (let variation of this.goodieVariations) {
        if (variation.goodie_id === goodie._id) {
          let size = this.goodiesSizes.find(size => size._id === variation.size_id).size;
          stockBySize[size] = (stockBySize[size] || 0) + parseInt(variation.stock, 10);
        }
      }
      return stockBySize;
    },

    addToBasket(goodie) {
      let basket = JSON.parse(localStorage.getItem("basket")) || [];
      let existingItem = basket.find(item => item._id === goodie._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        basket.push({ ...goodie, quantity: 1 });
      }

      localStorage.setItem("basket", JSON.stringify(basket));
      alert("Goodie ajouté au panier !");
    },
  },
  async mounted() {
    await this.getAllGoodies();
    await this.getGoodieVariations();
    await this.getGoodiesSizes();
  },
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

button.add-basket:hover {
  background-color: #0056b3;
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

.no-goodies {
  text-align: center;
  font-size: 18px;
  color: #555;
  margin-top: 20px;
}
</style>