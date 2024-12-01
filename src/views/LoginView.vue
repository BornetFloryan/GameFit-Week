<template>
  <div class="login-view">
    <NavView />
    <div v-if="!currentUser && customer">
      <LoginFormView @aCustomer="aCustomer" @loggedUser="loggedUser"/>
    </div>
    <div v-if="!customer">
      <RegisterFormView @addUser="addUser"/>
    </div>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'
import NavView from "@/components/NavBar.vue";
import LoginFormView from "@/components/LoginForm.vue";
import RegisterFormView from "@/components/RegisterForm.vue";
import {customersAccounts} from "@/datasource/data";

export default {
  name: 'LoginView',
  components: { NavView, LoginFormView, RegisterFormView },
  data: () => {
    return {
      customer: true,
      logged: false,
    };
  },
  computed: {
    ...mapState('login', ['currentUser']),
    ...mapState('customer', ['customersAccounts']),
  },
  methods: {
    ...mapActions('login', ['setCurrentUser']),
    ...mapActions('customer', ['addCustomerAccount', 'getCustomersAccounts']),

    aCustomer(data) {
      this.customer = data.customer;
    },
    async addUser(data) {
      try {
        let response = await this.addCustomerAccount(data.newUser);
        if (response.error === 0) {
          this.customer = true;
        } else {
          alert(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
      }
    },
    async loggedUser(data) {
      try {
        let response = await this.setCurrentUser(data);
        if (response.error === 0) {
          this.logged = data.logged;
          let user = customersAccounts.find((customer) => customer.login === data.login);
          if (user.privilege !== "0")
            await this.$router.push({name: 'dashboard'});
          else
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
</style>