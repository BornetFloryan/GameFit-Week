<template>
  <div class="add-goodie-form">
    <h2>Ajouter un Goodie</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Nom du Goodie</label>
        <input type="text" v-model="newGoodie.name" id="name" required />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea v-model="newGoodie.description" id="description" required></textarea>
      </div>
      <div class="form-group">
        <label for="price">Prix</label>
        <input type="number" v-model="newGoodie.price" id="price" min="0" step="0.01" required />
      </div>
      <div class="form-group">
        <label for="image">Image du Goodie (URL)</label>
        <input type="text" v-model="newGoodie.imageUrl" id="image" required />
      </div>
      <button type="submit" class="button">Ajouter le Goodie</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddGoodieSale',
  data() {
    return {
      newGoodie: {
        name: '',
        description: '',
        price: null,
        imageUrl: ''
      }
    };
  },
  methods: {
    submitForm() {
      // Appeler une action Vuex ou une méthode d'API pour enregistrer ce goodie
      this.$emit('goodie-added', this.newGoodie); // On émet l'événement 'goodie-added' avec le goodie ajouté
      this.resetForm(); // Réinitialiser le formulaire
    },
    resetForm() {
      this.newGoodie = {
        name: '',
        description: '',
        price: null,
        imageUrl: ''
      };
    }
  }
};
</script>

<style scoped>
.add-goodie-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>
