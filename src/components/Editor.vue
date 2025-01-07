<template>
  <div>
    <!-- Navbar -->
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

          <li v-if="!currentUser"><router-link :to="{ name: 'login' }" class="link login">Se connecter</router-link></li>
          <li v-if="currentUser" class="account" @mouseenter="showAccountDropdown = true" @mouseleave="showAccountDropdown = false">
            <router-link to="" class="link">{{ currentUser.login }}</router-link>
            <ul v-show="showAccountDropdown" class="dropdown">
              <li><router-link :to="{ path: '/account/profil' }" class="link">Profil</router-link></li>
              <li><router-link :to="{ path: '/account/reservation' }" class="link">Réservations</router-link></li>
              <li><router-link :to="{ path: '/account/ticket' }" class="link">Billets</router-link></li>
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

    <!-- Main Content -->
    <div class="content-editor">
      <div class="editor-explain">
        <h2>Bienvenue dans l'<span>Éditeur de contenu</span></h2>
        <p>
          Utilisez cet éditeur pour créer, modifier et personnaliser vos articles ou pages de manière intuitive. Téléchargez des images, appliquez des styles et laissez libre cours à votre créativité !
        </p>
      </div>

      <div class="editor-card">
        <div class="editor-container">
          <vue-editor
              v-model="content"
              :editor-toolbar="customToolbar"
              @imageAdded="handleImageAdded"
          />
        </div>
      </div>

      <button class="btn-save">Enregistrer</button>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: "EditorView",
  components: {
    VueEditor,
  },
  props: {
    initialContent: {
      type: String,
      default: "<h1>Écrivez votre contenu ici...</h1>",
    },
    uploadApiUrl: {
      type: String,
    },
  },
  data() {
    return {
      content: this.initialContent,
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"],
      ],
      mobileNav: false,
      showServicesDropdown: false,
      showAccountDropdown: false,
    };
  },
  methods: {
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target.result;
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader();
      };
      reader.readAsDataURL(file);
    },
    toggleMobileView() {
      this.mobileNav = !this.mobileNav;
    },
    disconnected() {
      console.log('Déconnexion');
    },
  },
};
</script>

<style scoped>
/* General layout */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  font-family: Arial, sans-serif;
  background-color: #f4f6f9;
}

body {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Navbar styles */
header {
  background-color: rgba(0, 0, 0, .8);
  width: 100%;
  color: #fff;
  height: 84px;
  position: sticky;
  top: 0;
  z-index: 100;
}

header nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 100%;
}

nav .branding img {
  width: 120px;
}

nav .navigation {
  display: flex;
  gap: 20px;
}

nav li {
  list-style: none;
}

nav .link {
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 14px;
  padding: 10px 16px;
  transition: color 0.3s ease;
}

nav .link:hover {
  color: #00afea;
}

nav .dropdown {
  position: absolute;
  background-color: #333;
  list-style: none;
  display: none;
  top: 40px;
  padding: 10px;
  width: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

nav .dropdown li {
  margin: 8px 0;
}

nav .services:hover .dropdown {
  display: block;
}

nav .icon {
  display: flex;
  align-items: center;
}

nav .icon i {
  font-size: 24px;
  cursor: pointer;
}

nav .dropdown-nav {
  display: none;
  flex-direction: column;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  padding: 20px;
}

nav .dropdown-nav li {
  margin: 10px 0;
}

nav .dropdown-nav .link {
  color: #333;
  font-size: 18px;
}

nav .dropdown-nav .link:hover {
  color: #00afea;
}

/* Main editor content */
.content-editor {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px 20px;
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
}

.editor-explain {
  text-align: center;
}

.editor-explain span {
  color: #00afea;
}

.editor-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.editor-container {
  border-radius: 8px;
  background-color: #f9f9f9;
  padding: 20px;
}

.vue-editor {
  min-height: 300px;
}

.btn-save {
  padding: 12px 40px;
  border-radius: 6px;
  background-color: #00afea;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.btn-save:hover {
  background-color: #0088cc;
}
</style>
