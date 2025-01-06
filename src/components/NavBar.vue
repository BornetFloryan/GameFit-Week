<template>
  <header :class="{ 'scrolled-nav': scrollPosition }">
    <nav>
      <div class="branding">
        <router-link :to="{ name: 'home' }" class="link">
          <img src="../assets/img/logo.png" alt="Logo" />
        </router-link>
      </div>

      <ul v-show="!mobile" class="navigation">
        <li><router-link :to="{ name: 'home' }" class="link">Accueil</router-link></li>
        <li><router-link :to="{ name: 'ticketing' }" class="link">Billetterie</router-link></li>
        <li class="services" @mouseenter="showServicesDropdown = true" @mouseleave="showServicesDropdown = false">
          <router-link to="" class="link">Services</router-link>
          <ul v-show="showServicesDropdown" class="dropdown">
            <li><router-link :to="{ path: '/services/dedication/dedication-home' }" class="link">Dédicaces</router-link></li>
            <li><router-link :to="{ path: '/services/stream' }" class="link">Stream</router-link></li>
            <li><router-link :to="{ path: '/services/brackets' }" class="link">Tournois</router-link></li>
            <li><router-link :to="{ path: '/services/hotel' }" class="link">Hotels</router-link></li>

          </ul>
        </li>


        <li class="services" @mouseenter="showServicesDropdown = true" @mouseleave="showServicesDropdown = false">
          <router-link to="" class="link">Prestation</router-link>
          <ul v-show="showServicesDropdown" class="dropdown">
            <li><router-link :to="{ path: '/prestation/goodies' }" class="link">Goodies</router-link></li>
            <li><router-link :to="{ path: '/prestation/restaurant' }" class="link">Restaurant</router-link></li>

          </ul>
        </li>

        <li v-if="!currentUser"><router-link :to="{ name: 'login' }" class="link login">Se connecter</router-link></li>
        <li v-if="currentUser" class="account" @mouseenter="showAccountDropdown = true" @mouseleave="showAccountDropdown = false">
          <router-link to="" class="link">{{ currentUser.login }}</router-link>
          <ul v-show="showAccountDropdown" class="dropdown">
            <li><router-link :to="{ path: '/account/profil' }" class="link">Profil</router-link></li>
            <li><router-link :to="{ path: '/account/reservation' }" class="link">Réservations</router-link></li>
            <li><router-link :to="{ path: '/account/ticket' }" class="link">Billets</router-link></li>
            <li v-if="getProviderRequestsByCustomerId(currentUser._id)">
              <router-link :to="{ path: '/account/request' }" class="link">Demande</router-link>
            </li>
            <li v-if="dashboardPath">
              <router-link :to="{ path: dashboardPath }" class="link">Tableau de bord</router-link>
            </li>
            <li @click="disconnected" class="link disconnect">Déconnexion</li>
          </ul>
        </li>
      </ul>

      <div class="icon">
        <i @click="toggleMobileView" v-show="mobile && !mobileNav" class="fa fa-bars"></i>
        <i @click="toggleMobileView" v-show="mobileNav" class="fa fa-x"></i>
      </div>

      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
          <li><router-link :to="{ name: 'home' }" class="link">Accueil</router-link></li>
          <li><router-link :to="{ name: 'services' }" class="link">Services</router-link></li>
          <li><router-link :to="{ name: 'login' }" class="link login">Se connecter</router-link></li>
        </ul>
      </transition>
    </nav>
  </header>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex';

export default {
  name: 'NavView',
  data() {
    return {
      scrollPosition: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
      showServicesDropdown: false,
      showAccountDropdown: false,
    };
  },
  computed: {
    ...mapState('account', ['currentUser']),
    ...mapGetters('account', ['getProviderRequestsByCustomerId']),
    dashboardPath() {
      if (this.currentUser.privilege === '2') {
        return '/admin-dashboard';
      } else if (this.currentUser.privilege === '1') {
        return '/provider-dashboard';
      }
      return null;
    },
  },
  created() {
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
    this.loadCurrentUser();
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
    this.getProviderRequests();
  },
  methods: {
    ...mapActions('account', ['logoutUser', 'getProviderRequests']),
    toggleMobileView() {
      this.mobileNav = !this.mobileNav;
    },
    updateScroll() {
      const scroll = window.scrollY;
      this.scrollPosition = scroll > 50;
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      this.mobile = this.windowWidth <= 750;
      if (!this.mobile) {
        this.mobileNav = false;
      }
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

nav .icon {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: 24px;
  height: 100%;
}

nav .icon i {
  cursor: pointer;
  font-size: 24px;
  transition: .8s ease all;
}

nav .icon-active {
  transform: rotate(180deg);
}

nav .dropdown-nav {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  width: 100%;
  max-width: 250px;
  height: 100%;
}

nav .dropdown-nav li {
  margin-left: 0;
}

nav .dropdown-nav li .link {
  color: #000;
}

nav .dropdown-nav li .link:hover {
  color: #00afea;
}

nav .mobile-nav-enter-active,
nav .mobile-nav-leave-active {
  transition: .8s ease all;
}

nav .mobile-nav-enter-from,
nav .mobile-nav-leave-to {
  transform: translateX(-250px);
}

nav .mobile-nav-enter-to{
  transform: translateX(0);
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
.services .dropdown-nav .dropdown,
.account:hover .dropdown,
.account .dropdown-nav .dropdown {
  display: block;
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
