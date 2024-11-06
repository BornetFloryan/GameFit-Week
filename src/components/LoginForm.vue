<template>
  <div class="login-container">
    <form @submit.prevent="loggedUser()">
      <h2>Connexion</h2>

      <div class="form-group">
        <label for="username">Nom d'utilisateur</label>
        <input
            type="text"
            id="username"
            v-model="login"
            required
            placeholder="Entrez votre nom d'utilisateur"
        />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Entrez votre mot de passe"
        />
      </div>
      <div class="form-button">
          <button type="submit" class="login-button">Se connecter</button>
        <button @click="aCustomer" v-if="!login && !password" type="button" class="register-button">Créer un compte</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'LoginFormView',
  components: {
  },
  data() {
    return {
      login: '',
      password:'',
    };
  },
  computed: {
    ...mapState(['currentUser']),

  },
  watch: {
  },
  methods: {
    ...mapActions(['setCurrentUser']),

    loggedUser() {
      this.$emit('loggedUser', {
        login: this.login,
        password: this.password,
        logged: true,
      });

      this.login = '';
      this.password = '';
    },

    aCustomer() {
      this.$emit('aCustomer', {
        customer: false,
      });
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
.login-container {
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
input[type="password"]:focus {
  border-color: #007bff;
}

.form-button {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
}

.login-button {
  background-color: #007bff;
  color: white;
  padding: 0.75em;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #0056b3;
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
</style>