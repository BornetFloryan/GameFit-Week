<template>
  <div class="modify-stand-form">
    <div class="card">
      <button @click="goBack" class="btn-back btn-red">Retour</button>
      <h2>Modifier Réservation {{id}}</h2>
      <form @submit.prevent="handleModifyStandReservation">
        <div class="form-group">
          <label for="date">Date</label>
          <input type="date" v-model="formattedDate" id="date" required min="2025-07-07" max="2025-07-12">
        </div>
        <div class="form-group">
          <label for="start_time">Heure de début</label>
          <input type="time" v-model="start_time" id="start_time" required>
        </div>
        <div class="form-group">
          <label for="end_time">Heure de fin</label>
          <input type="time" v-model="end_time" id="end_time" required>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea v-model="description" id="description" required></textarea>
        </div>
        <div class="form-group">
          <label for="prestatire_id">ID Prestataire</label>
          <input type="text" v-model="prestataire_id" id="prestatire_id" required>
        </div>
        <div class="form-group">
          <label for="service_id">ID Service</label>
          <input type="text" v-model="service_id" id="service_id" required>
        </div>
        <div class="form-group">
          <label for="stand_id">ID Stand</label>
          <input type="text" v-model="stand_id" id="stand_id" required>
        </div>
        <div class="form-buttons">
          <button type="submit" class="btn btn-primary">Modifier</button>
          <button type="button" @click="resetForm" class="btn btn-secondary">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'AdminModifyStandForm',
  data() {
    return {
      standReservation: "",
      id: "",
      date: "",
      start_time: "",
      end_time: "",
      description: "",
      prestataire_id: "",
      service_id: "",
      stand_id: "",
    };
  },
  computed: {
    ...mapState('stands', ['standsReservations']),
    formattedDate() {
      return this.date ? new Date(this.date).toISOString().substr(0, 10) : "";
    }
  },
  methods: {
    async handleModifyStandReservation() {
      this.$emit('modifyStandReservation', {
        standReservation: {
          _id: this.standReservation._id,
          date: this.date,
          start_time: this.start_time,
          end_time: this.end_time,
          description: this.description,
          prestataire_id: this.prestataire_id,
          service_id: this.service_id,
          stand_id: this.stand_id,
        },
      });
    },
    resetForm() {
      this.date = this.standReservation.date;
      this.start_time = this.standReservation.start_time;
      this.end_time = this.standReservation.end_time;
      this.description = this.standReservation.description;
      this.prestataire_id = this.standReservation.prestataire_id;
      this.service_id = this.standReservation.service_id;
      this.stand_id = this.standReservation.stand_id;
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.standReservation = this.standsReservations.find(standReservation => standReservation._id === this.$route.params.item_id);
    if (this.standReservation) {
      this.id = this.standReservation._id;
      this.date = this.standReservation.date;
      this.start_time = this.standReservation.start_time;
      this.end_time = this.standReservation.end_time;
      this.description = this.standReservation.description;
      this.prestataire_id = this.standReservation.prestataire_id;
      this.service_id = this.standReservation.service_id;
      this.stand_id = this.standReservation.stand_id;
    }
  },
};
</script>

<style scoped>
.modify-stand-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 1.5em;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.btn-back {
  align-self: flex-start;
  margin-bottom: 1em;
  padding: 0.5em 1em;
  border: none;
  border-radius: 5px;
  font-size: 0.9em;
  cursor: pointer;
  background-color: #dc3545;
  color: white;
  transition: background-color 0.3s ease;
}

.btn-back:hover {
  background-color: #c82333;
}

h2 {
  margin-bottom: 1em;
  color: #333;
  font-size: 1.5em;
}

.form-group {
  width: 100%;
  margin-bottom: 1em;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5em;
  font-size: 1em;
  color: #555;
}

input[type="date"],
input[type="time"],
input[type="text"],
textarea {
  width: 100%;
  padding: 0.5em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease;
}

input[type="date"]:focus,
input[type="time"]:focus,
input[type="text"]:focus,
textarea:focus {
  border-color: #007bff;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.btn {
  padding: 0.5em 1em;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>