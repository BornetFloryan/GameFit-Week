<template>
  <div class="order-view">
    <div v-if="currentUser">
      <button @click="goBack">{{ $t('providerOrderView.back') }}</button>
      <table v-if="providerOrders.length > 0">
        <thead>
        <tr>
          <th>{{ $t('providerOrderView.orderNumber') }}</th>
          <th>{{ $t('providerOrderView.date') }}</th>
          <th>{{ $t('providerOrderView.ticketNumber') }}</th>
          <th>{{ $t('providerOrderView.state') }}</th>
          <th>{{ $t('providerOrderView.actions') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in providerOrders" :key="order._id">
          <td>{{ order._id }}</td>
          <td>{{ formatDate(order.date) }}</td>
          <td>{{ order.ticket_id }}</td>
          <td>{{ orderState(order.state) }}</td>
          <td>
            <button @click="toggleOrderDetails(order._id)">{{ $t('providerOrderView.viewDetails') }}</button>
            <button v-if="order.state === '0'" @click="markOrderAsProcessed(order._id)">{{ $t('providerOrderView.markAsProcessed') }}</button>
          </td>
        </tr>
        <tr v-for="order in visibleOrders" :key="order._id + '-details'">
          <td colspan="5">
            <div class="order-details">
              <h4>{{ $t('providerOrderView.orderDetails') }}</h4>
              <ul>
                <li v-for="item in order.items" :key="item._id">
                  {{ item.name }} - {{ item.size }} - {{ item.price }} € x {{ item.quantity }}
                </li>
              </ul>
              <p><strong>{{ $t('providerOrderView.total') }}:</strong> {{ calculateTotal(order.items) }} €</p>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <p v-else>{{ $t('providerOrderView.noOrders') }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import basketService from "@/services/basket.service";
import goodiesService from "@/services/goodies.service";

export default {
  name: 'ProviderOrderView',
  data() {
    return {
      providerOrders: [],
    };
  },
  computed: {
    ...mapState('account', ['currentUser']),
    ...mapState('ticket', ['tickets']),
    ...mapState('goodies', ['goodieSizes', 'goodies']),
    ...mapGetters('ticket', ['getTicketsByCustomerId']),
    ...mapGetters('account', ['getCustomerById']),
    ...mapGetters('prestation', ['getProviderServiceCategoriesByCustomerIdAndServiceID']),
    ...mapGetters('basket', ['getBasketsByProviderServiceCategoriesId']),
    visibleOrders() {
      return this.providerOrders.filter(order => order.visible);
    }
  },
  methods: {
    ...mapActions('ticket', ['getTickets']),
    ...mapActions('goodies', ['getGoodieVariations', 'getGoodieSizes', 'getAllGoodies']),
    ...mapActions('prestation', ['getProviderServiceCategories']),
    ...mapActions('basket', ['getAllBaskets', 'updateBasketState']),

    async fetchProviderOrders() {
      if (this.currentUser) {
        let providerServiceCategory = this.getProviderServiceCategoriesByCustomerIdAndServiceID(this.currentUser._id, "1");
        if (providerServiceCategory) {
          let categoryId = providerServiceCategory._id;
          try {
            const response = await this.getBasketsByProviderServiceCategoriesId(categoryId);
            if (response) {
              for (let order of response) {
                if (order.is_order) {
                  const itemsResponse = await basketService.getItemsByBasket(order._id);

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
                    order.items = itemsResponse.data;
                  } else {
                    order.items = [];
                  }
                  this.$set(order, 'visible', false);
                  this.providerOrders.push(order);
                }
              }
            } else {
              console.error('Erreur lors de la récupération des commandes :', response.data);
            }
          } catch (error) {
            console.error('Erreur lors de la récupération des commandes :', error);
          }
        }
      }
    },
    formatDate(date) {
      return date.split('T')[0];
    },
    orderState(state) {
      if (state === '0') return 'En préparation';
      if (state === '1') return 'À venir récupérer';
      if (state === '2') return 'Récupérée';
      return 'Inconnu';
    },
    toggleOrderDetails(orderId) {
      const order = this.providerOrders.find(order => order._id === orderId);
      if (order) {
        this.$set(order, 'visible', !order.visible);
      }
    },
    async markOrderAsProcessed(orderId) {
      const order = this.providerOrders.find(order => order._id === orderId);
      if (order) {
        const confirmation = confirm(this.$t('providerOrderView.confirmMarkAsProcessed'));
        if (confirmation) {
          try {
            order.state = '1';
            await this.updateBasketState({ basket_id: orderId, data: { state: '1', is_order: true } });
            alert(this.$t('providerOrderView.orderProcessed'));
          } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'état de la commande :', error);
            alert(this.$t('providerOrderView.orderProcessingError'));
          }
        }
      }
    },
    calculateTotal(items) {
      return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  async mounted() {
    await this.getAllBaskets();
    await this.getTickets();
    await this.getAllGoodies();
    await this.getGoodieSizes();
    await this.getProviderServiceCategories();
    this.fetchProviderOrders();
  },
};
</script>

<style scoped>
.order-view {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f9fafb;
}

table {
  width: 90%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

th {
  background-color: #2a4269;
  color: white;
  padding: 12px 15px;
  text-align: left;
  text-transform: uppercase;
  font-size: 14px;
}

td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: #f1f1f1;
  transition: background-color 0.3s ease;
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

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.order-details {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
</style>