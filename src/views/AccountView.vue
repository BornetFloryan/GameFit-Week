<template>
  <div class="account-view">
    <NavView />
    <div v-if="selectedAccountInfo === 'profil'">
      <ProfilView @ModifyCustomer=HandleModifyCustomer />
    </div>
    <div v-if="selectedAccountInfo === 'reservations'">
      <ReservationView />
    </div>
    <div v-if="selectedAccountInfo === 'tickets'">
      <TicketView />
    </div>
  </div>
</template>

<script>

import {mapState, mapActions} from 'vuex'
import NavView from "@/components/NavBar.vue";
import ProfilView from "@/components/ProfilView.vue";
import ReservationView from "@/components/ReservationView.vue";
import TicketView from "@/components/TicketView.vue";

export default {
  name: 'LoginView',
  components: { NavView, ProfilView, ReservationView, TicketView},
  data: () => {
    return {
    };
  },
  computed: {
    ...mapState('account', ['selectedAccountInfo']),
  },
  methods: {
    ...mapActions('login', ['setCurrentUser']),
    ...mapActions('customer', ['ModifyCustomer']),

    async HandleModifyCustomer(data) {
      try {
        let response = await this.ModifyCustomer(data.modifyUser);
        if (response.error === 0) {
          await this.updateCurrentUser(data.modifyUser);
        } else {
          alert(response.data.modifyUser);
        }
      } catch (error) {
        console.error('Erreur lors de la modification de l\'utilisateur:', error);
      }
    },

    async updateCurrentUser(data) {
      try {
        await this.setCurrentUser(data);
      } catch (error) {
        console.error('Erreur lors du changement des informations de l\'utilisateur courant:', error);
        alert('Erreur lors du changement des informations de l\'utilisateur courant');
      }
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
</style>