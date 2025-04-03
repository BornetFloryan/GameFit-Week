<template>
  <div class="order-validation">
    <h2>{{ $t('orderValidation.title') }}</h2>
    <form @submit.prevent="fetchOrderDetails">
      <label for="basketId">{{ $t('orderValidation.basketId') }}</label>
      <input type="text" v-model="basketId" required />
      <button type="submit">{{ $t('orderValidation.search') }}</button>
    </form>
    <div v-if="order">
      <h3>{{ $t('orderValidation.orderDetails') }}</h3>
      <ul>
        <li v-for="item in order.items" :key="item._id">
          {{ item.name }} - {{ item.size }} - {{ item.price }} € x {{ item.quantity }}
        </li>
      </ul>
      <p><strong>{{ $t('orderValidation.total') }}:</strong> {{ calculateTotal(order.items) }} €</p>
      <button @click="validateOrder">{{ $t('orderValidation.validateOrder') }}</button>
      <button @click="goBack">{{ $t('orderValidation.back') }}</button>
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
            this.errorMessage = this.$t('orderValidation.errorFetchingItems');
          }
        } else {
          this.errorMessage = this.$t('orderValidation.invalidOrder');
        }
      } catch (error) {
        this.errorMessage = this.$t('orderValidation.errorFetchingDetails');
      }
    },
    async validateOrder() {
      try {
        await basketService.updateBasketState(this.basketId, { state: '2', is_order: true });
        alert(this.$t('orderValidation.orderMarkedAsRetrieved'));
        this.$router.push({ name: 'provider-order-view' });
      } catch (error) {
        alert(this.$t('orderValidation.errorValidatingOrder'));
      }
    },
    calculateTotal(items) {
      return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
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