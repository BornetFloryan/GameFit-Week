<template>
  <div class="cart-sidebar">
    <h3>🛍️ Mon Panier</h3>

    <div v-if="basket.length > 0">
      <div v-for="(item, index) in basket" :key="item._id + '-' + index" class="cart-item">
        <img :src="item.image ? require(`@/assets/img/goodies/${item.image}`) : require('@/assets/img/noteam.jpg')" alt="Goodie" class="cart-item-image"/>
        <div class="cart-item-info">
          <h4>{{ item.name }}</h4>
          <p>Prix: {{ item.price ? item.price : 'N/A' }} €</p>
          <p>Taille: {{ item.size }}</p>
          <div class="quantity-controls">
            <button @click="updateQuantity(index, -1)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="updateQuantity(index, 1)">+</button>
          </div>
          <button class="remove-item" @click="removeFromBasket(index)">Supprimer</button>
        </div>
      </div>

      <div class="cart-footer">
        <h4>Total : {{ totalPrice }} €</h4>
        <button class="checkout-button" @click="checkout">Passer la commande</button>
      </div>
    </div>

    <p v-else class="empty-cart">Votre panier est vide.</p>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "CartSidebar",
  data() {
    return {
      basket: JSON.parse(localStorage.getItem("basket")) || [],
    };
  },
  computed: {
    ...mapState("account", ["currentUser"]),
    totalPrice() {
      return this.basket.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    isLoggedIn() {
      return this.currentUser;
    }
  },
  methods: {
    updateQuantity(index, amount) {
      if (this.basket[index].quantity + amount > 0) {
        this.basket[index].quantity += amount;
      } else {
        this.basket.splice(index, 1);
      }
      this.saveBasket();
    },
    removeFromBasket(index) {
      this.basket.splice(index, 1);
      this.saveBasket();
    },
    saveBasket() {
      localStorage.setItem("basket", JSON.stringify(this.basket));
      if (this.isLoggedIn) {
        this.saveBasketToDatabase();
      }
    },
    async saveBasketToDatabase() {
      try {
        await this.$axios.post('/api/basket', { basket: this.basket });
        alert("Basket saved to database!");
      } catch (error) {
        console.error("Error saving basket to database:", error);
      }
    },
    checkout() {
      alert("Commande passée ! (simulation)");
      this.basket = [];
      localStorage.removeItem("basket");
      if (this.isLoggedIn) {
        this.saveBasketToDatabase();
      }
    },
  }
};
</script>

<style scoped>
.cart-sidebar {
  position: fixed;
  top: 83px;
  right: 0;
  width: 350px;
  height: calc(100vh - 60px);
  background: rgba(44, 62, 80, 0.95);
  color: white;
  padding: 20px;
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.3);
  z-index: 999;
  overflow-y: auto;
}

.cart-sidebar h3 {
  text-align: center;
  font-size: 1.5em;
  margin-bottom: 15px;
  border-bottom: 2px solid #1abc9c;
  padding-bottom: 5px;
}

.cart-item {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.cart-item-image {
  width: 55px;
  height: 55px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 12px;
  border: 2px solid #1abc9c;
}

.cart-item-info {
  flex: 1;
}

.cart-item-info h4 {
  font-size: 1.1em;
  margin-bottom: 5px;
  color: #f1f1f1;
}

.cart-item-info p {
  font-size: 0.9em;
  color: #dcdcdc;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 5px;
}

.quantity-controls button {
  background: #1abc9c;
  color: white;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  transition: background 0.3s ease;
}

.quantity-controls button:hover {
  background: #16a085;
}

.remove-item {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  transition: background 0.3s ease;
  margin-top: 5px;
}

.remove-item:hover {
  background: #c0392b;
}

.cart-footer {
  text-align: center;
  margin-top: 15px;
}

.cart-footer h4 {
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #f1f1f1;
}

.checkout-button {
  background: #1abc9c;
  color: white;
  border: none;
  padding: 12px;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  border-radius: 8px;
  transition: background 0.3s ease;
}

.checkout-button:hover {
  background: #16a085;
}

.empty-cart {
  text-align: center;
  color: #ccc;
  font-size: 1em;
  margin-top: 20px;
  font-style: italic;
}
</style>