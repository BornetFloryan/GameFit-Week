<template>
  <div class="page-with-editor">
    <NavView/>
<!--    <h1>Éditeur de texte</h1>-->
    <Editor
        :initialContent="editorContent"
        :uploadApiUrl="uploadApiUrl"
    />
  </div>
</template>

<script>
import Editor from "@/components/Editor";
import NavView from "@/components/NavBar.vue";

export default {
  name: "PageWithEditor",
  components: {
    NavView,
    Editor,
  },
  data() {
    return {
      editorContent: "<h2>Bienvenue dans l'éditeur de texte !</h2>",
      uploadApiUrl: "https://votre-api-upload.com/images", // Modifiez si nécessaire
    };
  },
};
</script>

<style scoped>
.page-with-editor {
  //max-width: 800px;
  margin: 0 auto;
  //padding: 20px;
}
</style>
