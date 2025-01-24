<template>
  <div class="provider-layout">
    <aside class="modern-sidebar">
      <div class="header">
        <div class="logo">
          <img :src="logoURL" alt="GameFit Week Logo" />
        </div>
        <button @click="logout" class="button logout-button" title="Déconnexion">
          <span class="material-icons">Déconnexion</span>
        </button>
      </div>

      <h3>Menu</h3>
      <div class="menu">
        <router-link :to="{ path: '/provider-dashboard/provider-schedule' }" class="button">
          <span class="material-icons">Emploi du temps</span>
        </router-link>
        <router-link :to="{ path: '/provider-dashboard/provider-editor' }" class="button">
          <span class="material-icons">Page de présentation</span>
        </router-link>
        <router-link v-if="getProviderServiceCategoriesByCustomerIdAndServiceID(currentUser._id, '0')"
                     :to="{ path: '/provider-dashboard/provider-dedication' }" class="button">
          <span class="material-icons">Dédicaces</span>
        </router-link>
        <router-link v-if="getProviderServiceCategoriesByCustomerIdAndServiceID(currentUser._id, '1')"
                     :to="{ path: '/provider-dashboard/provider-goodies' }" class="button">
          <span class="material-icons">Goodies</span>
        </router-link>
        <router-link v-if="getProviderServiceCategoriesByCustomerIdAndServiceID(currentUser._id, '2')"
                     :to="{ path: '/provider-dashboard/provider-restaurant/provider-restaurant-management' }" class="button">
          <span class="material-icons">Produits Alimentaires</span>
        </router-link>
        <router-link :to="{ path: '/provider-dashboard/provider-guestbook' }" class="button">
          <span class="material-icons">Livre d'Or</span>
        </router-link>
        <router-link :to="{ path: '/provider-dashboard/chart' }" class="button">
          <span class="material-icons">Graphique</span>
        </router-link>
      </div>
    </aside>
    <div class="main-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: 'ProviderSidebar',
  data() {
    return {
      logoURL: require('@/assets/img/logo.png'),
      providerServiceCategories: [],
    };
  },
  computed: {
    ...mapState('account', ['currentUser']),
    ...mapGetters('prestation', ['getProviderServiceCategoriesByCustomerIdAndServiceID'])
  },
  methods: {
    ...mapActions('account', ['logoutUser']),
    ...mapActions('prestation', ['getProviderServiceCategories']),
    logout() {
      this.logoutUser();
      this.$router.push('/');
    },
  },
  async mounted() {
    await this.getProviderServiceCategories();
  }
};
</script>

<style scoped>
:root {
  --primary-color: #3498db;
  --secondary-color: #2c3e50;
  --text-color: #ffffff;
  --hover-color: #5dade2;
  --logout-color: #e74c3c;
  --logout-hover-color: #c0392b;
  --background-gradient: linear-gradient(135deg, #2c3e50, #34495e);
}

.provider-layout {
  display: flex;
}

.modern-sidebar {
  display: flex;
  flex-direction: column;
  background: var(--background-gradient);
  color: var(--text-color);
  width: 220px;
  min-height: 100vh;
  padding: 1rem;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.logo img {
  width: 3rem;
  border-radius: 50%;
  border: 2px solid var(--primary-color);
}

h3 {
  color: var(--primary-color);
  font-size: 1rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  font-weight: 600;
}

.menu {
  display: flex;
  flex-direction: column;
}

.button {
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.8rem 1rem;
  background: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
  color: var(--text-color);
}

.button .material-icons {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

.button:hover {
  background-color: var(--hover-color);
  transform: translateX(5px);
}

.router-link-exact-active .material-icons,
.router-link-exact-active .text {
  color: var(--primary-color);
}

.logout-button {
  background-color: var(--logout-color);
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
}

.logout-button:hover {
  background-color: var(--logout-hover-color);
  transform: scale(1.05);
}

.logout-button .material-icons,
.logout-button .text {
  color: var(--text-color);
}

.main-content {
  margin-left: 220px;
  padding: 1rem;
  flex: 1;
}

@media (max-width: 1024px) {
  .modern-sidebar {
    width: 200px;
  }

  .button {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
  }

  .button .material-icons {
    font-size: 1.2rem;
    margin-right: 0.3rem;
  }

  .logout-button {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  .logout-button .material-icons {
    font-size: 1.2rem;
  }

  .main-content {
    margin-left: 200px;
  }
}

@media (max-width: 768px) {
  .modern-sidebar {
    width: 180px;
  }

  .button {
    padding: 0.5rem 0.7rem;
    font-size: 0.8rem;
  }

  .button .material-icons {
    font-size: 1rem;
    margin-right: 0.2rem;
  }

  .logout-button {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
  }

  .logout-button .material-icons {
    font-size: 1rem;
  }

  .main-content {
    margin-left: 180px;
  }
}
</style>