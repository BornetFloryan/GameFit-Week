<template>
  <div class="goodie-sales-list">
    <h2>Liste des ventes de goodies</h2>

    <button class="add-goodies">Ajouter un Goodies</button>
    <table>
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
  </div>
</template>

<script>
import { sale } from "@/datasource/data.js";

export default {
  name: "GoodieSalesList",
  data() {
    return {
      sales: sale,
    };
  },
  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("fr-FR", options);
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
