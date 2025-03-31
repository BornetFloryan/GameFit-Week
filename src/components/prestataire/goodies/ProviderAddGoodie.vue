<template>
  <div class="add-goodie-container">
    <GoodieForm @submit="handleSubmit" :isEdit="false" />
  </div>
</template>

<script>
import GoodieForm from '@/components/prestataire/goodies/GoodieForm.vue';
import { mapActions } from 'vuex';

export default {
  name: 'ProviderAddGoodie',
  components: { GoodieForm },
  methods: {
    ...mapActions('goodies', ['addGoodie', 'addGoodieVariation']),
    async handleSubmit({ goodie }) {
      try {
        const newGoodie = await this.addGoodie({
          name: goodie.name,
          image: goodie.image,
          price: goodie.price,
          provider_service_categories_id: goodie.provider_service_categories_id
        });

        for (const variation of goodie.variations) {
          await this.addGoodieVariation({
            goodie_id: newGoodie._id,
            size_id: variation.size_id,
            stock: variation.stock
          });
        }

        alert('Goodie ajouté avec succès');
        this.$router.push({ name: 'provider-goodies' });
      } catch (e) {
        alert('Erreur lors de l\'ajout du goodie : ' + e);
      }
    }
  }
};
</script>
<style scoped>
.add-goodie-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.add-goodie-container .goodie-form {
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  padding: 2em;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>