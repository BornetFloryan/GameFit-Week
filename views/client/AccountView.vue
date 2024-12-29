<template>
  <div class="account-view">
    <NavView />
    <router-view />
  </div>
</template>

<script>

import NavView from "@/components/NavBar.vue";

export default {
  name: 'AccountView',
  components: { NavView },
  data: () => {
    return {
    };
  },
  computed: {
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style scoped>
</style>