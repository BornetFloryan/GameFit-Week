<template>
  <div class="login-view">
    <NavView />
    <div v-if="!currentUser && customer">
      <LoginInView @aCustomer="aCustomer" @loggedUser="loggedUser"/>
    </div>
    <div v-if="!customer">
      <RegisterView @addUser="addUser"/>
    </div>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'
import NavView from "@/components/NavBar.vue";
import LoginInView from "@/components/LoginIn.vue";
import RegisterView from "@/components/Register.vue";

export default {
  name: 'LoginView',
  components: { NavView, LoginInView, RegisterView },
  data: () => {
    return {
      customer: true,
      logged: false,
    };
  },
  computed: {
    ...mapState(['currentUser', 'customersAccounts']),
  },
  methods: {
    ...mapActions(['setCurrentUser', 'addCustomerAccount', 'getCustomersAccounts']),

    aCustomer(data) {
      this.customer = data.customer;
    },
    async addUser(data) {
      try {
        let response = await this.addCustomerAccount(data.newUser);
        if (response.error === 0) {
          this.customer = true;
          console.log("Nouvel utilisateur ajouté:", data.newUser);
        } else {
          alert(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
      }
    },
    async loggedUser(data) {
      try {
        let response = await this.setCurrentUser({
          login: data.login,
          password: data.password,
        });
        if (response.error === 0) {
          this.logged = data.logged;
          console.log("User logged in:", data);
          await this.$router.push({name: 'home'});
        } else {
          alert('Login or password is incorrect');
        }
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        alert('Erreur lors de la connexion');
      }
    }
  },
  mounted() {
    this.getCustomersAccounts();
  }
}
</script>

<style scoped>
.login-view {
  padding-top: 84px;
}
</style>