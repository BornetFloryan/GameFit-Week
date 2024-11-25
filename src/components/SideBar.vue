<template>
  <aside :class="`${is_expanded ? 'is-expanded' : ''}`">
    <div class="logo">
      <img :src="logoURL" alt="GameFit Week" />
    </div>

    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="material-icons">keyboard_double_arrow_right</span>
      </button>
    </div>

    <h3>Menu</h3>
    <div class="menu">
      <router-link to="/" class="button">
        <span class="material-icons">home</span>
        <span class="text">Accueil</span>
      </router-link>
      <router-link to="/ticketing" class="button">
        <span class="material-icons">confirmation_number</span>
        <span class="text">Billetterie</span>
      </router-link>
      <router-link to="/services" class="button">
        <span class="material-icons">build</span>
        <span class="text">Services</span>
      </router-link>
      <router-link to="/about" class="button">
        <span class="material-icons">info</span>
        <span class="text">À propos</span>
      </router-link>
    </div>

    <div class="flex"></div>

    <div class="menu">
      <router-link to="/settings" class="button">
        <span class="material-icons">settings</span>
        <span class="text">Paramètres</span>
      </router-link>
    </div>
  </aside>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'LoginFormView',
  data() {
    return {
      is_expanded: false,
      logoURL: require('@/assets/img/logo.png'),
    };
  },
  computed: {
    ...mapState('user', ['currentUser']),
  },
  methods: {
    ...mapActions('user', ['setCurrentUser']),
    ToggleMenu() {
      this.is_expanded = !this.is_expanded;
    },
  },
};
</script>

<style scoped>
aside {
  display: flex;
  flex-direction: column;
  background-color: #2c3e50;
  color: #ecf0f1;
  width: calc(2rem + 32px);
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;
  transition: 0.2s ease-in-out;
}

.flex {
  flex: 1 1 0%;
}

.logo {
  margin-bottom: 1rem;
}

.logo img {
  width: 2rem;
}

.menu-toggle-wrap {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  position: relative;
  top: 0;
  transition: 0.2s ease-in-out;
}

.menu-toggle {
  transition: 0.2s ease-in-out;
}

.menu-toggle .material-icons {
  font-size: 2rem;
  color: #ecf0f1;
  transition: 0.2s ease-out;
}

.menu-toggle:hover .material-icons {
  color: #3498db;
  transform: translateX(0.5rem);
}

h3 {
  color: #95a5a6;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.menu {
  margin: 0 -1rem;
}

.button {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: 0.2s ease-in-out;
  padding: 0.5rem 1rem;
}

.button .material-icons {
  font-size: 2rem;
  color: #ecf0f1;
  transition: 0.2s ease-in-out;
}

.button .text {
  color: #ecf0f1;
  transition: 0.2s ease-in-out;
  opacity: 0;
}

.button:hover {
  background-color: #34495e;
}

.button:hover .material-icons,
.button:hover .text {
  color: #3498db;
}

.router-link-exact-active {
  background-color: #34495e;
  border-right: 5px solid #3498db;
}

.router-link-exact-active .material-icons,
.router-link-exact-active .text {
  color: #3498db;
}

.is-expanded {
  width: 250px;
}

.is-expanded .menu-toggle-wrap {
  top: -3rem;
}

.is-expanded .menu-toggle {
  transform: rotate(-180deg);
}

.is-expanded h3,
.is-expanded .button .text {
  opacity: 1;
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