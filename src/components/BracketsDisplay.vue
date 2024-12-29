<template>
  <div class="brackets-display">
    <h1>Bracket du Tournoi</h1>
    <div class="brackets-container">
      <!-- Round 1 -->
      <div class="round">
        <div class="match-container">
          <div class="match">
            <div>
              <div class="team">
                <p>Team Liquid</p>
                <b>0</b>
              </div>
              <div class="team">
                <p>Fnatic</p>
                <b>2</b>
              </div>
            </div>
          </div>


        </div>
        <div class="match-container">
          <div class="match">
            <div>
              <div class="team">
                <p>G2 Esports</p>
                <b>2</b>
              </div>
              <div class="team">
                <p>T1</p>
                <b>1</b>
              </div>
            </div>
          </div>


        </div>
        <div class="match-container">
          <div class="match">
            <div>
              <div class="team">
                <p>Cloud9</p>
                <b>1</b>
              </div>
              <div class="team">
                <p>Natus Vincere</p>
                <b>2</b>
              </div>
            </div>
          </div>


        </div>
        <div class="match-container">
          <div class="match">
            <div>
              <div class="team">
                <p>Evil Geniuses</p>
                <b>2</b>
              </div>
              <div class="team">
                <p>100 Thieves</p>
                <b>0</b>
              </div>
            </div>
          </div>


        </div>
      </div>

      <!-- Round 2 -->
      <div class="round">
        <div class="match-container">
          <div class="match">
            <div>
              <div class="team">
                <p>Fnatic</p>
                <b>2</b>
              </div>
              <div class="team">
                <p>G2 Esports</p>
                <b>0</b>
              </div>
            </div>
          </div>


        </div>
        <div class="match-container">
          <div class="match">
            <div>
              <div class="team">
                <p>Natus Vincere</p>
                <b>1</b>
              </div>
              <div class="team">
                <p>Evil Geniuses</p>
                <b>2</b>
              </div>
            </div>
          </div>


        </div>
      </div>

      <!-- Round 3 -->
      <div class="round">
        <div class="match-container">
          <div class="match">
            <div>
              <div class="team">
                <p>Fnatic</p>
                <b>3</b>
              </div>
              <div class="team">
                <p>Evil Geniuses</p>
                <b>2</b>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
    <h2>Les Équipes</h2>
    <div class="detail-team-container">

      <div v-for="(team, index) in teams" :key="index" class="round">


        <div class="detail-team" @click="showText(team.id)">
          <h3>{{ team.name }}</h3>
          <div class="team-description-div">
            <img :src="team.img" alt="img" style="width: 100px">
            <!--          <p class="team-description">{{ round.description }}</p>-->
          </div>
        </div>
      </div>

    </div>

    <div class="detail-team-description" :style="{'display': display}">
      <div class="selected-team-details">
        <img :src="img" alt="img" style="width: 100px">
        <h2>{{ name }}</h2>
        <b>{{ winrate }} %</b>
      </div>
      <p>{{ description }}</p>
    </div>
  </div>

</template>


