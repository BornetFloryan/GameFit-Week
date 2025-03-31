<template>
  <div v-if="show" class="ip-dialog">
    <div class="ip-dialog-content">
      <h3>Veuillez entrer l'adresse IP du serveur :</h3>
      <input v-model="serverIP" placeholder="Adresse IP du serveur" />
      <button @click="submitIP">Valider</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      serverIP: ''
    };
  },
  methods: {
    submitIP() {
      this.$emit('ip-submitted', this.serverIP);
      this.show = false;
    },
    showPrompt() {
      this.show = true;
    }
  }
};
</script>

<style scoped>
.ip-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.ip-dialog-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.ip-dialog-content input {
  margin-bottom: 10px;
  padding: 8px;
  width: 80%;
}

.ip-dialog-content button {
  padding: 8px 12px;
  font-size: 14px;
  color: white;
  background-color: #1abc9c;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.ip-dialog-content button:hover {
  background-color: #16a085;
}
</style>