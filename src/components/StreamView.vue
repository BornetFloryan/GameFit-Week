<template>
  <div class="twitch-stream-container">
    <NavView />
    <div class="iframe-container">
      <iframe
          src="https://player.twitch.tv/?channel=otplol_&parent=localhost&parent=127.0.0.1"
          allowfullscreen
          frameborder="0">
      </iframe>
    </div>
  </div>
</template>

<script>
import NavView from "@/components/NavBar.vue";

export default {
  name: 'StreamView',
  components: { NavView },
};
</script>

<style scoped>
.twitch-stream-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 84px); /* Subtract the height of the navigation bar */
  overflow: hidden;
}

.iframe-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.iframe-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>