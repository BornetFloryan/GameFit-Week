<template>
  <div class="prestataire-info-view">
    <NavView />
    <PrestataireInfo :prestataire="prestataire" />
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
import NavView from "@/components/NavBar.vue";
import PrestataireInfo from "@/components/PrestataireInfo.vue";

export default {
  name: 'PrestataireInfoView',
  components: {PrestataireInfo, NavView},
  computed: {
    ...mapState('account', ['customersAccounts']),
    ...mapGetters('account', ['getCustomerById']),
    prestataire() {
      const id = this.$route.params.id;
      return this.getCustomerById(id);
    }
  }
}
</script>

<style scoped>
</style>