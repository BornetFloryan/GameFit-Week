<template>
  <div class="register-container">
    <form @submit.prevent="addUser">
      <h2>{{ $t('register.title') }}</h2>

      <div class="form-group">
        <label for="email">{{ $t('register.email') }}</label>
        <input
            type="email"
            id="email"
            v-model="newUser.email"
            required
            :placeholder="$t('register.email_placeholder')"
        />
      </div>

      <div class="form-group">
        <label for="name">{{ $t('register.name') }}</label>
        <input
            type="text"
            id="name"
            v-model="newUser.name"
            required
            :placeholder="$t('register.name_placeholder')"
        />
      </div>

      <div class="form-group">
        <label for="username">{{ $t('register.username') }}</label>
        <input
            type="text"
            id="username"
            v-model="newUser.login"
            required
            :placeholder="$t('register.username_placeholder')"
        />
      </div>

      <div class="form-group">
        <label for="password">{{ $t('register.password') }}</label>
        <input
            type="password"
            id="password"
            v-model="newUser.password"
            required
            :placeholder="$t('register.password_placeholder')"
        />
      </div>

      <div class="form-button">
        <button type="submit" class="register-button">{{ $t('register.register_button') }}</button>
        <router-link :to="{ name: 'login' }">
          <button type="button" class="cancel-button">{{ $t('register.cancel_button') }}</button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: 'RegisterFormView',
  data() {
    return {
      newUser: {
        email: '',
        name: '',
        login: '',
        password: '',
      }
    };
  },
  methods: {
    ...mapActions('account', ['addCustomerAccount']),
    async addUser() {
      try {
        let response = await this.addCustomerAccount(this.newUser);
        if (response.error === 0) {
          this.$router.push({ name: 'login' });
        } else {
          alert(this.$t('register.error_message'));
        }
      } catch (error) {
        console.error(this.$t('register.error_message'), error);
      }
    },
  },
};
</script>


<style scoped>
.register-container {
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
