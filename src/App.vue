<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  data() {
    return {
      serverIP: ''
    };
  },
  mounted() {
    window.showServerIpPrompt = this.showServerIpPrompt;
    let currentUrl = window.location.href;
    let url = new URL(currentUrl);
    let urlWithoutPort = `${url.hostname}`;
    localStorage.setItem('serverIP', urlWithoutPort);
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