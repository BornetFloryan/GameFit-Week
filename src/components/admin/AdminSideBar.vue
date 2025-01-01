<template>
  <aside class="is-expanded">
    <div class="logo">
      <img :src="logoURL" alt="GameFit Week Logo" />
    </div>

    <h3>Menu</h3>
    <div class="menu">
      <router-link to="/admindashboard/admindedication" class="button">
        <span class="material-icons">Dédicaces</span>
      </router-link>
      <!-- Nouveau lien vers les demandes -->
      <router-link to="/admindashboard/adminrequests" class="button">
        <span class="material-icons">Demande Prestataires</span>
      </router-link>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'AdminSidebar',
  data() {
    return {
      logoURL: require('@/assets/img/logo.png'), // Change to dynamic import if applicable
    };
  },
};
</script>

<style scoped>
/* Les styles sont inchangés, sauf l'espacement éventuel des boutons. */
aside {
  display: flex;
  flex-direction: column;
  background-color: #2c3e50;
  color: #ecf0f1;
  width: 250px;
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;
}

.logo img {
  width: 2rem;
}

h3 {
  color: #95a5a6;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.menu .button {
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

.button .material-icons {
  font-size: 1.5rem;
  margin-right: 1rem;
}

.button:hover {
  background-color: #34495e;
  color: #3498db;
}

.router-link-exact-active {
  color: #3498db;
}
</style>
