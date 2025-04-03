<template>
  <div class="register-container">
    <form @submit.prevent="submitRegistration">
      <h2>{{ $t('registerProvider.title') }}</h2>

      <div class="form-group">
        <label for="email">{{ $t('registerProvider.email') }}</label>
        <input
            type="email"
            id="email"
            v-model="user.email"
            required
            :placeholder="$t('registerProvider.email')"
        />
      </div>

      <div class="form-group">
        <label for="name">{{ $t('registerProvider.name') }}</label>
        <input
            type="text"
            id="name"
            v-model="user.name"
            :disabled="!isEmailValid || isCustomerFound"
            required
            :placeholder="$t('registerProvider.name')"
        />
      </div>

      <div class="form-group">
        <label>{{ $t('registerProvider.serviceType') }}</label>
        <div class="dropdown">
          <button type="button" class="dropdown-button" @click="toggleDropdown" :disabled="!isEmailValid">
            {{ $t('registerProvider.chooseServiceType') }}
          </button>
          <div v-if="dropdownOpen" class="dropdown-content">
            <div v-for="service in serviceCategories" :key="service._id" class="checkbox-group">
              <input
                  type="radio"
                  :id="service._id"
                  :value="service._id"
                  v-model="user.prestationServices"
              />
              <label :for="service._id">{{ $t(`service_categories.${service.name.toLowerCase()}`) }}</label>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group" v-if="!isCustomerFound">
        <label for="username">{{ $t('registerProvider.username') }}</label>
        <input
            type="text"
            id="username"
            v-model="user.login"
            :disabled="!isEmailValid"
            required
            :placeholder="$t('registerProvider.username')"
        />
      </div>

      <div class="form-group">
        <label for="password">{{ $t('registerProvider.password') }}</label>
        <input
            type="password"
            id="password"
            v-model="user.password"
            :disabled="!isEmailValid"
            required
            :placeholder="$t('registerProvider.password')"
        />
      </div>
      <div class="form-button">
        <button type="submit" class="submit-button">{{ $t('registerProvider.submit') }}</button>
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
        _id: "",
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
    ...mapGetters('account', ['getCustomerByEmail', 'getProviderRequestsByCustomerId']),
    isEmailValid() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(this.user.email);
    }
  },
  watch: {
    'user.email': async function (newEmail) {
      const customer = this.getCustomerByEmail(newEmail);
      if (customer) {
        const requests = this.getProviderRequestsByCustomerId(customer._id);
        if (customer.privilege === "1") {
          alert("Vous êtes déjà inscrit en tant que prestataire.");
          this.$router.push({name: "login"});
        } else if (requests) {
          if (requests.state === "0") {
            alert("Vous avez déjà une demande en cours. Connectez-vous et veuillez consulter la section demande de votre compte.");
            this.$router.push({name: "login"});
          }
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
    ...mapActions("account", ['getCustomersAccounts', 'getProviderRequests', "addProviderRequest"]),
    ...mapActions("prestation", [
      "getServiceCategories",
      'getProviderGuestbookStatus',
      'getProviderScheduleStatus',
      'getProviderServiceCategories',
      'addProviderServiceCategory',
      'addProviderGuestbookStatus',
      'addProviderScheduleStatus'
    ]),

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
        await this.getCustomersAccounts();

        if (response.error === 0) {
          this.user = this.getCustomerByEmail(this.user.email);
          if (!this.user) {
            throw new Error("Utilisateur non trouvé après l'ajout de la demande");
          }

          response = await this.addProviderGuestbookStatus(this.user._id);
          if (response.error !== 0) {
            alert('addProviderGuestbookStatus :' + response.data);
            return;
          }

          response = await this.addProviderScheduleStatus(this.user);
          if (response.error !== 0) {
            alert('addProviderScheduleStatus : ' + response.data);
            return;
          }

          alert("Votre demande a été envoyée à l'administrateur. Vous pouvez la consulter en vous connectant puis dans la section demande sur votre compte.");
          this.$router.push({ name: "login" });
        } else {
          alert('addProviderRequest: ' + response.data);
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
    await this.getProviderServiceCategories();
    await this.getProviderRequests();
    await this.getProviderGuestbookStatus();
    await this.getProviderScheduleStatus();
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