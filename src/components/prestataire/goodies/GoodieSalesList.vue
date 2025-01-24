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
    <h2 v-if="serviceStatus === '1'">Liste des ventes de goodies</h2>

    <button class="add-goodies" v-if="serviceStatus === '1'">Ajouter un Goodies</button>
    <table v-if="serviceStatus === '1'">
      <thead>
      <tr>
        <th scope="col">Numéro</th>
        <th scope="col">Goodie</th>
        <th scope="col">Quantité</th>
        <th scope="col">Date</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="sale in sales" :key="sale._id">
        <td>{{ sale._id }}</td>
        <td>{{ sale.goodie.name }}</td>
        <td>{{ sale.quantity }}</td>
        <td>{{ formatDate(sale.date) }}</td>
      </tr>
      </tbody>
    </table>
    <p v-else>Le service est désactivé.</p>
  </div>
</template>

<script>
import { sale } from "@/datasource/data.js";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "GoodieSalesList",
  data() {
    return {
      sales: sale,
      providerServiceCategory: {},
      serviceStatus: '1',
    };
  },
  computed: {
    ...mapState('account', ['currentUser']),
    ...mapGetters('prestation', ['getProviderServiceCategoriesByCustomerIdAndServiceID']),
  },
  methods: {
    ...mapActions('prestation', ['updateProviderServiceCategoryState']),

    formatDate(date) {
      const options = {year: "numeric", month: "long", day: "numeric"};
      return new Date(date).toLocaleDateString("fr-FR", options);
    },
    async toggleServiceStatus() {
      try {
        this.providerServiceCategory.state = this.serviceStatus;
        await this.updateProviderServiceCategoryState({customer_id: this.currentUser._id, status: this.serviceStatus});
        alert(`Service ${this.serviceStatus === '1' ? 'activé' : 'désactivé'} avec succès`);
      } catch (e) {
        alert('Erreur lors de la mise à jour du statut du service');
      }
    },
  },
  async mounted() {
    this.providerServiceCategory = this.getProviderServiceCategoriesByCustomerIdAndServiceID(this.currentUser._id, '1');
    this.serviceStatus = this.providerServiceCategory.state;
  },
};
</script>

<style scoped>
.goodie-sales-list {
  max-width: 800px;
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
</style>