<script setup>

</script>

<template>
  <div class="content-accueil">

    <div class="explain">
        <h2>Qu’est-ce que <span>GameFit Week</span> ?</h2>
        <p>
          Situé à Paris, Porte de Versailles, GameFit Week rassemble passionnés, amateurs et experts autour de
          compétitions, d’activités interactives, et de technologies innovantes.
        </p>
    </div>

    <div class="card">
      <div class="card-content">
        <div class="card-content-text">
          <h3>🎮 Une célébration du sport et de l’esport</h3>
          <p>
            Participez à des compétitions exaltantes et découvrez des démonstrations qui repoussent les limites de
            la performance.
          </p>
        </div>
        <img src="@/assets/img/sport_esport.jpg" alt="Sport et Esport">
      </div>

      <div class="card-content">
        <div class="card-content-text">
          <h3>🌟 Un lieu de rencontre et d’innovation</h3>
          <p>
            Explorez un espace où sport, technologie et divertissement se croisent pour créer des moments
            mémorables.
          </p>
        </div>
        <img src="@/assets/img/Innovation.jpg" alt="Innovation">
      </div>

      <div class="card-content">
        <div class="card-content-text">
          <h3>👨‍👩‍👧‍👦 Des activités pour tous</h3>
          <p>
            Que vous soyez joueur, spectateur ou simplement curieux, plongez dans un univers qui mêle compétition et
            convivialité.
          </p>
        </div>
        <img src="@/assets/img/convivialite.png" alt="Activités pour tous">
      </div>
    </div>

  </div>
</template>

<style scoped>

.content-accueil {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 20px auto;
  width: 70vw;
}

.explain span  {
  color: #00afea;
}

.card {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 32%;
  padding: 20px;
  border-radius: 10px;
  background-color: #3c4c59;
  color: white;
}

.card-content img {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 10px;

}

</style>