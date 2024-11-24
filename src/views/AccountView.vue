<template>
  <div class="account-view">
    <NavView />
    <div v-if="selectedAccountInfo === 'profil'">
      <ProfilView @UpdateUser="UpdateUser"/>
    </div>
    {{ customersAccounts }}
  </div>
</template>

<script>

import {mapState, mapActions} from 'vuex'
import NavView from "@/components/NavBar.vue";
import ProfilView from "@/components/ProfilView.vue";

export default {
  name: 'LoginView',
  components: {NavView, ProfilView},
  data: () => {
    return {
    };
  },
  computed: {
    ...mapState('user', ['currentUser']),
    ...mapState('account', ['selectedAccountInfo']),
    ...mapState('customer', ['customersAccounts']),
  },
  methods: {
    ...mapActions('user', ['setCurrentUser']),
    ...mapActions('customer', ['getCustomersAccounts', 'updateCustomerAccount']),

    async UpdateUser(data) {
      try {
        let response = await this.updateCustomerAccount(data.UpdateUser);
          if (response.error === 0) {
            await this.setCurrentUser(data.UpdateUser);
            console.log("Utilisateur Actuel:", this.currentUser);
            console.log("Utilisateur Modifié:", data.UpdateUser);
          } else {
            alert(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la modification de l\'utilisateur:', error);
      }
    },
  },
  mounted() {
    this.getCustomersAccounts();
  }
}
</script>

<style scoped>
</style>