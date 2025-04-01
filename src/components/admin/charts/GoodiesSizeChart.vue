<template>
  <div class="container">
    <h1>Ventes de Goodies par Taille</h1>
    <div class="select-container">
      <select v-model="selectedProvider" @change="updateGoodies">
        <option v-for="provider in uniqueProviders" :key="provider.providerServiceCategoryId" :value="provider">{{ provider.accountName }}</option>
      </select>
      <select v-model="selectedGoodie" @change="updateChart">
        <option v-for="goodie in filteredGoodies" :key="goodie._id" :value="goodie">{{ goodie.name }}</option>
      </select>
    </div>
    <canvas ref="goodiesSizeChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import basketService from "@/services/basket.service";
import { mapActions, mapGetters, mapState } from "vuex";
import goodiesService from "@/services/goodies.service";

Chart.register(...registerables);

export default {
  name: "GoodiesSizeChart",
  data() {
    return {
      goodiesData: [],
      sizes: [],
      selectedProvider: null,
      selectedGoodie: null,
      chart: null,
    };
  },
  computed: {
    ...mapState('goodies', ['goodieSizes', 'goodies']),
    ...mapState('account', ['customersAccounts']),
    ...mapGetters('prestation', ['getServiceCategoryById', 'getProviderServiceCategoriesByCustomerIdAndServiceID']),
    uniqueProviders() {
      return [...new Set(
          this.customersAccounts
              .filter(account => {
                const providerServiceCategory = this.getProviderServiceCategoriesByCustomerIdAndServiceID(account._id, '1');
                return providerServiceCategory && providerServiceCategory.service_id;
              })
              .map(account => {
                const providerServiceCategory = this.getProviderServiceCategoriesByCustomerIdAndServiceID(account._id, '1');
                return {
                  accountName: account.name,
                  providerServiceCategoryId: providerServiceCategory._id,
                };
              })
      )];
    },
    filteredGoodies() {
      if (!this.selectedProvider) return [];
      return this.goodies
          .filter(goodie => goodie.provider_service_categories_id === this.selectedProvider.providerServiceCategoryId);
    },
  },
  methods: {
    ...mapActions('goodies', ['getGoodieSizes', 'getAllGoodies']),
    ...mapActions('prestation', ['getProviderServiceCategories', 'getServiceCategories']),
    ...mapActions('account', ['getCustomersAccounts']),
    async updateChart() {
      if (this.chart) {
        this.chart.destroy();
      }

      if (this.selectedGoodie) {
        let variations = (await goodiesService.getGoodieVariations(this.selectedGoodie._id));
        let baskets = (await basketService.getAllBaskets()).data.filter(basket => basket.is_order === true);

        this.sizes = [];

        for (const variation of variations) {
          let sizeObj = this.goodieSizes.find(size => size._id === variation.size_id);
          if (sizeObj) {
            this.sizes.push(sizeObj.size);
          }
        }

        console.log("this.sizes:", this.sizes);

        let salesBySize = [];
        for (const size of this.sizes) {
          let totalSales = 0;
          for (const variation of variations) {
            if (variation.size_id === this.goodieSizes.find(s => s.size === size)._id) {
              for (const basket of baskets) {
                let basketItems = (await basketService.getItemsByBasket(basket._id)).data;
                totalSales += basketItems.reduce((itemSum, item) => {
                  console.log("item:", item);
                  return itemSum + Number((item.item_id === variation._id ? item.quantity : 0));
                }, 0);
              }
            }
          }
          console.log("Total sales for size", size, ":", totalSales);
          salesBySize.push(totalSales);
        }
        console.log("Sales by size:", salesBySize);

        this.chart = new Chart(this.$refs.goodiesSizeChart, {
          type: "bar",
          data: {
            labels: this.sizes,
            datasets: [
              {
                label: "Nombre de Ventes",
                data: salesBySize,
                backgroundColor: "rgb(75, 192, 192)",
              },
            ],
          },
        });
      }
    },
    updateGoodies() {
      this.selectedGoodie = this.filteredGoodies[0];
      this.updateChart();
    },
  },
  async mounted() {
    await this.getAllGoodies();
    await this.getGoodieSizes();
    await this.getProviderServiceCategories();
    await this.getCustomersAccounts();
    try {
      let baskets = await basketService.getAllBaskets();
      if (baskets && baskets.data.data) {
        this.goodiesData = baskets.data.data.filter((basket) => basket.is_order === true);
      }

      this.selectedProvider = this.uniqueProviders[0] || null;
      this.updateGoodies();
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.select-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

select {
  padding: 10px;
  font-size: 16px;
}

canvas {
  max-width: 100%;
  max-height: 93%;
}
</style>