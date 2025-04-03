<template>
  <div class="goodies-seller-view">
    <h1>{{ $t('goodiesSellerView.title') }}</h1>
    <div class="sellers">
      <div v-for="seller in sellers" :key="seller._id" class="seller-card">
        <img :src="seller.image" :alt="seller.name" class="seller-image" />
        <h2>{{ seller.name }}</h2>
        <button @click="goToShop(seller._id)">{{ $t('goodiesSellerView.accessShop') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: 'GoodiesSellerView',
  data() {
    return {
      sellers: []
    };
  },
  computed: {
    ...mapState('prestation', ['providerServiceCategories']),
    ...mapState('account', ['customersAccounts'])
  },
  methods: {
    ...mapActions('prestation', ['getProviderServiceCategories']),
    ...mapActions('account', ['getCustomersAccounts']),
    goToShop(sellerId) {
      const providerServiceCategory = this.providerServiceCategories.find(category => category._id === sellerId);
      this.$router.push({ name: 'goodies-view', params: { providerServiceCategory: providerServiceCategory } });
    }
  },
  async mounted(){
    await this.getProviderServiceCategories();
    await this.getCustomersAccounts();
    if(this.providerServiceCategories && this.customersAccounts) {
      let sellersProviderServiceCategories = this.providerServiceCategories.filter(category => category.service_id === '1' && category.state === '1');
      this.sellers = sellersProviderServiceCategories.map(category => {
        const account = this.customersAccounts.find(account => account._id === category.customer_id);
        return {
          _id: category._id,
          name: account ? account.name : 'Unknown',
          image: account && account.picture ? require(`@/assets/img/users/${account.picture}`) : require('@/assets/img/noteam.jpg')
        };
      });
    }
    if(this.$route.query.providerServiceCategory){
      this.goToShop(this.$route.query.providerServiceCategory);
    }
  }
};
</script>

<style scoped>
.goodies-seller-view {
  text-align: center;
}

.sellers {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.seller-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
  padding: 20px;
  width: 200px;
  text-align: center;
}

.seller-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>