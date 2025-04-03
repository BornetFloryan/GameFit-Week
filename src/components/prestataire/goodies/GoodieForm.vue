<template>
  <div class="goodie-form">
    <button class="btn-back" @click="goBack">{{ $t('goodieForm.back') }}</button>
    <h2>{{ isEdit ? $t('goodieForm.editGoodie') : $t('goodieForm.addGoodie') }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">{{ $t('goodieForm.name') }}</label>
        <input type="text" v-model="localGoodie.name" id="name" required>
      </div>
      <div class="form-group">
        <label for="price">{{ $t('goodieForm.price') }}</label>
        <input type="number" v-model="localGoodie.price" id="price" step="0.01" required>
      </div>
      <div class="form-group">
        <label for="image">{{ $t('goodieForm.image') }}</label>
        <input type="file" name="image" @change="handleImageUpload" id="image">
        <img v-if="localGoodie.imagePreview" :src="localGoodie.imagePreview" :alt="$t('goodieForm.image')" class="goodie-image">
      </div>
      <div v-if="goodieSizes && goodieSizes.length">
        <div v-for="(variation, index) in localGoodie.variations" :key="index" class="variation">
          <h3>{{ $t('goodieForm.variation') }} {{ index + 1 }}</h3>
          <div class="form-group">
            <label for="size">{{ $t('goodieForm.size') }}</label>
            <select v-model="variation.size_id" id="size" required>
              <option v-for="size in goodieSizes" :key="size._id" :value="size._id"
                      :disabled="isSizeDisabled(size._id, index)">
                {{ size.size }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="stock">{{ $t('goodieForm.stock') }}</label>
            <input type="number" v-model="variation.stock" id="stock" required>
          </div>
          <button type="button" class="btn-remove" @click="removeVariation(index)">{{ $t('goodieForm.removeVariation') }}</button>
        </div>
      </div>
      <button type="button" class="btn-add" @click="addVariation" :disabled="isSingleSizeSelected">{{ $t('goodieForm.addVariation') }}</button>
      <button type="submit" class="btn-submit" :disabled="localGoodie.variations.length === 0">{{ isEdit ? $t('goodieForm.saveChanges') : $t('goodieForm.addNewGoodie') }}</button>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import goodiesService from "@/services/goodies.service";

export default {
  name: 'GoodieForm',
  props: {
    goodie: {
      type: Object,
      default: () => ({
        name: '',
        price: 0,
        image: '',
        variations: [],
        provider_service_categories_id: ''
      })
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localGoodie: {
        ...JSON.parse(JSON.stringify(this.goodie)),
        imagePreview: this.goodie.image ? require(`@/assets/img/goodies/${this.goodie.image}`) : null
      }
    };
  },
  computed: {
    ...mapState('goodies', ['goodieSizes']),
    ...mapState('account', ['currentUser']),
    ...mapGetters('prestation', ['getProviderServiceCategoriesByCustomerIdAndServiceID']),
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

        const reader = new FileReader();
        reader.onload = (e) => {
          this.localGoodie.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
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
      formData.append('price', this.localGoodie.price);
      formData.append('provider_service_categories_id', this.localGoodie.provider_service_categories_id);
      if (this.localGoodie.imageFile) {
        formData.append('image', this.localGoodie.imageFile);
      }
      formData.append('variations', JSON.stringify(this.localGoodie.variations));

      try {
        if (this.localGoodie.imageFile) {
          const result = await goodiesService.uploadImage(formData);
          if (result && result.imageUrl) {
            if(this.currentUser){
              this.providerServiceCategory = this.getProviderServiceCategoriesByCustomerIdAndServiceID(this.currentUser._id, '1')._id;
              this.localGoodie.provider_service_categories_id = this.providerServiceCategory
              this.$emit('submit', {goodie: this.localGoodie, imageUrl: result.imageUrl});
            }
          } else {
            console.error('La réponse de l\'API ne contient pas imageUrl');
          }
        } else {
          this.$emit('submit', {goodie: this.localGoodie});
        }
      } catch (error) {
        console.error('Erreur lors de l\'upload de l\'image:', error);
      }
    },
    goBack() {
      this.$router.push({ name: 'provider-goodies' });
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

.btn-back {
  background-color: #6c757d;
  color: white;
  padding: 10px 20px;
  margin-bottom: 1em;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-back:hover {
  background-color: #5a6268;
}
</style>