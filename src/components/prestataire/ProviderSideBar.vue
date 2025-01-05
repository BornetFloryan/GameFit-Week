<template>
  <aside class="modern-sidebar" :class="{'is-open': isSidebarOpen}">
    <div class="header">
      <div class="logo">
        <img :src="logoURL" alt="GameFit Week Logo" />
      </div>
      <button @click="logout" class="button logout-button" title="Déconnexion">
        <span class="material-icons">Déconnexion</span>
      </button>
    </div>
    <router-link to="/" class="button">
      <span class="material-icons">Accéder au site</span>
    </router-link>

    <h3>Menu</h3>
    <div class="menu">
      <!-- Lien vers la gestion des dédicaces -->
      <router-link :to="{ path: '/provider-dashboard/provider-dedication/provider-dedication-management' }" class="button">
        <span class="material-icons">Dédicaces</span>
      </router-link>
      <!-- Lien vers la gestion du restaurant -->
      <router-link :to="{ path: '/provider-dashboard/provider-restaurant/provider-restaurant-management' }" class="button">
        <span class="material-icons">restaurant</span>
      </router-link>
      <!-- Lien vers la gestion des ventes de goodies -->
      <router-link :to="{ path: '/provider-dashboard/provider-goodies/add-sale' }" class="button">
        <span class="material-icons">Vente de Goodies</span>
      </router-link>
    </div>

    <!-- Bouton pour ouvrir/fermer la sidebar sur mobile -->
    <button @click="toggleSidebar" class="button toggle-sidebar-button">
      <span class="material-icons">menu</span> Menu
    </button>
  </aside>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: 'AdminSidebar',
  data() {
    return {
      logoURL: require('@/assets/img/logo.png'),
      isSidebarOpen: true, // State pour suivre l'état d'ouverture de la sidebar
    };
  },
  methods: {
    ...mapActions('account', ['logoutUser']),
    logout() {
      this.logoutUser();
      this.$router.push('/');
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen; // Fonction pour basculer la visibilité de la sidebar
    }
  },
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

.modern-sidebar {
  display: flex;
  flex-direction: column;
  background: var(--background-gradient);
  color: var(--text-color);
  width: 220px;
  min-height: 100vh;
  padding: 1rem;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.modern-sidebar.is-open {
  transform: translateX(0); /* Sidebar visible */
}

.modern-sidebar:not(.is-open) {
  transform: translateX(-100%); /* Sidebar cachée */
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

.logout-button .material-icons {
  color: var(--text-color);
}

.toggle-sidebar-button {
  background-color: var(--primary-color);
  border: none;
  color: var(--text-color);
  font-size: 1.5rem;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  display: none;
}

@media (max-width: 1024px) {
  .modern-sidebar {
    position: absolute;
    width: 200px;
    z-index: 10;
    transform: translateX(-100%);
  }

  .toggle-sidebar-button {
    display: inline-flex; /* Afficher le bouton menu sur mobile */
    position: absolute;
    top: 10px;
    left: 10px;
  }
}
</style>
