<template>
  <div class="register-container">
    <form @submit.prevent="addUser">
      <h2>Enregistrement</h2>

      <div class="form-group">
        <label for="email">Email</label>
        <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Entrez votre email"
        />
      </div>

      <div class="form-group">
        <label for="name">NOM Prénom</label>
        <input
            type="text"
            id="name"
            v-model="name"
            required
            placeholder="Entrez votre NOM Prénom"
        />
      </div>

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
        <button type="submit" class="register-button">S'enregistrer</button>
        <router-link :to="{ name: 'home' }">
          <button type="button" class="cancel-button">Annuler</button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'RegisterFormView',
  components: {
  },
  data() {
    return {
      email: '',
      name: '',
      login: '',
      password:'',
    };
  },
  computed: {

  },
  watch: {
  },
  methods: {
    addUser() {
      this.$emit('addUser', {
        newUser:{
          name: this.name,
          login: this.login,
          password: this.password,
          email: this.email,
        },
      });

      this.email = '';
      this.name = '';
      this.login = '';
      this.password = '';
    },
  },
  mounted() {
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