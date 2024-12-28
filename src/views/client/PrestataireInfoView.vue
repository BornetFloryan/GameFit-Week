<template>
  <div class="prestataire-info-view">
    <NavView />
    <PrestataireInfo :prestataire="prestataire" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NavView from "@/components/NavBar.vue";
import PrestataireInfo from "@/components/client/PrestataireInfo.vue";

export default {
  name: 'PrestataireInfoView',
  components: {PrestataireInfo, NavView},
  computed: {
    ...mapState('customer', ['customersAccounts']),
    prestataire() {
      const id = this.$route.params.id;
      return this.customersAccounts.find(p => p._id === id);
    }
  }
}
</script>

<style scoped>
</style>