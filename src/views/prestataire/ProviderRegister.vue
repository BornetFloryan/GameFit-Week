<template>
  <div class="register-container">
    <form @submit.prevent="submitRegistration">
      <h2>Devenir prestataire</h2>

      <div class="form-group">
        <label for="email">Adresse email</label>
        <input
            type="email"
            id="email"
            v-model="user.email"
            required
            placeholder="Entrez une adresse email"
        />
      </div>

      <div class="form-group">
        <label for="name">Nom de l'entreprise ou NOM Prénom</label>
        <input
            type="text"
            id="name"
            v-model="user.name"
            :disabled="!isEmailValid || isCustomerFound"
            required
            placeholder="Entrez le nom de votre entreprise ou NOM Prénom"
        />
      </div>

      <div class="form-group">
        <label>Type de prestation</label>
        <div class="dropdown">
          <button type="button" class="dropdown-button" @click="toggleDropdown" :disabled="!isEmailValid">
            Choisissez votre type de prestation
          </button>
          <div v-if="dropdownOpen" class="dropdown-content">
            <div v-for="service in serviceCategories" :key="service._id" class="checkbox-group">
              <input
                  type="checkbox"
                  :id="service._id"
                  :value="service._id"
                  v-model="user.prestationServices"
              />
              <label :for="service._id">{{ service.name }}</label>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group" v-if="!isCustomerFound">
        <label for="username">Nom d'utilisateur</label>
        <input
            type="text"
            id="username"
            v-model="user.login"
            :disabled="!isEmailValid"
            required
            placeholder="Entrez un nom d'utilisateur"
        />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
            type="password"
            id="password"
            v-model="user.password"
            :disabled="!isEmailValid"
            required
            placeholder="Entrez votre mot de passe"
            minlength="6"
        />
      </div>
      <div class="form-button">
        <button type="submit" class="submit-button">S'inscrire</button>
      </div>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex';

export default {
  name: "RegisterProvider",
  data() {
    return {
      user: {
        name: "",
        login: "",
        password: "",
        email: "",
        prestationServices: [],
      },
      dropdownOpen: false,
      isCustomerFound: false,
      previousServices: [],
    };
  },
  computed: {
    ...mapState('prestation', ['serviceCategories']),
    ...mapState('account', ['providerRequests']),
    ...mapGetters('account', ['getCustomerByEmail', 'getPendingRequestByCustomerId']),
    isEmailValid() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(this.user.email);
    }
  },
  watch: {
    'user.email': async function (newEmail) {
      const customer = this.getCustomerByEmail(newEmail);
      if (customer) {
        const pendingRequest = this.getPendingRequestByCustomerId(customer._id);
        if (customer.privilege === "1") {
          alert("Vous êtes déjà inscrit en tant que prestataire.");
          this.$router.push({name: "login"});
        } else if (pendingRequest) {
          alert("Vous avez déjà une demande en cours. Connectez-vous et veuillez consulter la section demande de votre compte.");
          this.$router.push({name: "login"});
        } else {
          this.user.name = customer.name;
          this.isCustomerFound = true;
          this.user.prestationServices = this.previousServices;
        }
      } else {
        this.resetUserData();
        this.isCustomerFound = false;
      }
    }
  },
  methods: {
    ...mapActions("account", ['getCustomersAccounts', 'getProviderRequests',"addProviderRequest"]),
    ...mapActions("prestation", ["getServiceCategories", 'addProviderServiceCategory']),

    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },

    resetUserData() {
      this.user.name = "";
      this.user.login = "";
      this.user.password = "";
      this.previousServices = this.user.prestationServices;
      this.user.prestationServices = [];
    },

    async submitRegistration() {
      try {
        let response = await this.addProviderRequest(this.user);
        if (response.error === 0) {
          for (let service of this.user.prestationServices) {
            response = await this.addProviderServiceCategory({
              user: this.user,
              serviceCategory: service,
            });
          }
          alert("Votre demande a été envoyée à l'administrateur. Vous pouvez la consulter en vous connectant puis dans la section demande sur votre compte.");
          this.$router.push({name: "login"});
        } else {
          alert(response.data);
        }
      } catch (error) {
        console.error("Erreur lors de l'enregistrement:", error);
        alert("Une erreur est survenue lors de l'enregistrement.");
      }
    },
  },
  async created() {
    await this.getCustomersAccounts();
    await this.getServiceCategories();
    await this.getProviderRequests();
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
input[type="password"],
input[type="email"] {
  width: 100%;
  padding: 0.75em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="password"]:focus,
input[type="email"]:focus {
  border-color: #007bff;
}

.checkbox-group {
  display: flex;
  align-items: center;
  margin-bottom: 0.5em;
}

.checkbox-group input {
  margin-right: 0.5em;
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

input:disabled::placeholder {
  color: transparent;
}

input:disabled {
  background-color: #e9ecef;
  color: #6c757d;
  cursor: not-allowed;
}

.dropdown {
  position: relative;
}

.dropdown-button {
  width: 100%;
  padding: 0.75em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  text-align: left;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
}
</style>