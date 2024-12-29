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
aside {
  display: flex;
  flex-direction: column;
  background-color: #2c3e50;
  color: #ecf0f1;
  width: 250px; /* Toujours développé */
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;
  transition: none; /* Plus de transition pour le développement */
}

.logo {
  margin-bottom: 1rem;
}

.logo img {
  width: 2rem;
}

h3 {
  color: #95a5a6;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  opacity: 1;
}

.menu {
  margin: 0 -1rem;
}

.button {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  padding: 0.5rem 1rem;
}

.button .material-icons {
  font-size: 2rem;
  color: #ecf0f1;
}

.button .text {
  color: #ecf0f1;
  opacity: 1;
}

.button:hover {
  background-color: #34495e;
}

.button:hover .material-icons,
.button:hover .text {
  color: #3498db;
}


.router-link-exact-active .material-icons,
.router-link-exact-active .text {
  color: #3498db;
}

.is-expanded .button .material-icons {
  margin-right: 1rem;
}

@media (max-width: 1024px) {
  aside {
    position: absolute;
    z-index: 99;
  }
}
</style>
