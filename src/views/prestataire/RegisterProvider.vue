<template>
  <div class="register-container">
    <form @submit.prevent="submitRegistration">
      <h2>Créer un compte Prestataire</h2>

      <!-- Prénom -->
      <div class="form-group">
        <label for="firstName">Prénom</label>
        <input
            type="text"
            id="firstName"
            v-model="user.firstName"
            required
            placeholder="Entrez votre prénom"
        />
      </div>

      <!-- Nom -->
      <div class="form-group">
        <label for="lastName">Nom</label>
        <input
            type="text"
            id="lastName"
            v-model="user.lastName"
            required
            placeholder="Entrez votre nom"
        />
      </div>

      <!-- Type d'activité -->
      <div class="form-group">
        <label for="businessType">Type d'activité</label>
        <select
            id="businessType"
            v-model="user.businessType"
            required
        >
          <option value="" disabled>Choisissez votre type d'activité</option>
          <option value="restauration">Restauration</option>
          <option value="dedicace">Dédicace</option>
          <option value="goodies">Goodies</option>
        </select>
      </div>

      <!-- Nom de l'entreprise -->
      <div class="form-group">
        <label for="businessName">Nom de l'entreprise</label>
        <input
            type="text"
            id="businessName"
            v-model="user.businessName"
            required
            placeholder="Entrez le nom de votre entreprise"
        />
      </div>

      <!-- Mot de passe -->
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
            type="password"
            id="password"
            v-model="user.password"
            required
            placeholder="Entrez votre mot de passe"
            minlength="6"
        />
      </div>

      <!-- Confirmer le mot de passe -->
      <div class="form-group">
        <label for="confirmPassword">Confirmer le mot de passe</label>
        <input
            type="password"
            id="confirmPassword"
            v-model="user.confirmPassword"
            required
            placeholder="Confirmez votre mot de passe"
            minlength="6"
        />
      </div>

      <!-- Bouton de soumission -->
      <div class="form-button">
        <button type="submit" class="submit-button">S'inscrire</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "RegisterProvider",
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        businessType: "",
        businessName: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    ...mapActions("account", ["submitProviderRequest"]),

    async submitRegistration() {
      // Vérification si les mots de passe correspondent
      if (this.user.password !== this.user.confirmPassword) {
        alert("Les mots de passe ne correspondent pas.");
        return;
      }

      try {
        // Soumettre la demande d'inscription au store ou backend
        const response = await this.submitProviderRequest(this.user);
        if (response.error === 0) {
          alert("Votre demande a été envoyée à l'administrateur.");
          // Redirection vers une autre page (par exemple : connexion ou tableau de bord)
          this.$router.push({ name: "login" });
        } else {
          alert("Erreur lors de l'enregistrement.");
        }
      } catch (error) {
        console.error("Erreur lors de l'enregistrement:", error);
        alert("Une erreur est survenue lors de l'enregistrement.");
      }
    },
  },
};
</script>

<style scoped>
/* Votre style pour le formulaire */
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
select,
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
select:focus,
input[type="password"]:focus {
  border-color: #007bff;
}

.submit-button {
  background-color: #28a745;
  color: white;
  padding: 0.75em 1.5em;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #218838;
}
</style>
