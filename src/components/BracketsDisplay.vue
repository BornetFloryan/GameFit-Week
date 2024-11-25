<template>
  <div class="brackets-display">
    <h1>Bracket du Tournoi</h1>
    <div class="brackets-container">
      <!-- Round 1 -->
      <div class="round">
        <div class="match-container">
          <div class="match">
            <div class="team">Team Liquid</div>
            <div class="team">Fnatic</div>
          </div>

        </div>
        <div class="match-container">
          <div class="match">
            <div class="team">G2 Esports</div>
            <div class="team">T1</div>
          </div>

        </div>
        <div class="match-container">
          <div class="match">
            <div class="team">Cloud9</div>
            <div class="team">Natus Vincere</div>
          </div>

        </div>
        <div class="match-container">
          <div class="match">
            <div class="team">Evil Geniuses</div>
            <div class="team">100 Thieves</div>
          </div>

        </div>
      </div>

      <!-- Round 2 -->
      <div class="round">
        <div class="match-container">
          <div class="match">
            <div class="team">Fnatic</div>
            <div class="team">G2 Esports</div>
          </div>

        </div>
        <div class="match-container">
          <div class="match">
            <div class="team">Natus Vincere</div>
            <div class="team">Evil Geniuses</div>
          </div>

        </div>
      </div>

      <!-- Round 3 -->
      <div class="round">
        <div class="match-container">
          <div class="match">
            <div class="team">Fnatic</div>
            <div class="team">Evil Geniuses</div>
          </div>
        </div>
      </div>
    </div>
    <h2>Les Équipes</h2>
    <div class="detail-team-container">


    <div v-for="(round, index) in teams" :key="index" class="round">


      <div class="detail-team">
        <h3>{{ round.name }}</h3>
        <div class="team-description-div">
          <img src="data:image/jpeg;base64,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" alt="img" style="width: 100px">
          <p class="team-description">{{ round.description }}</p>
        </div>
      </div>
    </div>

    </div>
  </div>

</template>


