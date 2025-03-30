<template>
  <div class="payment-component">
    <h3>Paiement</h3>
    <div v-if="!paymentSuccess">
      <div class="order-summary">
        <h4>Récapitulatif de la commande</h4>
        <ul>
          <li v-for="(item, index) in basketItems" :key="index">{{ item.name }} - {{item.size}} - {{ item.price }} € x {{ item.quantity }}</li>
        </ul>
        <h4>Total : {{ totalPrice }} €</h4>
      </div>
      <form @submit.prevent="processPayment">
        <div class="form-group">
          <label for="ticketNumber">Numéro de billet</label>
          <p>{{ ticketId }}</p>
        </div>
        <div class="form-group">
          <label for="cardNumber">Numéro de carte</label>
          <input type="text" id="cardNumber" v-model="cardNumber" required maxlength="16" inputmode="numeric" pattern="\d{16}" />
        </div>
        <div class="form-group">
          <label for="expiryDate">Date d'expiration</label>
          <input type="date" id="expiryDate" v-model="expiryDate" required />
        </div>
        <div class="form-group">
          <label for="cvv">CVV</label>
          <input type="text" id="cvv" v-model="cvv" required maxlength="3" inputmode="numeric" pattern="\d{3}" />
        </div>
        <button type="submit" class="pay-button">Payer</button>
      </form>
    </div>
    <div v-else class="confirmation">
      <h4>Commande effectuée</h4>
      <p>Un email de confirmation vous a été envoyé.</p>
      <p>Vous pouvez retrouver votre commande via le compte associé à l'adresse mail du ticket ou en créant un compte avec cette adresse mail.</p>
      <p>Votre commande numéro {{ orderNumber }}</p>
      <button @click="goToHomePage" class="pay-button">Retourner à la page principale</button>
      <div class="order-summary">
        <h4>Récapitulatif de la commande</h4>
        <ul>
          <li v-for="(item, index) in basketItems" :key="index">{{ item.name }} - {{ item.price }} € x {{ item.quantity }}</li>
        </ul>
        <h4>Total : {{ totalPrice }} €</h4>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router';
import {mapActions, mapMutations} from "vuex";
import goodiesService from "@/services/goodies.service";

export default {
  name: "PaymentComponent",
  props: {
    ticketId: {
      type: String,
      required: true
    },
    basketId: {
      type: String,
      required: true
    },
    basketItems: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      ticketNumber: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      paymentSuccess: false,
      orderNumber: null
    };
  },
  computed: {
    totalPrice() {
      return this.basketItems.reduce((total, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity, 10) || 0;
        return total + price * quantity;
      }, 0).toFixed(2);
    }
  },
  methods: {
    ...mapActions("basket", ["updateBasketState"]),
    ...mapMutations('basket', ['updateBasketItems']),
    ...mapActions("goodies", ["modifyGoodieVariation"]),
    async processPayment() {
      try {
        let response = await this.updateBasketState({ basket_id: this.basketId, data: {state: 0, is_order: true} });
        if(response.error === 0){
          this.paymentSuccess = true;
          this.orderNumber = this.basketId;
          for (let item of this.basketItems) {
            let response = await goodiesService.getGoodieVariations(item._id);
            if(response){
              let variation = response.find(v => v._id === item.variation_id);
              if (variation) {
                let stock = variation.stock - item.quantity;
                await this.modifyGoodieVariation({ _id: item.variation_id, goodie_id: item._id, size_id: item.size_id, stock: stock });
              }
            }
          }
          sessionStorage.removeItem("basketItems");
          sessionStorage.removeItem("basket_id");
          this.updateBasketItems([]);
        }
      } catch(error) {
        console.error("Erreur lors de la mise à jour de l'état du panier :", error);
        alert("Une erreur est survenue lors du traitement du paiement. Veuillez réessayer.");
      }
    },
    goToHomePage() {
      router.push({ name: 'home' });
    }
  },
  async mounted() {
    if (!this.basketItems || !this.totalPrice) {
      router.push({ name: 'home' });
    }
  }
};
</script>

<style scoped>
.payment-component {
  background: #f9f9f9;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
}

.payment-component h3 {
  text-align: center;
  margin-bottom: 25px;
  color: #333;
  font-size: 1.8em;
}

.order-summary {
  margin-bottom: 25px;
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.order-summary h4 {
  margin-bottom: 15px;
  color: #555;
  font-size: 1.2em;
}

.order-summary ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.order-summary li {
  margin-bottom: 10px;
  color: #666;
  font-size: 1em;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.9em;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
  color: #333;
  background: #fff;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  border-color: #1abc9c;
}

.pay-button {
  background: #1abc9c;
  color: white;
  border: none;
  padding: 15px;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
  font-size: 1.2em;
  transition: background 0.3s ease;
  margin-top: 20px;
}

.pay-button:hover {
  background: #16a085;
}

.confirmation {
  text-align: center;
  background: #e9f7ef;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.confirmation h4 {
  color: #27ae60;
  font-size: 1.5em;
  margin-bottom: 15px;
}

.confirmation p {
  color: #2c3e50;
  font-size: 1em;
  margin-bottom: 10px;
}
</style>