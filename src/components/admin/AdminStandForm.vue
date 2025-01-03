<template>
  <div class="form-container">
    <div class="form-card">
      <button @click="goBack" class="form-back-button">{{ backButtonText }}</button>
      <h2>{{ title }}</h2>
      <form @submit.prevent="handleSubmit">
        <div v-for="field in formFields" :key="field._id" class="form-group">
          <label :for="field._id">{{ field.label }}</label>

          <div v-if="field.type === 'select'">
            <select
                v-model="formData[field.model]"
                :id="field._id"
                v-bind="field.props"
            >
              <option
                  v-for="option in field.options"
                  :key="option.value"
                  :value="option.value"
              >
                {{ option.text }}
              </option>
            </select>
          </div>

          <div v-else-if="field.type === 'textarea'">
            <textarea
                v-model="formData[field.model]"
                :id="field._id"
                v-bind="field.props"
            ></textarea>
          </div>

          <div v-else>
            <input
                :type="field.type"
                v-model="formData[field.model]"
                :id="field._id"
                v-bind="field.props"
            />
          </div>
        </div>

        <div class="form-buttons-container">
          <button type="submit" class="form-submit-button">{{ submitButtonText }}</button>
          <button type="button" @click="resetForm" class="form-cancel-button">{{ cancelButtonText }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminStandForm",
  props: {
    title: {
      type: String,
      default: "Modifier Réservation",
    },
    backButtonText: {
      type: String,
      default: "Retour",
    },
    submitButtonText: {
      type: String,
      default: "Modifier",
    },
    cancelButtonText: {
      type: String,
      default: "Annuler",
    },
    formFields: {
      type: Array,
      default: () => [],
    },
    initialFormData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      formData: { ...this.initialFormData },
    };
  },
  watch: {
    initialFormData: {
      deep: true,
      handler(newValue) {
        this.formData = { ...newValue };
      },
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("submit", this.formData);
    },
    resetForm() {
      this.formData = { ...this.initialFormData };
    },
    goBack() {
      this.$emit("back");
    },
  },
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  background-color: #f0f2f5;
  padding: 1em;
}

.form-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);

  position: relative;
}

h2 {
  margin-bottom: 1em;
  color: #333;
  font-size: 1.5em;
}

.form-back-button {
  top: 1em;
  left: 1em;
  padding: 0.5em 1em;
  border: none;
  border-radius: 5px;
  font-size: 0.9em;
  cursor: pointer;
  background-color: #dc3545;
  color: white;
  transition: background-color 0.3s ease;
}

.form-back-button:hover {
  background-color: #c82333;
}

.form-group {
  width: 100%;
  margin-bottom: 1em;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5em;
  font-size: 1em;
  color: #555;
}

select,
textarea,
input[type="text"],
input[type="date"],
input[type="time"] {
  width: 100%;
  padding: 0.5em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease;
}

select:focus,
textarea:focus,
input[type="text"]:focus,
input[type="date"]:focus,
input[type="time"]:focus {
  border-color: #007bff;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

.form-buttons-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.form-submit-button {
  background-color: #007bff;
  color: white;
  padding: 0.5em 1em;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-submit-button:hover {
  background-color: #0056b3;
}

.form-cancel-button {
  background-color: #6c757d;
  color: white;
  padding: 0.5em 1em;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-cancel-button:hover {
  background-color: #5a6268;
}
</style>