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
        <li><router-link :to="{ name: '' }" class="link">À propos</router-link></li>
        <li class="services" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
          <router-link to="" class="link">Services</router-link>
          <ul v-show="showDropdown" class="dropdown">
            <router-link :to="{ name: 'services' }">
              <li @click="selectService('dedication')" class="link">Dédicace</li>
              <li @click="selectService('service2')" class="link">Service 2</li>
              <li @click="selectService('service3')" class="link">Service 3</li>
            </router-link>
          </ul>
        </li>
        <li><router-link :to="{ name: '' }" class="link">Contact</router-link></li>
      </ul>

      <div class="icon">
        <i @click="toggleMobileView" v-show="mobile && !mobileNav" class="fa fa-bars"></i>
        <i @click="toggleMobileView" v-show="mobileNav" class="fa fa-x"></i>
      </div>

      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
          <li><router-link :to="{ name: 'home' }" class="link">Accueil</router-link></li>
          <li><router-link :to="{ name: '' }" class="link">À propos</router-link></li>
          <li><router-link :to="{ name: 'services' }" class="link">Services</router-link></li>
          <li><router-link :to="{ name: '' }" class="link">Contact</router-link></li>
        </ul>
      </transition>
    </nav>
  </header>
</template>

<script>
import { mapActions } from 'vuex';
import { mapState } from 'vuex';

export default {
  name: 'NavView',
  data() {
    return {
      scrollPosition: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
      showDropdown: false,
    };
  },
  computed: {
    ...mapState(['selectedService']),
  },
  created() {
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  },
  methods: {
    ...mapActions(['selectService']),
    toggleMobileView() {
      this.mobileNav = !this.mobileNav;
    },
    updateScroll() {
      const scroll = window.scrollY;
      if (scroll > 50) {
        this.scrollPosition = true;
        return;
      }
      this.scrollPosition = false;
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
    },
    selectService(service) {
      this.$store.dispatch('selectService', service);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

header {
  background-color: rgba(0, 0, 0, .8);
  z-index: 99;
  width: 100%;
  position: fixed;
  color: #fff;
  transition: .5s ease all;
  height: 84px;
  top: 0;
  left: 0;
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

 .services {
   position: relative;
 }

.services .dropdown {
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
  text-align: center;
}

.services:hover .dropdown,
.services .dropdown-nav .dropdown {
  display: block;
}

.services .dropdown li {
  padding: 8px 16px;
  white-space: nowrap;
}

.services .dropdown li .link {
  color: #fff;
}

.services .dropdown li .link:hover {
  color: #00afea;
}

</style>