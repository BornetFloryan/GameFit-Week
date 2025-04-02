<template>
  <div class="cart-sidebar">
    <h3>🛍️ Mon Panier</h3>

    <div v-if="filteredBasketItems.length > 0">
      <div v-for="(item, index) in filteredBasketItems" :key="item._id + '-' + index" class="cart-item">
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
        <div class="form-group">
          <label for="ticketId">Numéro de billet</label>
          <input type="text" id="ticketId" v-model="ticketId" required />
        </div>
        <button class="checkout-button" @click="checkout">Passer la commande</button>
      </div>
    </div>

    <p v-else class="empty-cart">Votre panier est vide.</p>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import router from '@/router';

export default {
  name: "CartSidebar",
  props: {
    shopId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      done: false,
      ticketId: "",
    };
  },
  computed: {
    ...mapState("basket", ["basketItems", "baskets"]),
    ...mapState("account", ["currentUser"]),
    ...mapState("goodies", ["goodieVariations"]),
    ...mapState("ticket", ["tickets"]),

    filteredBasketItems() {
      return this.basketItems.filter(item => item.shopId === this.shopId);
    },

    totalPrice() {
      return this.filteredBasketItems.reduce((total, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity, 10) || 0;
        return total + price * quantity;
      }, 0).toFixed(2);
    },
  },
  methods: {
    ...mapMutations("basket", ["updateBasketItems", "deleteItemFromBasket", "updateBaskets"]),
    ...mapActions("goodies", ["getGoodieVariations"]),
    ...mapActions("basket", ["createBasket", "addItemToBasket", "getItemsByBasket", 'getAllBaskets']),
    ...mapActions("ticket", ["getTickets"]),
    async updateQuantity(index, amount) {
      const item = this.filteredBasketItems[index];
      await this.getGoodieVariations(item._id);
      let variation = this.goodieVariations.find(variation => variation.goodie_id === item._id && variation.size_id === item.size_id);
      if(variation) {
        let stock = variation.stock;
        const newQuantity = item.quantity + amount;
        if (newQuantity > 0 && newQuantity <= stock) {
          item.quantity = newQuantity;
          this.updateBasketItems([...this.basketItems]);
          this.updateSessionStorage();
        } else if (newQuantity < 1) {
          this.removeFromBasket(index);
        } else {
          item.quantity = stock;
          this.updateBasketItems([...this.basketItems]);
          this.updateSessionStorage();
          alert("La quantité demandée dépasse le stock disponible. La quantité a été ajustée au stock disponible.");
        }
      } else {
        this.removeFromBasket(index);
        alert("Cet article n'est plus disponible à l'achat et a été retiré de votre panier.");
      }
    },
    removeFromBasket(index) {
      const item = this.filteredBasketItems[index];
      this.filteredBasketItems.splice(index, 1);
      const updatedBasketItems = this.basketItems.filter(basketItem => basketItem._id !== item._id || basketItem.size_id !== item.size_id);
      this.updateBasketItems(updatedBasketItems);
      this.updateSessionStorage();
    },
    updateSessionStorage() {
      sessionStorage.setItem("basketItems", JSON.stringify(this.basketItems));
    },
    async checkout() {
      if (!this.ticketId) {
        alert("Veuillez entrer un numéro de billet.");
        return;
      }
      const ticket = this.tickets.find(ticket => ticket._id === this.ticketId);
      if (ticket) {
        this.done = true;
        try {
          let response = await this.saveBasketToDatabase();
          if (response.error === 0) {
            let basket_id = response.data._id;
            const remainingItems = this.basketItems.filter(item => item.shopId !== this.shopId);
            sessionStorage.setItem("basketItems", JSON.stringify(remainingItems));
            router.push({ name: 'payment', params: { ticketId: this.ticketId, basketId: basket_id, basketItems: response.data.storedBasketItems } });
          } else {
            console.error("Error saving basket:", response.data);
          }
        } catch (error) {
          console.error("Error during checkout:", error);
        }
      } else {
        alert("Veuillez entrer un numéro de billet valide.");
      }
    },
    async saveBasketToDatabase() {
      if (this.currentUser || this.done) {
        try {
          let basket_id = sessionStorage.getItem("basket_id");
          if (!basket_id) {
            const response = await this.createBasket({ ticket_id: this.ticketId, provider_service_categories_id: this.shopId });
            if (response.error === 0) {
              basket_id = response.data._id;
              sessionStorage.setItem("basket_id", basket_id);
            } else {
              console.error(response.data);
              return { error: response.error, data: response.data };
            }
          }

          const itemsInBasket = await this.getItemsByBasket(basket_id);
          const itemIdsInBasket = itemsInBasket.data.map(item => item.item_id);

          const storedBasketItems = JSON.parse(sessionStorage.getItem("basketItems") || "[]");
          if (storedBasketItems) {
            const itemsToSave = storedBasketItems.filter(item => item.shopId === this.shopId);
            const remainingItems = storedBasketItems.filter(item => item.shopId !== this.shopId);

            for (let item of itemsToSave) {
              if (!itemIdsInBasket.includes(item.variation_id)) {
                try {
                  let response = await this.addItemToBasket({
                    basket_id,
                    data: {
                      item_id: item.variation_id,
                      item_type: "goodie",
                      quantity: item.quantity
                    },
                  });
                  if (response.error > 0) {
                    return { error: 1, data: response.data };
                  }
                } catch (error) {
                  console.error(error);
                }
              }
            }

            sessionStorage.setItem("basketItems", JSON.stringify(remainingItems));

            return { error: 0, data: { _id: basket_id, storedBasketItems: itemsToSave } };
          }
        } catch (error) {
          console.error(error);
          return { error: 1, data: error };
        }
      }
    }
  },
  async mounted() {
    await this.getTickets();
    await this.getAllBaskets();
    const basket_id = sessionStorage.getItem("basket_id");

    if (this.baskets.includes(basket_id)) {
      const itemsInBasket = await this.getItemsByBasket(basket_id);
      if (itemsInBasket.error === 0) {
        this.updateBasketItems(itemsInBasket.data);
      }
    } else {
      sessionStorage.removeItem("basket_id");
      const storedBasketItems = sessionStorage.getItem("basketItems");
      if (storedBasketItems) {
        this.updateBasketItems(JSON.parse(storedBasketItems));
      }
    }

    if (this.basketItems) {
      for (let item of this.basketItems) {
        if(item) {
          let response = await this.getGoodieVariations(item._id);
          if(response){
            if(this.goodieVariations && this.item && this.item.variation_id){
              let variation = this.goodieVariations.find(variation => variation._id === item.variation_id);
              if (variation) {
                let stock = variation.stock;
                if (item.quantity > stock) {
                  item.quantity = stock;
                  this.updateBasketItems([...this.basketItems]);
                  this.updateSessionStorage();
                }
              } else {
                if (this.filteredBasketItems.length > 0) {
                  const index = this.filteredBasketItems.findIndex(basketItem => basketItem.variation_id === item.variation_id);
                  if (index !== -1) {
                    this.removeFromBasket(index);
                    alert(`L'article ${item.name} n'est plus disponible à l'achat et a été retiré de votre panier.`);
                  }
                }
              }
            }
          }
        }
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