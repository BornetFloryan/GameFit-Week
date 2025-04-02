import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueI18n from 'vue-i18n'; 


import en from './i18n/en';
import fr from './i18n/fr';

Vue.config.productionTip = false;


Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'fr',
  messages: {
    en,
    fr
  }
});


new Vue({
  router,
  store,
  i18n, // Ajouter i18n à l'instance Vue
  render: h => h(App)
}).$mount('#app');
