<template>
  <div>
    <router-link to="/admin-dashboard/admin-stand-management">
      <button class="btn-action">Retour à la gestion des stands</button>
    </router-link>
    <router-link v-if="this.$route.query.stand_id" :to="{ name: 'admin-stand-reservations'}">
      <button class="btn-action">Voir toutes les réservations</button>
    </router-link>
    <AdminStandTable
        title="Tableau des réservations"
        :headers="headers"
        :fields="fields"
        :modifyName="modifyName"
        :enableRes="enableRes"
        :enableDelete="enableDelete"
        :dataSource="dataSource"
    />
  </div>
</template>

<script>
import AdminStandTable from "@/components/admin/AdminStandTable.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: 'AdminStandReservation',
  components: { AdminStandTable },
  data() {
    return {
      title: "Gestion des réservation des stands",
      headers: ['Numéro', 'Date', 'Heure de début', 'Heure de fin', 'Description', 'Prestataire', 'Service', 'Stand'],
      fields: ['_id', 'date', 'start_time', 'end_time', 'description', 'prestataire_id', 'service_id', 'stand_id'],
      modifyName: 'admin-stand-reservations-edit',
      enableRes: false,
      enableDelete: true,
      dataSource: [],
    };
  },
  computed: {
    ...mapState('stands', ['standsReservations']),
  },
  methods: {
    ...mapActions('stands', ['getStandsReservations']),
  },
  watch: {
    '$route.query.stand_id': {
      handler() {
        if (Array.isArray(this.standsReservations)) {
          if (this.$route.query.stand_id) {
            this.dataSource = this.standsReservations.filter(stand => stand._id === this.$route.query.stand_id);
          } else {
            this.dataSource = this.standsReservations;
          }
        } else {
          console.error('standsReservations is not an array');
        }
      },
      immediate: true
    }
  },
  async mounted() {
    await this.getStandsReservations();
    if (Array.isArray(this.standsReservations)) {
      if (this.$route.query.stand_id) {
        this.dataSource = this.standsReservations.filter(stand => stand._id === this.$route.query.stand_id);
      } else {
        this.dataSource = this.standsReservations;
      }
    } else {
      console.error('standsReservations is not an array');
    }
  },
};
</script>

<style scoped>
.btn-action {
  padding: 0.5em 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.3s ease;
  margin-bottom: 1em;
  margin-right: 1em;
}

.btn-action:hover {
  background-color: #0056b3;
}
</style>