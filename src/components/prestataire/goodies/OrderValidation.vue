<template>
  <div class="order-validation">
    <h2>Valider la récupération d'une commande</h2>
    <form @submit.prevent="fetchOrderDetails">
      <label for="basketId">ID du panier :</label>
      <input type="text" v-model="basketId" required />
      <button type="submit">Rechercher</button>
    </form>
    <div v-if="order">
      <h3>Détails de la commande</h3>
      <ul>
        <li v-for="item in order.items" :key="item._id">
          {{ item.name }} - {{ item.size }} - {{ item.price }} € x {{ item.quantity }}
        </li>
      </ul>
      <p><strong>Total:</strong> {{ calculateTotal(order.items) }} €</p>
      <button @click="validateOrder">Valider la récupération</button>
      <button @click="goBack">Retour</button>
    </div>
    <p v-else-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import basketService from "@/services/basket.service";
import goodiesService from "@/services/goodies.service";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "OrderValidation",
  data() {
    return {
      basketId: "",
      order: null,
      errorMessage: "",
    };
  },
  computed: {
    ...mapGetters('basket', ['getBasketById']),
    ...mapState('goodies', ['goodies', 'goodieSizes'])
  },
  methods: {
    ...mapActions('goodies', ['getAllGoodies', 'getGoodieSizes']),
    ...mapActions('basket', ['getAllBaskets']),
    async fetchOrderDetails() {
      try {
        const response = await this.getBasketById(this.basketId);
        if (response.is_order && response.state === '1') {
          const itemsResponse = await basketService.getItemsByBasket(this.basketId);
          if (itemsResponse.error === 0) {
            for (let i of itemsResponse.data) {
              let itemVariation = await goodiesService.getGoodieVariationById(i.item_id);
              if (itemVariation) {
                let goodie = this.goodies.find(g => g._id === itemVariation.goodie_id);
                let size = this.goodieSizes.find(s => s._id === itemVariation.size_id).size;
                i.name = goodie.name;
                i.price = goodie.price;
                i.image = goodie.image;
                i.size = size;
              }
            }
            this.order = { ...response, items: itemsResponse.data };
            this.errorMessage = "";
          } else {
            this.errorMessage = "Erreur lors de la récupération des articles du panier.";
          }
        } else {
          this.errorMessage = "Le panier n'est pas une commande valide ou n'est pas prêt à être récupéré.";
        }
      } catch (error) {
        this.errorMessage = "Erreur lors de la récupération des détails du panier.";
      }
    },
    async validateOrder() {
      try {
        await basketService.updateBasketState(this.basketId, { state: '2', is_order: true });
        alert("Commande marquée comme récupérée");
        this.$router.push({ name: 'provider-order-view' });
      } catch (error) {
        alert("Erreur lors de la validation de la récupération de la commande");
      }
    },
    calculateTotal(items) {
      return items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    goBack() {
      this.$router.push({ name: 'provider-order-view' });
    }
  },
  async mounted() {
    await this.getAllGoodies();
    await this.getGoodieSizes();
    await this.getAllBaskets();
    const basketIdFromQuery = this.$route.query.basket_id;
    if (basketIdFromQuery) {
      this.basketId = basketIdFromQuery;
      this.fetchOrderDetails();
    }
  },
};
</script>

<style scoped>
.order-validation {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9fafb;
}

form {
  margin-bottom: 20px;
}

input {
  margin-right: 10px;
}

button {
  padding: 8px 12px;
  font-size: 14px;
  color: white;
  background-color: #1abc9c;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #16a085;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}
</style>