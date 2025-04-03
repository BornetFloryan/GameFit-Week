<template>
  <div class="provider-layout">
    <aside class="modern-sidebar">
      <div class="header">
        <div class="logo">
          <img :src="logoURL" alt="GameFit Week Logo" />
        </div>
        <button @click="logout" class="button logout-button" :title="$t('providerSidebar.logout')">
          <span class="material-icons">{{ $t('providerSidebar.logout') }}</span>
        </button>
      </div>
      <ul class="language-selector">
        <li>
          <button @click="changeLanguage('fr')" class="lang-button" :class="{ active: $i18n.locale === 'fr' }">FR</button>
        </li>
        <li>
          <button @click="changeLanguage('en')" class="lang-button" :class="{ active: $i18n.locale === 'en' }">EN</button>
        </li>
      </ul>
      <h3>{{ $t('providerSidebar.menu') }}</h3>
      <div class="menu">
        <router-link :to="{ path: '/provider-dashboard/provider-schedule' }" class="button">
          <span class="material-icons">{{ $t('providerSidebar.schedule') }}</span>
        </router-link>
        <router-link :to="{ path: '/provider-dashboard/provider-editor' }" class="button">
          <span class="material-icons">{{ $t('providerSidebar.editor') }}</span>
        </router-link>
        <router-link v-if="getProviderServiceCategoriesByCustomerIdAndServiceID(currentUser._id, '0')"
                     :to="{ path: '/provider-dashboard/provider-dedication' }" class="button">
          <span class="material-icons">{{ $t('providerSidebar.dedications') }}</span>
        </router-link>
        <router-link v-if="getProviderServiceCategoriesByCustomerIdAndServiceID(currentUser._id, '1')"
                     :to="{ path: '/provider-dashboard/provider-goodies' }" class="button">
          <span class="material-icons">{{ $t('providerSidebar.goodies') }}</span>
        </router-link>
        <router-link v-if="getProviderServiceCategoriesByCustomerIdAndServiceID(currentUser._id, '2')"
                     :to="{ path: '/provider-dashboard/provider-restaurant/provider-restaurant-management' }" class="button">
          <span class="material-icons">{{ $t('providerSidebar.foodProducts') }}</span>
        </router-link>
        <router-link :to="{ path: '/provider-dashboard/provider-guestbook' }" class="button">
          <span class="material-icons">{{ $t('providerSidebar.guestbook') }}</span>
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

    changeLanguage(language) {
      this.$i18n.locale = language;
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
  width: 250px;
  min-height: 100vh;
  padding: 1rem;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  z-index: 10;
  overflow-y: auto;
  overflow-x: hidden;
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

.language-selector {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  list-style: none;
  padding: 0;
}

.language-selector li {
  margin: 0 0.5rem;
}

.language-selector .lang-button {
  background: none;
  border: 2px solid var(--text-color);
  padding: 0.5rem 1rem;
  color: var(--text-color);
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

.language-selector .lang-button:hover {
  background-color: var(--hover-color);
}

.language-selector .lang-button.active {
  background-color: var(--primary-color);
  color: var(--text-color);
  border: 2px solid var(--hover-color);
  color: blue; /* Ajoutez cette ligne pour changer la couleur du texte en bleu */
}

.lang-button.active {
  background-color: #00afea;
  color: #fff;
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
  margin-bottom: 1rem;
}

.logout-button:hover {
  background-color: var (--logout-hover-color);
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