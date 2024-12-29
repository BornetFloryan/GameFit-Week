<template>
  <section class="hotels">
    <NavView />
    <header class="hotels-header">
      <h1>Hôtels à Proximité</h1>
      <p>Trouvez des hôtels proches du tournoi pour un séjour confortable.</p>
    </header>

    <div class="hotels-list">
      <div v-for="hotel in hotels" :key="hotel.id" class="hotel-card">
        <img :src="hotel.image" :alt="hotel.name" class="hotel-image" />
        <div class="hotel-info">
          <h2 class="hotel-name">{{ hotel.name }}</h2>
          <p class="hotel-address">{{ hotel.address }}</p>
          <p class="hotel-price">À partir de {{ hotel.price }}€ / nuit</p>
          <a :href="hotel.link" target="_blank" class="hotel-link">Voir plus</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import NavView from "@/components/NavBar.vue";

export default {
  name: "HotelsView",
  components: { NavView },
  data() {
    return {
      hotels: [
        {
          id: 1,
          name: 'Réservation de Dédicaces',
          address: '123 Rue des Dédicaces, Ville',
          price: 150,
          image: require('@/assets/img/Hotel1.jpg'),
          link: 'https://dedication.com',
        },
        {
          id: 2,
          name: "Hotel Confort",
          address: "456 Avenue du Confort, Ville",
          price: 100,
          image: require("@/assets/img/Hotel2.jpg"),
          link: "https://hotel-confort.com",
        },
        {
          id: 3,
          name: "Hotel Budget",
          address: "789 Boulevard du Budget, Ville",
          price: 75,
          image: require("@/assets/img/Hotel3.jpg"),
          link: "https://hotel-budget.com",
        },
        {
          id: 4,
          name: "Luxury Palace",
          address: "101 Avenue des Palaces, Ville",
          price: 300,
          image: require("@/assets/img/Hotel4.jpg"),
          link: "https://luxury-palace.com",
        },
        {
          id: 5,
          name: "Eco Lodge",
          address: "202 Boulevard Vert, Ville",
          price: 120,
          image: require("@/assets/img/Hotel5.jpg"),
          link: "https://eco-lodge.com",
        },
        {
          id: 6,
          name: "Boutique Hotel",
          address: "303 Rue Élégance, Ville",
          price: 200,
          image: require("@/assets/img/Hotel6.jpg"),
          link: "https://boutique-hotel.com",
        },
      ],
    };
  },
};
</script>

<style scoped>
.hotels {
  background-color: #f9f9f9;
  min-height: 100vh;
}

.hotels-header {
  text-align: center;
  margin-bottom: 32px;
}

.hotels-header h1 {
  font-size: 36px;
  color: #000;
}

.hotels-header p {
  font-size: 18px;
  color: #555;
}

.hotels-list {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
}

.hotel-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
  width: 350px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hotel-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.hotel-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.hotel-info {
  padding: 20px;
}

.hotel-name {
  font-size: 22px;
  color: #333;
  margin-bottom: 10px;
}

.hotel-address {
  font-size: 16px;
  color: #777;
  margin-bottom: 10px;
}

.hotel-price {
  font-size: 18px;
  color: #00afea;
  margin-bottom: 20px;
}

.hotel-link {
  text-decoration: none;
  color: #fff;
  background-color: #00afea;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 16px;
  text-align: center;
  display: inline-block;
}

.hotel-link:hover {
  background-color: #007bb5;
}
</style>