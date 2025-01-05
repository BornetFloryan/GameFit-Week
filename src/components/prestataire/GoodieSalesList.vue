<template>
  <div class="goodie-sales-list">
    <h2>Liste des ventes de goodies</h2>
    <table>
      <thead>
      <tr>
        <th>Numéro</th>
        <th>Goodie</th>
        <th>Quantité</th>
        <th>Date</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="sale in sales" :key="sale._id">
        <td>{{ sale._id }}</td>
        <td>{{ getGoodieName(sale.goodie_id) }}</td>
        <td>{{ sale.quantity }}</td>
        <td>{{ formatDate(sale.date) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'GoodieSalesList',
  computed: {
    ...mapState('goodies', ['sales', 'goodies']),
  },
  methods: {
    getGoodieName(goodieId) {
      const goodie = this.goodies.find(g => g._id === goodieId);
      return goodie ? goodie.name : 'Inconnu';
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('fr-FR', options);
    },
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
</style>
