<template>
  <div class="login-container">
    <form @submit.prevent="loggedUser">
      <h2>Connexion</h2>

      <div class="form-group">
        <label for="username">Nom d'utilisateur</label>
        <input
            type="text"
            id="username"
            v-model="user.login"
            required
            placeholder="Entrez votre nom d'utilisateur"
        />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
            type="password"
            id="password"
            v-model="user.password"
            required
            placeholder="Entrez votre mot de passe"
        />
      </div>

      <div class="form-button">
        <button type="submit" class="login-button">Se connecter</button>
        <router-link :to="{ name: 'register' }">
          <button type="button" class="register-button">Créer un compte</button>
        </router-link>
        <router-link :to="{ name: 'register-provider' }">
          <button type="button" class="provider-button">Devenir Prestataire</button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "LoginFormView",
  data() {
    return {
      user: {
        login: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapState("account", ["providerRequests"]),
    ...mapState('prestation', ['providerServiceCategories'])
  },
  methods: {
    ...mapActions("account", ["loginUser", 'getProviderRequests']),
    ...mapActions('prestation', ['getProviderServiceCategories']),

    async loggedUser() {
      try {
        const response = await this.loginUser(this.user);

        if (response.error === 0) {
          const loggedUser = response.data;
          switch (loggedUser.privilege) {
            case "2":
              await this.$router.push({path: "/admin-dashboard"});
              break;
            case "1":
              await this.$router.push({path: "/provider-dashboard"});
              break;
            default:
              await this.$router.push({name: "home"});
          }
        } else {
          alert(response.data);
        }
      } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        alert("Une erreur est survenue lors de la connexion.");
      }
    },
  },
  mounted() {
  }
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

.provider-button {
  background-color: #ff9800;
  color: white;
  padding: 0.75em;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.provider-button:hover {
  background-color: #e68900;
}
</style>
