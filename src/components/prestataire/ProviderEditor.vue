<template>
  <div class="edit-content">
    <form @submit.prevent="updateContent">
      <div class="form-group">
        <label for="mainTitle">Titre principal:</label>
        <VueEditor v-if="content" v-model="content.main.title" id="mainTitle" type="text" />
        <label for="mainDescription">Description principale:</label>
        <VueEditor v-if="content" v-model="content.main.description" id="mainDescription"/>
      </div>
      <div class="form-group">
        <label for="explainText">Titre d'explication:</label>
        <VueEditor v-if="content" v-model="content.explain.title" id="explainText"/>
        <label for="explainText">Texte d'explication:</label>
        <VueEditor v-if="content" v-model="content.explain.description" id="explainText"/>
      </div>
      <div class="form-group" v-for="(card, index) in content.cards" :key="index">
        <label :for="'cardTitle' + index">Titre carte:</label>
        <VueEditor v-if="content" v-model="card.title" :id="'cardTitle' + index" type="text" />
        <label :for="'cardDescription' + index">Description carte:</label>
        <VueEditor v-if="content" v-model="card.description" :id="'cardDescription' + index"/>
        <label :for="'cardImage' + index">Image carte:</label>
        <input type="file" :id="'cardImage' + index" @change="onFileChange($event, index)" />
        <img :src="imagePreviews[index] || getImageUrl(card.image_url)" v-if="imagePreviews[index] || card.image_url" :alt="card.title" class="preview-image" />
      </div>
      <button type="submit" class="btn">Appliquer les changements</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { VueEditor } from 'vue2-editor';
import homeService from "@/services/home.service";

export default {
  name: 'EditContent',
  components: {
    VueEditor
  },
  data(){
    return {
      imagePreviews: [],
      imageFiles: []
    };
  },
  computed: {
    ...mapState('home', ['content_home']),
    ...mapState('account', ['currentUser']),
    content() {
      const explain = this.content_home.find(item => item.section === 'explain') || { title: '', description: '' };
      const main = this.content_home.find(item => item.section === 'main') || { title: '', description: '' };
      const cards = this.content_home.filter(item => item.section === 'card').map(card => ({
        ...card,
        title: card.title || '',
        description: card.description || '',
        image_url: card.image_url || ''
      }));
      return { explain, main, cards };
    }
  },
  methods: {
    ...mapActions('home', ['modifyContentHome', "getContentHome"]),
    async updateContent() {
      const session = this.currentUser.session;
      if (session) {
        const formData = new FormData();
        formData.append('data', JSON.stringify(this.content));
        formData.append('session', session);

        this.imageFiles.forEach((file, index) => {
          if (file) {
            formData.append(`image_${index}`, file);
          }
        });

        try {
          await homeService.modifyContentHome(formData);
        } catch (error) {
          console.error('Erreur lors de la modification du contenu:', error);
        }
      } else {
        console.error('Session est indéfinie');
      }
    },
    onFileChange(event, index) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.$set(this.imagePreviews, index, e.target.result);
          this.$set(this.imageFiles, index, file);
          this.content.cards[index].image_url = file.name;
        };
        reader.readAsDataURL(file);
      }
    },
    getImageUrl(imageUrl) {
      try {
        return require(`@/assets/img/home/${imageUrl}`);
      } catch (e) {
        console.error(`Cannot find module '@/assets/img/home/${imageUrl}'`);
        return '';
      }
    }
  },
  async mounted() {
    await this.getContentHome();
  },
};
</script>

<style scoped>
.edit-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px auto;
  width: 70vw;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  font-weight: bold;
  color: #333;
}

.preview-image {
  width: 150px;
  height: auto;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.btn {
  margin: 20px auto 0;
  padding: 12px 50px;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  border: none;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}
</style>