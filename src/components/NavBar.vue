<template>
  <header :class="{ 'scrolled-nav': scrollPosition }">
    <nav>
      <div class="branding">
        <router-link :to="{ name: 'home' }" class="link">
          <img src="../assets/img/logo.png" alt="Logo" />
        </router-link>
      </div>

      <ul class="navigation">
        <li><router-link :to="{ name: 'home' }" class="link">{{ $t('nav.home') }}</router-link></li>
        <li><router-link :to="{ name: 'ticketing' }" class="link">{{ $t('nav.ticketing') }}</router-link></li>
        <li class="services" @mouseenter="showServicesDropdown = true" @mouseleave="showServicesDropdown = false">
          <router-link to="" class="link">{{ $t('nav.services') }}</router-link>
          <ul v-show="showServicesDropdown" class="dropdown">
            <li><router-link :to="{ name: 'dedication-home' }" class="link">{{ $t('nav.dedicaces') }}</router-link></li>
            <li><router-link :to="{ path: '/services/brackets' }" class="link">{{ $t('nav.tournaments') }}</router-link></li>
            <li><router-link :to="{ path: '/services/goodies-seller' }" class="link">{{ $t('nav.goodies') }}</router-link></li>
          </ul>
        </li>
        <li><router-link :to="{ path: '/prestataire/list' }" class="link">{{ $t('nav.providerList') }}</router-link></li>
        <li><router-link :to="{ path: '/services/stream' }" class="link">{{ $t('nav.live') }}</router-link></li>

        <li v-if="!currentUser"><router-link :to="{ name: 'login' }" class="link login">{{ $t('nav.login') }}</router-link></li>
        <li v-if="currentUser" class="account" @mouseenter="showAccountDropdown = true" @mouseleave="showAccountDropdown = false">
          <router-link to="" class="link">{{ currentUser.login }}</router-link>
          <ul v-show="showAccountDropdown" class="dropdown">
            <li><router-link :to="{ path: '/account/profil' }" class="link">{{ $t('nav.profile') }}</router-link></li>
            <li><router-link :to="{ path: '/account/order' }" class="link">{{ $t('nav.orders') }}</router-link></li>
            <li><router-link :to="{ path: '/account/reservation' }" class="link">{{ $t('nav.reservations') }}</router-link></li>
            <li><router-link :to="{ path: '/account/ticket' }" class="link">{{ $t('nav.tickets') }}</router-link></li>
            <li v-if="getProviderRequestsByCustomerId(currentUser._id)">
              <router-link :to="{ path: '/account/request' }" class="link">{{ $t('nav.request') }}</router-link>
            </li>
            <li v-if="dashboardPath">
              <router-link :to="{ path: dashboardPath }" class="link">{{ $t('nav.dashboard') }}</router-link>
            </li>
            <li @click="disconnected" class="link disconnect">{{ $t('nav.logout') }}</li>
          </ul>
        </li>

        <li class="language-selector">
          <button @click="changeLanguage('fr')" class="lang-button" :class="{ active: $i18n.locale === 'fr' }">FR</button>
          <button @click="changeLanguage('en')" class="lang-button" :class="{ active: $i18n.locale === 'en' }">EN</button>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'NavView',
  data() {
    return {
      scrollPosition: null,
      showServicesDropdown: false,
      showAccountDropdown: false,
    };
  },
  computed: {
    ...mapState('account', ['currentUser']),
    ...mapGetters('account', ['getProviderRequestsByCustomerId']),
    dashboardPath() {
      if (this.currentUser.privilege === "2") {
        return '/admin-dashboard';
      } else if (this.currentUser.privilege === '1') {
        return '/provider-dashboard';
      }
      return null;
    },
  },
  created() {
    this.loadCurrentUser();
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
    this.getProviderRequests();
  },
  methods: {
    ...mapActions('account', ['logoutUser', 'getProviderRequests']),
    updateScroll() {
      const scroll = window.scrollY;
      this.scrollPosition = scroll > 50;
    },

    isKeyExist(key) {
      return this.$te(key);
    },
    changeLanguage(language) {
      this.$i18n.locale = language;
    },
    async disconnected() {
      await this.logoutUser();
      localStorage.removeItem('currentUser');
      if (this.$route.name !== 'home') {
        this.$router.push({ name: 'home' });
      }
    },
    loadCurrentUser() {
      const user = localStorage.getItem('currentUser');
      if (user) {
        this.$store.commit('account/setCurrentUser', JSON.parse(user));
      }
    },
  },
  watch: {
    currentUser(newUser) {
      if (newUser) {
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        localStorage.removeItem('currentUser');
      }
    },
  },
};
</script>

<style scoped>
header {
  background-color: rgba(0, 0, 0, .8);
  width: 100%;
  color: #fff;
  transition: .5s ease all;
  height: 84px;
}

header nav {
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 12px 0;
  transition: .5s ease all;
  width: 90%;
  margin: 0 auto;
}

@media (min-width: 1140px) {
  header nav {
    max-width: 1140px;
  }
}

nav ul, nav .link {
  font-weight: 500;
  color: #fff;
  list-style: none;
  text-decoration: none;
}

nav li {
  text-transform: uppercase;
  padding: 16px;
  margin-left: 16px;
}

nav .link {
  font-size: 14px;
  transition: .5s ease all;
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
}

nav .link.login {
  border: 2px solid #00afea;
  border-radius: 8px;
  padding: 8px 16px;
  color: #fff;
}

nav .link.login:hover {
  background-color: #00afea;
  color: #fff;
}

nav .link.disconnect {
  padding: 8px 16px;
  color: #ffffff;
}

nav .link.disconnect:hover {
  color: #ff0000;
  border-bottom: 1px solid #ff0000;
  cursor: pointer;
}

nav .link:hover {
  color: #00afea;
  border-color: #00afea;
}

nav .branding {
  display: flex;
  align-items: center;
}

nav .branding img {
  width: 50px;
  transition: .5s ease all;
}

nav .navigation {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
}

.scrolled-nav {
  background-color: #000;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.scrolled-nav nav {
  padding: 8px 0;
}

.scrolled-nav nav .branding img {
  width: 40px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.services,
.account {
  position: relative;
}

.services .dropdown,
.account .dropdown {
  display: none;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  padding: 8px 0;
  border-radius: 4px;
  width: max-content;
  z-index: 1000;
  text-align: left;
}

.services:hover .dropdown,
.account:hover .dropdown {
  display: block;
}

.language-selector {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.lang-button {
  background: none;
  border: 2px solid #fff;
  padding: 8px 16px;
  margin: 0 5px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.lang-button:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.lang-button.active {
  background-color: #00afea;
  color: #fff;
}

.services .dropdown li,
.account .dropdown li {
  padding: 8px 16px;
  white-space: nowrap;
}

.services .dropdown li .link,
.account .dropdown li .link {
  color: #fff;
}

.services .dropdown li .link:hover,
.account .dropdown li .link:hover {
  color: #00afea;
}
</style>
