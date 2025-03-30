<template>
  <div class="goodie-form">
    <h2>Modifier le Goodie</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Nom du Goodie:</label>
        <input type="text" v-model="localGoodie.name" id="name" required>
      </div>
      <div class="form-group">
        <label for="image">Image du Goodie:</label>
        <input type="file" @change="handleImageUpload" id="image">
        <img v-if="localGoodie.image" :src="require(`@/assets/img/goodies/${localGoodie.image}`)" alt="Image du Goodie" class="goodie-image">
      </div>
      <div v-if="goodieSizes && goodieSizes.length">
        <div v-for="(variation, index) in localGoodie.variations" :key="index" class="variation">
          <h3>Variation {{ index + 1 }}</h3>
          <div class="form-group">
            <label for="size">Taille:</label>
            <select v-model="variation.size_id" id="size" required>
              <option v-for="size in goodieSizes" :key="size._id" :value="size._id"
                      :disabled="isSizeDisabled(size._id, index)">
                {{ size.size }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="stock">Stock:</label>
            <input type="number" v-model="variation.stock" id="stock" required>
          </div>
          <button type="button" class="btn-remove" @click="removeVariation(index)">Supprimer cette variation</button>
        </div>
      </div>
      <button type="button" class="btn-add" @click="addVariation" :disabled="isSingleSizeSelected">Ajouter une variation</button>
      <button type="submit" class="btn-submit">Enregistrer les modifications</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import goodiesService from "@/services/goodies.service";

export default {
  name: 'GoodieForm',
  props: {
    goodie: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      localGoodie: JSON.parse(JSON.stringify(this.goodie))
    };
  },
  computed: {
    ...mapState('goodies', ['goodieSizes']),
    isSingleSizeSelected() {
      return this.localGoodie.variations.some(variation => {
        const size = this.goodieSizes.find(size => size._id === variation.size_id);
        return size && size.size === 'Taille unique';
      });
    },
    isOtherSizeSelected() {
      return this.localGoodie.variations.some(variation => {
        const size = this.goodieSizes.find(size => size._id === variation.size_id);
        return size && size.size !== 'Taille unique' && size.size !== '';
      });
    }
  },
  methods: {
    ...mapActions('goodies', ['getGoodieSizes']),
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.localGoodie.image = file.name;
        this.localGoodie.imageFile = file;
      }
      console.log(this.localGoodie.image);
    },
    addVariation() {
      if (!this.isSingleSizeSelected) {
        this.localGoodie.variations.push({size_id: '', stock: 0});
      }
    },
    removeVariation(index) {
      this.localGoodie.variations.splice(index, 1);
    },
    isSizeDisabled(sizeId, currentIndex) {
      const size = this.goodieSizes.find(size => size._id === sizeId);
      if (size && size.size === 'Taille unique') {
        return this.isOtherSizeSelected;
      }
      return this.localGoodie.variations.some((variation, index) => index !== currentIndex && variation.size_id === sizeId);
    },
    async handleSubmit() {
      const formData = new FormData();
      formData.append('name', this.localGoodie.name);
      if (this.localGoodie.imageFile) {
        formData.append('image', this.localGoodie.imageFile);
      }
      formData.append('variations', JSON.stringify(this.localGoodie.variations));

      try {
        if (this.localGoodie.imageFile) {
          const result = await goodiesService.uploadImage(formData);
          this.$emit('submit', {goodie: this.localGoodie, imageUrl: result.imageUrl});
        } else {
          this.$emit('submit', {goodie: this.localGoodie});
        }
      } catch (error) {
        console.error('Erreur lors de l\'upload de l\'image:', error);
      }
    }
  },
  mounted() {
    this.getGoodieSizes();
  },
};
</script>

<style scoped>
.goodie-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 2em;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.goodie-form h2 {
  margin-bottom: 1em;
  color: #333;
  text-align: center;
}

.form-group {
  margin-bottom: 1em;
}

.form-group label {
  display: block;
  margin-bottom: 0.5em;
  color: #555;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75em;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #007bff;
  outline: none;
}

.goodie-image {
  max-width: 100%;
  height: auto;
  margin-top: 1em;
}

.variation {
  margin-bottom: 20px;
  padding: 1em;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.variation h3 {
  margin-top: 0;
  color: #333;
}

button {
  padding: 0.75em 1.5em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

.btn-add {
  background-color: #28a745;
  color: #fff;
  margin-bottom: 1em;
}

.btn-add:hover {
  background-color: #218838;
}

.btn-remove {
  background-color: #dc3545;
  color: #fff;
  margin-top: 1em;
}

.btn-remove:hover {
  background-color: #c82333;
}

.btn-submit {
  background-color: #007bff;
  color: #fff;
  display: block;
  width: 100%;
}

.btn-submit:hover {
  background-color: #0056b3;
}
</style>