<template>
  <div class="gamefit-intro">
    <NavView />
    <CarouselAccueil />
    <div class="intro-content">
      <section class="what-is-gamefit">
        <h2>Qu’est-ce que <span>GameFit Week</span> ?</h2>
        <p>
          Situé à Paris, Porte de Versailles, GameFit Week rassemble passionnés, amateurs et experts autour de compétitions, d’activités interactives, et de technologies innovantes.
        </p>
        <div class="key-points">
          <div class="key-point">
            <div class="text">
              <h3>🎮 Une célébration du sport et de l’esport</h3>
              <p>
                Participez à des compétitions exaltantes et découvrez des démonstrations qui repoussent les limites de la performance.
              </p>
            </div>
            <img src="@/assets/img/logo.png" alt="Sport et Esport">
          </div>
          <div class="key-point reverse">
            <img src="@/assets/img/logo.png" alt="Innovation">
            <div class="text">
              <h3>🌟 Un lieu de rencontre et d’innovation</h3>
              <p>
                Explorez un espace où sport, technologie et divertissement se croisent pour créer des moments mémorables.
              </p>
            </div>
          </div>
          <div class="key-point">
            <div class="text">
              <h3>👨‍👩‍👧‍👦 Des activités pour tous</h3>
              <p>
                Que vous soyez joueur, spectateur ou simplement curieux, plongez dans un univers qui mêle compétition et convivialité.
              </p>
            </div>
            <img src="@/assets/img/logo.png" alt="Activités pour tous">
          </div>
        </div>
      </section>
      <div class="cta">
        <router-link to="/billetterie" class="cta-button">Rejoignez-nous à GameFit Week</router-link>
        <p>Vivez une expérience unique où dépassement de soi et plaisir se rencontrent.</p>
      </div>
    </div>
  </div>
</template>

<script>
import NavView from "@/components/NavBar.vue";
import CarouselAccueil from "@/components/CarouselAccueil.vue";

export default {
  name: 'GameFitIntro',
  components: {CarouselAccueil, NavView},
};
</script>

<style scoped>
.gamefit-intro {
  padding: 20px;
}

.intro-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.what-is-gamefit h2 {
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
}

.key-points {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Responsive grid */
  gap: 40px;
  margin-top: 40px;
}

.key-point {
  display: flex;
  align-items: center;
  gap: 20px;
}

.key-point.reverse {
  flex-direction: row-reverse; /* Inverse pour alterner gauche/droite */
}

.key-point img {
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.key-point img:hover {
  transform: scale(1.05);
}

.key-point .text {
  flex: 1;
  text-align: left;
}

.key-point h3 {
  font-size: 1.8rem;
  color: #444;
  margin-bottom: 10px;
}

.key-point p {
  font-size: 1rem;
  color: #666;
}

.cta {
  text-align: center;
  margin-top: 40px;
}

.cta-button {
  display: inline-block;
  background-color: #007BFF;
  color: white;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .key-point {
    flex-direction: column; /* Stack on smaller screens */
  }

  .key-point img {
    max-width: 100%;
  }
}
</style>
