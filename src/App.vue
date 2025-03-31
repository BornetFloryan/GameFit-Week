<template>
  <div id="app">
    <ServerIpPrompt ref="serverIpPrompt" @ip-submitted="setServerIP" />
    <router-view></router-view>
  </div>
</template>

<script>
import ServerIpPrompt from './views/ServerIpPrompt.vue';

export default {
  components: {
    ServerIpPrompt
  },
  data() {
    return {
      serverIP: ''
    };
  },
  methods: {
    setServerIP(ip) {
      this.serverIP = ip;
      localStorage.setItem('serverIP', ip);
    },
    showServerIpPrompt() {
      this.$refs.serverIpPrompt.showPrompt();
    }
  },
  mounted() {
    window.showServerIpPrompt = this.showServerIpPrompt;
  }
};
</script>

<style>
*, ::before, ::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  background-color: #f4f4f4;
}

a {
  color: black;
  text-decoration: none;
}
</style>