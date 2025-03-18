<template>
  <div class="goodie-page">
    <div class="goodie-list">
      <div class="head-goodies">
        <h2>Les Goodies Disponibles</h2>
      </div>

      <div v-if="goodies.length > 0" class="goodie-cards-container">
        <div class="goodie-card" v-for="goodie in goodies" :key="goodie._id">
          <img :src="goodie.image ? require(`@/assets/img/goodies/${goodie.image}`) : require('@/assets/img/noteam.jpg')" alt="Goodie image" class="goodie-image"/>
          <div class="goodie-info">
            <h3>{{ goodie.name }}</h3>
            <p><strong>Prix : {{ goodie.price ? goodie.price : 'N/A' }} €</strong></p>
            <p v-for="(stock, size) in goodieStock(goodie)" :key="size">Stock ({{ size }}): {{ stock }}</p>
            <button class="add-basket" @click="openSizeSelector(goodie)">Ajouter au Panier</button>
          </div>
        </div>
      </div>

      <div v-else class="no-goodies">
        <p>Aucun goodie disponible pour le moment.</p>
      </div>
    </div>

    <CartSidebar />
    <SizeSelectorModal
        :show="showSizeSelector"
        :sizes="availableSizes"
        @size-selected="addToBasketWithSize"
        @close="showSizeSelector = false"
    />
  </div>
</template>

<script>
import CartSidebar from "@/components/client/services/CartSidebar.vue";
import SizeSelectorModal from "@/components/client/services/SizeSelectorModal.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "GoodiesView",
  components: { CartSidebar, SizeSelectorModal },
  data() {
    return {
      showSizeSelector: false,
      selectedGoodie: null,
      availableSizes: [],
    };
  },
  computed: {
    ...mapState("goodies", ["goodies", "goodieVariations", "goodieSizes"]),
  },
  methods: {
    ...mapActions("goodies", ["getAllGoodies", "getGoodieVariations", "getGoodieSizes"]),
    ...mapActions("basket", ["addItemToBasket"]),

    goodieStock(goodie) {
      let stockBySize = {};
      for (let variation of this.goodieVariations) {
        if (variation.goodie_id === goodie._id) {
          const stock = parseInt(variation.stock, 10);
          let size = this.goodieSizes.find(size => size._id === variation.size_id);
          if (size) {
            stockBySize[size.size] = (stockBySize[size.size] || 0) + (isNaN(stock) ? 0 : stock);
          }
        }
      }
      return stockBySize;
    },

    openSizeSelector(goodie) {
      this.selectedGoodie = goodie;
      this.availableSizes = this.goodieSizes.filter(size =>
          this.goodieVariations.some(variation =>
              variation.goodie_id === goodie._id && variation.size_id === size._id
          )
      );
      if (this.availableSizes.length === 1) {
        this.addToBasketWithSize(this.availableSizes[0]);
      } else {
        this.showSizeSelector = true;
      }
    },

    addToBasketWithSize(size) {
      this.addItemToBasket({
        goodie: this.selectedGoodie,
        size: size.size
      });
      this.showSizeSelector = false;
    },
  },
  watch: {
    goodies: {
      immediate: true,
      handler(newGoodies) {
        newGoodies.forEach(goodie => {
          this.getGoodieVariations(goodie._id);
        });
      }
    },
    goodieVariations: {
      immediate: true,
      handler() {
        this.goodies.forEach(goodie => {
          this.goodieStock(goodie);
        });
      }
    }
  },
  async mounted() {
    await this.getAllGoodies();
    await this.getGoodieSizes();
    for (let goodie of this.goodies) {
      await this.getGoodieVariations(goodie._id);
    }
  },
};
</script>

<style scoped>
.goodie-page {
  display: flex;
  justify-content: space-between;
}

.goodie-list {
  width: 70%;
}

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