<script>
export default {
  name: "BracketsDisplay",
  data: () => ({
    teams: [
      {
        name: "Team Liquid",
        img:"",
        description: "Team Liquid est l’une des organisations les plus emblématiques de l’e-sport mondial, reconnue pour son incroyable polyvalence et ses résultats constants dans de multiples disciplines telles que Dota 2, League of Legends, CS:GO et bien d’autres. Fondée en 2000, cette équipe a su évoluer avec les tendances de l’industrie, recrutant des talents de classe mondiale et développant des stratégies innovantes. Leur capacité à s’adapter à différents styles de jeu et à maintenir un haut niveau de performance les a souvent placés parmi les favoris dans les compétitions majeures. Au-delà de leurs performances en tournoi, Team Liquid est également reconnue pour son engagement envers la communauté e-sportive et son influence dans la culture gaming."
      },
      {
        name: "Fnatic",
        img:"data:image/png;base64,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",
        description: "Fnatic est une légende vivante de l’e-sport, avec un palmarès impressionnant couvrant plus d’une décennie. Cette équipe basée au Royaume-Uni est particulièrement célèbre pour son succès dans League of Legends et CS:GO, où elle a remporté de nombreux titres prestigieux. Fnatic est connue pour son approche innovante du jeu, testant constamment de nouvelles stratégies et surprenant ses adversaires avec des mouvements imprévisibles. Leur équipe est composée de joueurs talentueux qui excellent individuellement tout en montrant une synergie d’équipe remarquable. En plus de leur succès compétitif, Fnatic est un pionnier dans la promotion de l’e-sport en tant que phénomène global, grâce à des partenariats innovants et une forte présence sur les réseaux sociaux."
      },
      {
        name: "G2 Esports",
        img:"",
        description: "G2 Esports, souvent surnommée 'les Samouraïs', est une organisation qui combine talent brut, flair et charisme. Basée en Europe, cette équipe s’est imposée comme l’une des plus dominantes dans des jeux comme League of Legends, CS:GO et Valorant. G2 est connue pour son style de jeu agressif et audacieux, qui leur permet de dicter le rythme des parties et de maintenir leurs adversaires sous pression constante. En dehors du terrain, G2 Esports est célèbre pour son humour et son approche décontractée, attirant une base de fans passionnés. Malgré cette légèreté apparente, leur engagement envers l’excellence compétitive est indéniable, et ils continuent de figurer parmi les meilleures équipes dans presque toutes les disciplines qu’ils touchent."
      },
      {
        name: "T1",
        img:"",
        description: "T1 est une institution en Corée du Sud et un nom incontournable dans l’histoire de l’e-sport mondial, notamment grâce à ses incroyables succès dans League of Legends. Avec Faker, considéré comme le plus grand joueur de l’histoire de LoL, T1 a remporté trois championnats du monde et continue de figurer parmi les équipes les plus redoutées du circuit. Leur jeu repose sur une discipline tactique rigoureuse, une exécution mécanique parfaite et une préparation stratégique qui les distingue des autres équipes. En plus de leur domination dans LoL, T1 s’est également aventurée dans d’autres titres comme Valorant, où ils cherchent à étendre leur héritage légendaire. Leur influence dépasse les frontières du jeu, faisant d’eux des ambassadeurs de la culture e-sportive coréenne dans le monde entier."
      },
      {
        name: "Cloud9",
        img:"",
        description: "Cloud9 est une organisation nord-américaine qui représente l’innovation et l’adaptabilité dans l’e-sport. Active dans des jeux comme CS:GO, League of Legends, et Valorant, cette équipe est connue pour ses stratégies créatives et son style de jeu rapide qui met constamment ses adversaires sur la défensive. Fondée en 2013, Cloud9 a rapidement gravi les échelons pour devenir l’une des équipes les plus respectées sur la scène internationale. Ce qui les distingue, c’est leur capacité à exceller dans des situations de forte pression, où ils transforment souvent des désavantages apparents en victoires spectaculaires. Cloud9 est également adorée pour sa culture d’équipe positive et son approche inclusive, ce qui en fait un favori des fans."
      },
      {
        name: "Natus Vincere (NAVI)",
        img:"",
        description: "Natus Vincere, ou NAVI, est une organisation ukrainienne de renom qui domine depuis des années la scène compétitive dans des jeux comme CS:GO et Dota 2. NAVI a marqué l’histoire en devenant la première équipe à remporter un Grand Chelem en CS:GO, en décrochant tous les titres majeurs de la saison 2021. Leur style de jeu repose sur une combinaison de tactiques méticuleuses, de coordination d’équipe impeccable et de performances individuelles exceptionnelles. Les joueurs de NAVI, comme s1mple, sont souvent considérés parmi les meilleurs au monde dans leurs disciplines respectives. Au-delà de leurs succès compétitifs, NAVI incarne la résilience et la passion, représentant fièrement leur région sur la scène mondiale."
      },
      {
        name: "Evil Geniuses",
        img:"",
        description: "Evil Geniuses, fondée en 1999, est l’une des organisations les plus anciennes et les plus respectées de l’e-sport. Connue pour ses succès dans des titres comme Dota 2, CS:GO et Valorant, EG est une équipe qui allie expérience, innovation et détermination. Leur victoire emblématique à The International 2015 reste un moment légendaire dans l’histoire de Dota 2. Ce qui distingue Evil Geniuses, c’est leur capacité à analyser le jeu de leurs adversaires et à s’adapter rapidement, leur permettant de prendre l’avantage même dans des situations difficiles. En dehors des compétitions, EG est reconnue pour son engagement envers le développement des talents et son rôle de pionnier dans l’e-sport."
      },
      {
        name: "100 Thieves",
        img:"",
        description: "100 Thieves est une organisation jeune et dynamique qui a rapidement gagné en popularité grâce à son approche novatrice de l’e-sport. Fondée par l’ancien joueur professionnel Matthew 'Nadeshot' Haag, 100 Thieves a su se démarquer à la fois sur le terrain, dans des jeux comme Valorant et League of Legends, et en dehors grâce à son identité de marque unique. Ils combinent une stratégie de jeu efficace avec une communication de marque axée sur le lifestyle, attirant une audience qui dépasse le simple cadre des compétitions. En compétition, 100 Thieves est reconnue pour ses stratégies bien pensées, ses joueurs talentueux et son esprit d’équipe inébranlable, qui leur permettent de s’imposer comme un sérieux concurrent dans les tournois internationaux."
      }
    ]



  }),

  methods: {
    // Calcul de style pour connecter les cases
    getConnectionStyle(roundIndex, matchIndex) {
      const nextMatchIndex = Math.floor(matchIndex / 2);
      return {
        top: `${50 * (matchIndex % 2)}%`, // Centrer la connexion
        height: "40px",
        left: "100%", // Ligne horizontale sortant à droite
        transform: `translateY(${nextMatchIndex * 100}px)`,
      };
    },
  },
};
</script>


<style scoped>
.team-description-div img{
  float: left;
  padding-right: 5px;
}


.detail-team-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.detail-team {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 2px solid black;
  border-radius: 8px;
  width: 90%;
  margin: 10px 25px;
  padding: 5px;
}
.team-description {
  text-align: left;
}

.brackets-display {
  margin-top: 85px;
  text-align: center;
}

.brackets-container {
  border: 2px solid black;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  margin: 20px 50px 0 50px;
  background-color: lightgray;
}

.round {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px; /* Espacement vertical entre les matchs */
  position: relative;
}

.match-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.match {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 2px solid black;
  border-radius: 8px;
  padding: 10px;
  background-color: white;
}

.team {
  padding: 5px 0;
  text-align: center;
}

/* Connexion */
.connection {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -20px; /* Ajustement pour aligner avec les cases */
}

.vertical-line {
  width: 2px;
  height: 40px; /* Ajuster la hauteur pour relier les lignes */
  background-color: black;
}

.horizontal-line {
  width: 50px;
  height: 2px;
  background-color: black;
  position: relative;
  left: 25px; /* Ajuster pour connecter les rounds */
}

/* Ajouter des styles pour relier au round suivant */
.round + .round .match-container:first-child .vertical-line {
  height: 80px; /* Ajuster pour la connexion entre les rounds */
}
</style>



