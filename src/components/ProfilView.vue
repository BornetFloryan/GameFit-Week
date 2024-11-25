<template>
  <div class="info-container">
    <form @submit.prevent="UpdateUser">
      <h2>Informations Personnelles</h2>
      <div class="form-group">
        <label for="email">Email</label>
        <input
            type="email"
            id="email"
            v-model="email"
            required
        />
      </div>

      <div class="form-group">
        <label for="name">NOM Prénom</label>
        <input
            type="text"
            id="name"
            v-model="name"
            required
        />
      </div>

      <div class="form-group">
        <label for="username">Nom d'utilisateur</label>
        <input
            type="text"
            id="username"
            v-model="login"
            required
        />
      </div>

      <div class="form-button">
        <button type="submit" class="register-button">Modifier</button>
        <router-link :to="{ name: 'home' }">
          <button type="button" class="cancel-button">Annuler</button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: 'ProfilView',
  components: {
  },
  data() {
    return {
      name: "",
      login: "",
      email: "",
    };
  },
  computed: {
    ...mapState('user', ['currentUser']),
  },
  watch: {
  },
  methods: {
    UpdateUser() {
      this.$emit('UpdateUser', {
        UpdateUser:{
          _id: this.currentUser._id,
          name: this.name,
          login: this.login,
          email: this.email,
          password: this.currentUser.password,
          privilege: this.currentUser.privilege,
          session: this.currentUser.session,
        },
      });
    },
  },
  mounted() {
    this.email = this.currentUser.email;
    this.name = this.currentUser.name;
    this.login = this.currentUser.login;
  },
};
</script>

<style scoped>
.info-container {
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