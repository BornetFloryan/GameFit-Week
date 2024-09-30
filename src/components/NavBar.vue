<template>
  <div>
    <nav class="container">
      <div class="item">
        <a class="navbar-brand" href="/">Accueil</a>
      </div>
        <div class="item">
        <a class="navbar-brand" href="/reservation">Réservation</a>
      </div>
      <div class="item">
        <a class="navbar-brand" href="/classements">Classements</a>
      </div>
      <div class="item">
        <a class="navbar-brand" href="/more">More</a>
      </div>
     </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: { titles: Array }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  padding: 1rem;
  background-color: #333;
  height: 20px;
  z-index: 1;
}

.item {
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}

.navbar-brand {
  color: #fff;
  text-decoration: none;
  font-size: 1.5em;
}

.navbar-brand:hover {
  color: #007bff;
}
</style>