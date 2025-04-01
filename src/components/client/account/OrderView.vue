<template>
  <div class="order-view">
    <div v-if="currentUser">
      <table v-if="userOrders.length > 0">
        <thead>
        <tr>
          <th>Numéro de commande</th>
          <th>Boutique</th>
          <th>Date</th>
          <th>Numéro de ticket</th>
          <th>État</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in userOrders" :key="order._id">
          <td>{{ order._id }}</td>
          <td>{{ order.customerName }}</td>
          <td>{{ formatDate(order.date) }}</td>
          <td>{{ order.ticket_id }}</td>
          <td>{{ orderState(order.state) }}</td>
          <td>
            <button @click="toggleOrderDetails(order._id)">Voir le détail</button>
            <button v-if="order.state === '1'" @click="showQRCode(order._id)">Afficher QR Code</button>
          </td>
          <div v-if="order.showQRCode">
            <qrcode-vue :value="generateQRCodeUrl(order._id)" :size="200" level="H" render-as="canvas" />
          </div>
        </tr>
        <tr v-for="order in visibleOrders" :key="order._id + '-details'">
          <td colspan="5">
            <div class="order-details">
              <h4>Détails de la commande</h4>
              <ul>
                <li v-for="item in order.items" :key="item._id">
                  {{ item.name }} - {{ item.size }} - {{ item.price }} € x {{ item.quantity }}
                </li>
              </ul>
              <p><strong>Total:</strong> {{ calculateTotal(order.items) }} €</p>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <p v-else>Aucune commande</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import basketService from "@/services/basket.service";
import goodiesService from "@/services/goodies.service";
import QrcodeVue from "qrcode.vue";

export default {
  name: 'OrderView',
  components: {
    QrcodeVue,
  },
  data() {
    return {
      userOrders: [],
      localIp: ''
    };
  },
  computed: {
    ...mapState('account', ['currentUser']),
    ...mapState('ticket', ['tickets']),
    ...mapState('goodies', ['goodieSizes', 'goodies']),
    ...mapState('basket', ['baskets']),
    ...mapGetters('ticket', ['getTicketsByCustomerId']),
    ...mapGetters('account', ['getCustomerById']),
    ...mapGetters('prestation', ['getProviderServiceCategoriesById']),
    visibleOrders() {
      return this.userOrders.filter(order => order.visible);
    }
  },
  methods: {
    ...mapActions('ticket', ['getTickets']),
    ...mapActions('goodies', ['getGoodieVariations', 'getGoodieSizes', 'getAllGoodies']),
    ...mapActions('prestation', ['getProviderServiceCategories']),
    ...mapActions('basket', ['getAllBaskets']),

    async fetchUserOrders() {
      if (this.currentUser) {
        let customerTicketIds = this.getTicketsByCustomerId(this.currentUser._id).map(ticket => ticket._id);
        let ticketIds = [];
        for (let basket of this.baskets) {
          if (customerTicketIds.includes(basket.ticket_id) && !ticketIds.includes(basket.ticket_id)) {
            ticketIds.push(basket.ticket_id);
          }
        }
        try {
          for (let ticket_id of ticketIds) {
            ticket_id = ticket_id.toString();
            const response = await basketService.getBasketsByTicketId({ ticket_id });
            if (response.error === 0) {
              for (let order of response.data) {
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

                  const providerServiceCategory = this.getProviderServiceCategoriesById(order.provider_service_categories_id);
                  if (providerServiceCategory) {
                    const customer = await this.getCustomerById(providerServiceCategory.customer_id);
                    order.customerName = customer ? customer.name : 'Inconnu';
                  } else {
                    order.customerName = 'Inconnu';
                  }

                  order.visible = false;
                  order.showQRCode = false;
                  this.userOrders.push(order);
                }
              }
            } else if (response.status === 404) {
              console.warn(`Aucun panier trouvé pour le ticket_id: ${ticket_id}`);
            } else {
              console.error('Erreur lors de la récupération des commandes :', response.data);
            }
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des commandes :', error);
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
      const order = this.userOrders.find(order => order._id === orderId);
      if (order) {
        order.visible = !order.visible;
      }
    },
    showQRCode(orderId) {
      const order = this.userOrders.find(order => order._id === orderId);
      if (order) {
        order.showQRCode = !order.showQRCode;
      }
    },
    generateQRCodeUrl(orderId) {
      return `http://${this.localIp}:8080/provider-dashboard/order-validation?basket_id=${orderId}`;
    },
    calculateTotal(items) {
      return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    },
  },
  async mounted() {
    await this.getTickets();
    await this.getAllGoodies();
    await this.getAllBaskets();
    await this.getGoodieSizes();
    await this.getProviderServiceCategories();
    this.fetchUserOrders();
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