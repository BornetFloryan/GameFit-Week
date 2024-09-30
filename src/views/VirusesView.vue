<template>
  <div>
    <h1>Les virus</h1>
    <p>Le tableau dans le store : {{ viruses }}</p>
    <p>sous forme de liste avec certains champs</p>
    <span>Filtres :</span>
    <br>
    <label for="filterpriceactive">par prix</label>
    <input type="checkbox" v-model="filterPriceActive" id="filterpriceactive">
    <br>
    <label for="filternameactive">par nom</label>
    <input type="checkbox" v-model="filterNameActive" id="filternameactive">
    <br>
    <label for="filterstockactive">par stock</label>
    <input type="checkbox" v-model="filterStockActive" id="filterstockactive">
    <br>
    <hr/>

    <div v-if="filterPriceActive">
      <label for="filterprice">prix inférieur à : </label>
      <input v-model="priceFilter" id="filterprice">
    </div>

    <div v-if="filterNameActive">
      <label for="filtername">Nom : </label>
      <input v-model="nameFilter" id="filtername">
    </div>

    <div v-if="filterStockActive">
      <label for="filterstock">En stock : </label>
      <input type = "checkbox" v-model="stockFilter" id="filterstock">
    </div>

    <table>
      <thead>
      <tr>
        <th>Nom</th>
        <th>Prix</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(virus, index) in filteredViruses" :key="index">
        <td>{{virus.name}}</td>
        <td>{{virus.price}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'VirusesView',
  data: () => ({
    priceFilter: 0,
    nameFilter: "",
    stockFilter : false,
    filterPriceActive : false,
    filterNameActive : false,
    filterStockActive : false,
  }),
  computed: {
    ...mapState(['viruses']),
    filteredViruses() {
      let filtered = [...this.viruses];
      if (this.filterPriceActive && this.priceFilter > 0)
        filtered = filtered.filter(v => v.price < this.priceFilter);
      if (this.filterNameActive && this.nameFilter)
        filtered = filtered.filter(v => v.name.toLowerCase().includes(this.nameFilter.toLowerCase()));
      if (this.filterStockActive && this.stockFilter)
        filtered = filtered.filter(v => v.stock > 0);
      return filtered;
    },
  }

}
</script>
