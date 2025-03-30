<template>
  <div class="modify-goodie-container">
    <GoodieForm v-if="goodie" :goodie="goodie" @submit="handleSubmit" />
    <p v-else>Chargement...</p>
  </div>
</template>

<script>
import GoodieForm from '@/components/prestataire/goodies/GoodieForm.vue';
import { mapActions, mapGetters } from 'vuex';
import goodiesService from "@/services/goodies.service";

export default {
  name: 'ProviderModifyGoodie',
  components: { GoodieForm },
  data() {
    return {
      goodie: null
    };
  },
  computed: {
    ...mapGetters('goodies', ['getGoodieById'])
  },
  methods: {
    ...mapActions('goodies', ['modifyGoodie', 'addGoodieVariation', 'deleteGoodieVariation', 'modifyGoodieVariation']),
    async fetchGoodie() {
      const goodieId = this.$route.params.item_id;
      const goodie = this.getGoodieById(goodieId);
      const variations = await goodiesService.getGoodieVariations(goodieId);
      this.goodie = {...goodie, variations: variations || []};
    },
    async handleSubmit({ goodie }) {
      console.log(goodie);
      try {
        const existingVariations = await goodiesService.getGoodieVariations(goodie._id);
        const updatedVariations = goodie.variations;

        for (const variation of updatedVariations) {
          const existingVariation = existingVariations.find(v => v.size_id === variation.size_id);
          if (existingVariation) {

            await this.modifyGoodieVariation({
              _id: existingVariation._id,
              goodie_id: goodie._id,
              size_id: variation.size_id,
              stock: variation.stock,
            });
          } else {
            console.log(variation)
            console.log(goodie._id)
            console.log(variation.size_id)
            console.log(variation.stock)
            await this.addGoodieVariation({goodie_id: goodie._id, size_id: variation.size_id, stock: variation.stock});
          }
        }

        for (const variation of existingVariations) {
          if (!updatedVariations.some(v => v.size_id === variation.size_id)) {
            await this.deleteGoodieVariation(variation._id);
          }
        }

        await this.modifyGoodie({
          _id: goodie._id,
          name: goodie.name,
          image: goodie.image,
          price: goodie.price,
        });

        await this.fetchGoodie();
        alert('Goodie modifié avec succès');
        this.$router.push({ name: 'provider-goodies' });
      } catch (e) {
        alert('Erreur lors de la modification du goodie : ' + e);
      }
    }
  },
  async mounted() {
    await this.fetchGoodie();
  }
};
</script>

<style scoped>
.modify-goodie-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.modify-goodie-container p {
  font-size: 1.2em;
  color: #666;
}

.modify-goodie-container .goodie-form {
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  padding: 2em;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.modify-goodie-container .goodie-form h2 {
  margin-bottom: 1em;
  color: #333;
}

.modify-goodie-container .goodie-form .form-group {
  margin-bottom: 1em;
}

.modify-goodie-container .goodie-form .form-group label {
  display: block;
  margin-bottom: 0.5em;
  color: #555;
}

.modify-goodie-container .goodie-form .form-group input,
.modify-goodie-container .goodie-form .form-group select,
.modify-goodie-container .goodie-form .form-group textarea {
  width: 100%;
  padding: 0.75em;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

.modify-goodie-container .goodie-form .form-group input:focus,
.modify-goodie-container .goodie-form .form-group select:focus,
.modify-goodie-container .goodie-form .form-group textarea:focus {
  border-color: #007bff;
  outline: none;
}

.modify-goodie-container .goodie-form .form-actions {
  display: flex;
  justify-content: flex-end;
}

.modify-goodie-container .goodie-form .form-actions button {
  padding: 0.75em 1.5em;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

.modify-goodie-container .goodie-form .form-actions button:hover {
  background-color: #0056b3;
}
</style>