<script>
export default {
  name: "BracketsDisplay",
  data: () => ({
    teams: [
      {
        id: "1",
        name: "Team Liquid",
        img: require("../assets/img/TL_Logo.jpg"),
        description: "Team Liquid est l’une des organisations les plus emblématiques de l’e-sport mondial, reconnue pour son incroyable polyvalence et ses résultats constants dans de multiples disciplines telles que Dota 2, League of Legends, CS:GO et bien d’autres. Fondée en 2000, cette équipe a su évoluer avec les tendances de l’industrie, recrutant des talents de classe mondiale et développant des stratégies innovantes. Leur capacité à s’adapter à différents styles de jeu et à maintenir un haut niveau de performance les a souvent placés parmi les favoris dans les compétitions majeures. Au-delà de leurs performances en tournoi, Team Liquid est également reconnue pour son engagement envers la communauté e-sportive et son influence dans la culture gaming.",
        winrate: 0
      },
      {
        id: "2",
        name: "Fnatic",
        img: require("../assets/img/FNATIC_Logo.jpg"),
        description: "Fnatic est une légende vivante de l’e-sport, avec un palmarès impressionnant couvrant plus d’une décennie. Cette équipe basée au Royaume-Uni est particulièrement célèbre pour son succès dans League of Legends et CS:GO, où elle a remporté de nombreux titres prestigieux. Fnatic est connue pour son approche innovante du jeu, testant constamment de nouvelles stratégies et surprenant ses adversaires avec des mouvements imprévisibles. Leur équipe est composée de joueurs talentueux qui excellent individuellement tout en montrant une synergie d’équipe remarquable. En plus de leur succès compétitif, Fnatic est un pionnier dans la promotion de l’e-sport en tant que phénomène global, grâce à des partenariats innovants et une forte présence sur les réseaux sociaux.",
        winrate: 100
      },
      {
        id: "3",
        name: "G2 Esports",
        img: require("../assets/img/G2_Logo.jpg"),
        description: "G2 Esports, souvent surnommée 'les Samouraïs', est une organisation qui combine talent brut, flair et charisme. Basée en Europe, cette équipe s’est imposée comme l’une des plus dominantes dans des jeux comme League of Legends, CS:GO et Valorant. G2 est connue pour son style de jeu agressif et audacieux, qui leur permet de dicter le rythme des parties et de maintenir leurs adversaires sous pression constante. En dehors du terrain, G2 Esports est célèbre pour son humour et son approche décontractée, attirant une base de fans passionnés. Malgré cette légèreté apparente, leur engagement envers l’excellence compétitive est indéniable, et ils continuent de figurer parmi les meilleures équipes dans presque toutes les disciplines qu’ils touchent.",
        winrate: 50
      },
      {
        id: "4",
        name: "T1",
        img: require("../assets/img/T1_Logo.jpg"),
        description: "T1 est une institution en Corée du Sud et un nom incontournable dans l’histoire de l’e-sport mondial, notamment grâce à ses incroyables succès dans League of Legends. Avec Faker, considéré comme le plus grand joueur de l’histoire de LoL, T1 a remporté trois championnats du monde et continue de figurer parmi les équipes les plus redoutées du circuit. Leur jeu repose sur une discipline tactique rigoureuse, une exécution mécanique parfaite et une préparation stratégique qui les distingue des autres équipes. En plus de leur domination dans LoL, T1 s’est également aventurée dans d’autres titres comme Valorant, où ils cherchent à étendre leur héritage légendaire. Leur influence dépasse les frontières du jeu, faisant d’eux des ambassadeurs de la culture e-sportive coréenne dans le monde entier.",
        winrate: 0
      },
      {
        id: "5",
        name: "Cloud9",
        img: require("../assets/img/Cloud9_Logo.jpg"),
        description: "Cloud9 est une organisation nord-américaine qui représente l’innovation et l’adaptabilité dans l’e-sport. Active dans des jeux comme CS:GO, League of Legends, et Valorant, cette équipe est connue pour ses stratégies créatives et son style de jeu rapide qui met constamment ses adversaires sur la défensive. Fondée en 2013, Cloud9 a rapidement gravi les échelons pour devenir l’une des équipes les plus respectées sur la scène internationale. Ce qui les distingue, c’est leur capacité à exceller dans des situations de forte pression, où ils transforment souvent des désavantages apparents en victoires spectaculaires. Cloud9 est également adorée pour sa culture d’équipe positive et son approche inclusive, ce qui en fait un favori des fans.",
        winrate: 0
      },
      {
        id: "6",
        name: "Natus Vincere (NAVI)",
        img: require("../assets/img/NAVI_Logo.jpg"),
        description: "Natus Vincere, ou NAVI, est une organisation ukrainienne de renom qui domine depuis des années la scène compétitive dans des jeux comme CS:GO et Dota 2. NAVI a marqué l’histoire en devenant la première équipe à remporter un Grand Chelem en CS:GO, en décrochant tous les titres majeurs de la saison 2021. Leur style de jeu repose sur une combinaison de tactiques méticuleuses, de coordination d’équipe impeccable et de performances individuelles exceptionnelles. Les joueurs de NAVI, comme s1mple, sont souvent considérés parmi les meilleurs au monde dans leurs disciplines respectives. Au-delà de leurs succès compétitifs, NAVI incarne la résilience et la passion, représentant fièrement leur région sur la scène mondiale.",
        winrate: 50
      },
      {
        id: "7",
        name: "Evil Geniuses",
        img: require("../assets/img/EG_Logo.jpg"),
        description: "Evil Geniuses, fondée en 1999, est l’une des organisations les plus anciennes et les plus respectées de l’e-sport. Connue pour ses succès dans des titres comme Dota 2, CS:GO et Valorant, EG est une équipe qui allie expérience, innovation et détermination. Leur victoire emblématique à The International 2015 reste un moment légendaire dans l’histoire de Dota 2. Ce qui distingue Evil Geniuses, c’est leur capacité à analyser le jeu de leurs adversaires et à s’adapter rapidement, leur permettant de prendre l’avantage même dans des situations difficiles. En dehors des compétitions, EG est reconnue pour son engagement envers le développement des talents et son rôle de pionnier dans l’e-sport.",
        winrate: 67
      },
      {
        id: "8",
        name: "100 Thieves",
        img: require("../assets/img/100T_Logo.jpg"),
        description: "100 Thieves est une organisation jeune et dynamique qui a rapidement gagné en popularité grâce à son approche novatrice de l’e-sport. Fondée par l’ancien joueur professionnel Matthew 'Nadeshot' Haag, 100 Thieves a su se démarquer à la fois sur le terrain, dans des jeux comme Valorant et League of Legends, et en dehors grâce à son identité de marque unique. Ils combinent une stratégie de jeu efficace avec une communication de marque axée sur le lifestyle, attirant une audience qui dépasse le simple cadre des compétitions. En compétition, 100 Thieves est reconnue pour ses stratégies bien pensées, ses joueurs talentueux et son esprit d’équipe inébranlable, qui leur permettent de s’imposer comme un sérieux concurrent dans les tournois internationaux.",
        winrate: 0
      }
    ]

    ,
    description: "",
    name: "",
    img: "",
    display: "none",
    winrate: ""
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


    showText(id) {
      const team = this.teams.find(team => team.id === id);


      if (team) {
        this.description = team.description;
        this.name = team.name;
        this.img = team.img;
        this.display = "";
        this.winrate=team.winrate;
      } else {
        this.description = "Aucune équipe trouvée pour cet ID.";
        this.img = "";
        this.name = "?";
      }

    }
  },
};
</script>


<style scoped>
.team-description-div img {
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
  flex-direction: row-reverse;
  justify-content: left;
  align-items: center;
  border: 2px solid black;
  border-radius: 8px;
  width: 90%;
  margin: 10px 25px;
  gap: 25px;
  padding: 5px;
}

.selected-team-details {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 25px;
}

.detail-team-description p {
  text-align: justify;
}

.detail-team:hover {
  transform: scale(1.01);
  transition-duration: 0.2s;
}

.detail-team:active {
  background-color: gray;
}

.detail-team-description {
  border: 2px solid black;
  border-radius: 8px;
  padding: 5px;
  width: 40%;
  margin: 10px auto;
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
  gap: 40px;
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
  padding: 5px 10px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  gap:10px;
}


.connection {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -20px;
}

.vertical-line {
  width: 2px;
  height: 40px;
  background-color: black;
}

.horizontal-line {
  width: 50px;
  height: 2px;
  background-color: black;
  position: relative;
  left: 25px;
}

.round + .round .match-container:first-child .vertical-line {
  height: 80px;
}
</style>



