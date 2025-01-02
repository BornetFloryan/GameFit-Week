<template>
  <div class="modify-stand-form">
    <div class="card">
      <button @click="goBack" class="btn-back btn-red">Retour</button>
      <h2>Modifier {{stand.name}}</h2>
      <form @submit.prevent="handleModifyStand">
        <div class="form-group">
          <label for="price">Prix</label>
          <input
              type="number"
              id="price"
              v-model="price"
              required
          />
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
      stand: "",
      price: 0,
    };
  },
  computed: {
    ...mapState('stands', ['stands']),
  },
  methods: {
    async handleModifyStand() {
      this.$emit('modifyStand', {
        stand: {
          _id: this.stand._id,
          name: this.stand.name,
          price: this.price,
          pavillon_id: this.stand.pavillon_id,
        },
      });
    },
    resetForm() {
      this.price = this.stand.price;
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.stand = this.stands.find(stand => stand._id === this.$route.params.item_id);
    this.price = this.stand.price;
  },
};
</script>

<style scoped>
.modify-stand-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f4f6;
}

.card {
  position: relative;
  background: white;
  padding: 2em;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.btn-back {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  padding: 0.2em 0.4em;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.75em;
  cursor: pointer;
  background-color: #f9f9f9;
  color: #333;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.btn-back:hover {
  background-color: #e6e6e6;
  border-color: #bbb;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-red {
  background-color: #dc3545;
  color: white;
}

.btn-red:hover {
  background-color: #c82333;
}

h2 {
  margin-bottom: 1.5em;
  color: #333;
  font-size: 1.5em;
}

.form-group {
  margin-bottom: 1.5em;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5em;
  font-size: 0.9em;
  color: #555;
}

input[type="number"] {
  width: 100%;
  padding: 0.75em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s ease;
}

input[type="number"]:focus {
  border-color: #007bff;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  padding: 0.75em 1.5em;
  border: none;
  border-radius: 4px;
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