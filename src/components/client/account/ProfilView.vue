<template>
  <div class="profil-container">
    <form @submit.prevent="ModifyCustomer">
      <h2>{{ $t('profile.personal_info') }}</h2>
      <div class="form-group">
        <label for="email">{{ $t('profile.email') }}</label>
        <input
            type="email"
            id="email"
            v-model="email"
            required
        />
      </div>

      <div class="form-group">
        <label for="name">{{ $t('profile.name') }}</label>
        <input
            type="text"
            id="name"
            v-model="name"
            required
        />
      </div>

      <div class="form-group">
        <label for="username">{{ $t('profile.username') }}</label>
        <input
            type="text"
            id="username"
            v-model="login"
            required
        />
      </div>

      <div class="form-button">
        <button type="submit" class="register-button">{{ $t('profile.modify_button') }}</button>
        <router-link :to="{ name: 'home' }">
          <button type="button" class="cancel-button">{{ $t('profile.cancel_button') }}</button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ProfilView',
  data() {
    return {
      id: '',
      name: '',
      login: '',
      password: '',
      email: '',
      privilege: '',
      session: '',
    };
  },
  computed: {
    ...mapState('account', ['currentUser']),
  },
  methods: {
    ...mapActions('account', ['modifyCustomerAccount', 'loginUser']),
    async ModifyCustomer() {
      let modifyUser = {
        _id: this.id,
        name: this.name,
        login: this.login,
        password: this.password,
        email: this.email,
        privilege: this.privilege,
        session: this.session,
      };

      try {
        let response = await this.modifyCustomerAccount(modifyUser);
        if (response.error === 0) {
          await this.loginUser(modifyUser);
          alert(this.$t('profile.modify_success'));
        } else {
          alert(this.$t('profile.modify_error') + ': ' + response.data.modifyUser);
        }
      } catch (error) {
        console.error(this.$t('profile.modify_error'), error);
      }
    },
  },
  mounted() {
    this.id = this.currentUser._id;
    this.name = this.currentUser.name;
    this.login = this.currentUser.login;
    this.password = this.currentUser.password;
    this.email = this.currentUser.email;
    this.privilege = this.currentUser.privilege;
    this.session = this.currentUser.session;
  },
};
</script>

<style scoped>
.profil-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: #f3f4f6;
}

form {
  background: white;
  padding: 2em;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h2 {
  margin-bottom: 1.5em;
  color: #333;
  font-size: 1.5em;
}

.form-group {
  margin-bottom: 1.5em;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5em;
  font-size: 0.9em;
  color: #555;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 0.75em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
  border-color: #007bff;
}

.form-button {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
}

.register-button {
  background-color: #28a745;
  color: white;
  padding: 0.75em;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1em;
}

.register-button:hover {
  background-color: #218838;
}

.cancel-button {
  background-color: #dc3545;
  color: white;
  padding: 0.75em;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cancel-button:hover {
  background-color: #ff0000;
}
</style>
