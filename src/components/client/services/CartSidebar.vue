<template>
  <div class="cart-sidebar">
    <h3>🛍️ Mon Panier</h3>

    <div v-if="basketItems.length > 0">
      <div v-for="(item, index) in basketItems" :key="item._id + '-' + index" class="cart-item">
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
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "CartSidebar",
  computed: {
    ...mapState("basket", ["basketItems"]),
    ...mapState("account", ["currentUser"]),
    ...mapState("goodies", ["goodieVariations"]),

    totalPrice() {
      return this.basketItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    },
    isLoggedIn() {
      return this.currentUser;
    }
  },
  methods: {
    ...mapMutations("basket", ["updateBasketItems", "deleteItemFromBasket", "updateBaskets"]),
    ...mapActions("goodies", ["getGoodieVariations"]),
    ...mapActions("basket", ["createBasket", "addItemToBasket"]),
    async updateQuantity(index, amount) {
      const item = this.basketItems[index];
      await this.getGoodieVariations(item._id);
      let stock = this.goodieVariations.find(variation => variation.goodie_id === item._id && variation.size_id === item.size_id).stock;
      const newQuantity = item.quantity + amount;
      if (newQuantity > 0 && newQuantity <= stock) {
        item.quantity = newQuantity;
        this.updateBasketItems([...this.basketItems]);
        this.updateSessionStorage();
        if (this.isLoggedIn) {
          this.saveBasketToDatabase();
        }
      } else if (newQuantity < 1) {
        this.removeFromBasket(index);
      } else {
        item.quantity = stock;
        this.updateBasketItems([...this.basketItems]);
        this.updateSessionStorage();
        alert("La quantité demandée dépasse le stock disponible. La quantité a été ajustée au stock disponible.");
      }
    },
    removeFromBasket(index) {
      this.basketItems.splice(index, 1);
      this.updateBasketItems([...this.basketItems]);
      this.updateSessionStorage();
      if (this.isLoggedIn) {
        this.saveBasketToDatabase();
      }
    },
    checkout() {
      if (this.isLoggedIn) {
        alert('Commande passée avec succès!');
      } else {
        alert("Veuillez vous connecter pour passer la commande.");
      }
    },
    updateSessionStorage() {
      sessionStorage.setItem("basketItems", JSON.stringify(this.basketItems));
    },
    async saveBasketToDatabase() {
      if (this.currentUser) {
        try {
          let basket_id = sessionStorage.getItem("basket_id");
          if (!basket_id) {
            const response = await this.createBasket(this.currentUser._id);
            if (response.error === 0) {
              basket_id = response.data._id;
              sessionStorage.setItem("basket_id", basket_id);
              console.log("Basket saved successfully:", response.data);
            } else {
              console.error("Error saving basket:", response.data);
            }
          } else {
            for (let item of this.basketItems) {
              try {
                await this.addItemToBasket({
                  basket_id,
                  item_id: item.variation_id,
                  item_type: "goodie",
                  quantity: item.quantity
                });
              } catch (error) {
                console.error("Error adding item to basket:", error);
              }
            }
          }
        } catch (error) {
          console.error("Error saving basket to database:", error);
        }
      }
    }
  },
  async mounted() {
    const storedBasketItems = sessionStorage.getItem("basketItems");
    if (storedBasketItems) {
      this.updateBasketItems(JSON.parse(storedBasketItems));
    }
    for (let item of this.basketItems) {
      await this.getGoodieVariations(item._id);
      let stock = this.goodieVariations.find(variation => variation.goodie_id === item._id && variation.size_id === item.size_id).stock;
      if (item.quantity > stock) {
        item.quantity = stock;
        this.updateBasketItems([...this.basketItems]);
        this.updateSessionStorage();
      }
    }
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