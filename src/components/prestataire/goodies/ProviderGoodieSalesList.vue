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
      <button class="add-goodies">Ajouter un Goodies</button>
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

export default {
  name: "ProviderGoodieSalesList",
  components: { AdminTable },
  data() {
    return {
      title: "Liste des ventes de goodies",
      headers: ['Numéro', 'Goodie', 'Image', 'Tailles et Stocks'],
      fields: ['_id', 'name', 'image', 'sizesAndStocks'],
      sales: [],
      providerServiceCategory: {},
      serviceStatus: '1',
    };
  },
  computed: {
    ...mapState('account', ['currentUser']),
    ...mapState('goodies', ['goodies', 'goodieVariations', 'goodieSizes']),
    ...mapGetters('prestation', ['getProviderServiceCategoriesByCustomerIdAndServiceID']),
  },
  methods: {
    ...mapActions('prestation', ['updateProviderServiceCategoryState']),
    ...mapActions('goodies', ['getAllGoodies', 'getGoodieVariations', 'getGoodieSizes', 'deleteGoodie']),

    async toggleServiceStatus() {
      try {
        this.providerServiceCategory.state = this.serviceStatus;
        await this.updateProviderServiceCategoryState(this.providerServiceCategory, this.currentUser.session);
        alert(`Service ${this.serviceStatus === '1' ? 'activé' : 'désactivé'} avec succès`);
      } catch (e) {
        alert('Erreur lors de la mise à jour du statut du service');
      }
    },
    async fetchSales() {
      await this.getAllGoodies();
      await this.getGoodieSizes();

      for (let goodie of this.goodies) {
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
          sizesAndStocks: sizesAndStocks,
        });
      }
    },
    handleDelete(itemId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce goodie ?')) {
        try {
          this.deleteGoodie(itemId);
          this.sales = this.sales.filter(item => item._id !== itemId);
          alert('Goodie supprimé avec succès');
        } catch (e) {
          alert('Erreur lors de la suppression du goodie');
        }
      }
    }
  },
  async mounted() {
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

button.add-goodies {
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