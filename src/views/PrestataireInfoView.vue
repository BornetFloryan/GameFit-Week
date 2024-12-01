<template>
  <div class="prestataire-info-view">
    <NavView />
    <PrestataireInfo :prestataire="prestataire" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NavView from "@/components/NavBar.vue";
import PrestataireInfo from "@/components/PrestataireInfo.vue";

export default {
  name: 'PrestataireInfoView',
  components: {PrestataireInfo, NavView},
  computed: {
    ...mapState('customer', ['customersAccounts']),
    prestataire() {
      const id = this.$route.params.id;
      console.log('Route ID:', id);
      console.log('Customers Accounts:', this.customersAccounts);
      return this.customersAccounts.find(p => p._id === id);
    }
  }
}
</script>

<style scoped>
</style>