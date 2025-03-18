<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <h3>Sélectionnez la taille</h3>
      <div v-for="size in sizes" :key="size._id" class="size-option">
        <button @click="selectSize(size)">{{ size.size }}</button>
      </div>
      <button class="close-modal" @click="closeModal">Fermer</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SizeSelectorModal",
  props: {
    show: Boolean,
    sizes: Array,
  },
  methods: {
    selectSize(size) {
      this.$emit("size-selected", size);
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.size-option {
  margin: 10px 0;
}

button {
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.close-modal {
  background-color: #e74c3c;
  color: white;
}
</style>