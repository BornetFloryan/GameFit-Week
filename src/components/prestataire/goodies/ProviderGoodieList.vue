<template>
  <div class="goodie-sales-list">
    <div>
      <label>
        <input type="radio" v-model="serviceStatus" value="1" @change="toggleServiceStatus"> Activer le service
      </label>
      <label>
        <input type="radio" v-model="serviceStatus" value="0" @change="toggleServiceStatus"> Désactiver le service
      </label>
    </div>
    <div v-if="serviceStatus === '1'">
      <h2>Liste des ventes de goodies</h2>
      <button class="add-goodies" @click="goToAddGoodie">Ajouter un Goodies</button>
      <button class="view-orders" @click="viewOrders">Voir les commandes réalisées</button>
      <button class="view-orders" @click="viewValidation">Récupération d'une commande ?</button>
      <AdminTable
          :title="title"
          :headers="headers"
          :fields="fields"
          :dataSource="sales"
          :modifyName="'modify-goodie'"
          :showModifyButton="true"
          :showReservationsButton="false"
          :showDeleteButton="true"
          @delete="handleDelete"
      />
    </div>
    <p v-else>Le service est désactivé.</p>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import AdminTable from "@/components/admin/AdminTable.vue";
import basketService from "@/services/basket.service";
import goodiesService from "@/services/goodies.service";

export default {
  name: "ProviderGoodieList",
  components: { AdminTable },
  data() {
    return {
      title: "Liste des ventes de goodies",
      headers: ['Numéro', 'Goodie', 'Image', 'Prix', 'Tailles et Stocks'],
      fields: ['_id', 'name', 'image', 'price', 'sizesAndStocks'],
      sales: [],
      providerServiceCategory: {},
      serviceStatus: '1',
    };
  },
  computed: {
    ...mapState('account', ['currentUser']),
    ...mapState('goodies', ['goodies', 'goodieVariations', 'goodieSizes']),
    ...mapState('basket', ['baskets']),
    ...mapGetters('prestation', ['getProviderServiceCategoriesByCustomerIdAndServiceID']),
  },
  methods: {
    ...mapActions('prestation', ['updateProviderServiceCategoryState']),
    ...mapActions('goodies', ['getAllGoodies', 'getGoodieVariations', 'getGoodieSizes', 'deleteGoodie']),
    ...mapActions('basket', ['getAllBaskets']),

    async toggleServiceStatus() {
      try {
        this.providerServiceCategory.state = this.serviceStatus;
        await this.updateProviderServiceCategoryState(this.providerServiceCategory);
        alert(`Service ${this.serviceStatus === '1' ? 'activé' : 'désactivé'} avec succès`);
      } catch (e) {
        alert('Erreur lors de la mise à jour du statut du service');
      }
    },
    async fetchSales() {
      await this.getAllGoodies();
      await this.getGoodieSizes();

      let providerGoodies = this.goodies.filter(goodie => {
        return goodie.provider_service_categories_id === this.providerServiceCategory._id;
      });

      for (let goodie of providerGoodies) {
        const variations = await this.getGoodieVariations(goodie._id);
        const sizesAndStocks = variations.map(variation => {
          const size = this.goodieSizes.find(size => size._id === variation.size_id);
          const stockText = size ? `${size.size}: ${variation.stock > 0 ? variation.stock : 'plus de stock'}` : 'N/A';
          return stockText;
        }).join(', ');

        this.sales.push({
          _id: goodie._id,
          name: goodie.name,
          image: require(`@/assets/img/goodies/${goodie.image}`),
          price: goodie.price,
          sizesAndStocks: sizesAndStocks,
        });
      }
    },
    async isGoodieInOrderedBasket(goodie_id) {
      if (this.baskets) {
        for (let basket of this.baskets) {
          if (basket.is_order === true) {
            let response = await basketService.getItemsByBasket(basket._id);
            if (response.error === 0) {
              let basketItems = response.data;
              for (let item of basketItems) {
                const variation = await goodiesService.getGoodieVariationById(item.item_id);
                if (variation && variation.goodie_id === goodie_id) {
                  return true;
                }
              }
            }
          }
        }
      }
      return false;
    },
    async handleDelete(itemId) {
      const isInOrderedBasket = await this.isGoodieInOrderedBasket(itemId);
      if (isInOrderedBasket) {
        alert('Ce goodie ne peut pas être supprimé car il est dans un panier avec une commande.');
        return;
      }

      if (confirm('Êtes-vous sûr de vouloir supprimer ce goodie ?')) {
        try {
          await this.deleteGoodie(itemId);
          this.sales = this.sales.filter(item => item._id !== itemId);
          alert('Goodie supprimé avec succès');
        } catch (e) {
          alert('Erreur lors de la suppression du goodie');
        }
      }
    },
    async viewOrders() {
      const providerServiceCategory = this.getProviderServiceCategoriesByCustomerIdAndServiceID(this.currentUser._id, '1');
      if (providerServiceCategory) {
        this.$router.push({ name: 'provider-order-view'});
      } else {
        alert('Aucune catégorie de service trouvée pour cet utilisateur.');
      }
    },
    goToAddGoodie() {
      this.$router.push({ name: 'add-goodie' });
    },
    viewValidation() {
      this.$router.push({ name: 'order-validation' });
    },
  },
  async mounted() {
    await this.getAllBaskets();
    this.providerServiceCategory = this.getProviderServiceCategoriesByCustomerIdAndServiceID(this.currentUser._id, '1');
    this.serviceStatus = this.providerServiceCategory.state;
    if (this.serviceStatus === '1') {
      await this.fetchSales();
    }
  },
};
</script>

<style scoped>
.goodie-sales-list {
  display: inline-block;
  width: auto;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}

button.add-goodies, button.view-orders {
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

img {
  max-width: 100px;
  height: auto;
}
</style>