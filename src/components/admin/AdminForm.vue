<template>
  <div class="form-container">
    <div class="form-card">
      <button @click="goBack" class="form-back-button">{{ backButtonText }}</button>
      <h2>{{ title }}</h2>
      <form @submit.prevent="handleSubmit">
        <div v-for="field in visibleFormFields" :key="field._id" class="form-group">
          <label :for="field._id">{{ field.label }}</label>
          <div v-if="field.type === 'select'">
            <select
                v-model="formData[field.model]"
                :id="field._id"
                v-bind="field.props"
                @change="handleFieldChange(field)"
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

          <div v-else-if="field.type === 'img' && field.model === 'picture'">
            <input type="file" id="imageUpload" @change="handleImageUpload" />
            <img v-if="imagePreview || formData[field.model]" :src="imagePreview || require(`@/assets/img/users/${formData[field.model]}`)" alt="Aperçu de l'image" class="image-preview" />
          </div>

          <div v-else-if="field.type === 'textarea' && field.model === 'description'">
            <VueEditor
                v-model="formData[field.model]"
                :id="field._id"
                v-bind="field.props"
                @change="handleFieldChange(field)"
            />
          </div>

          <div v-else-if="field.type === 'textarea'">
            <textarea
                v-model="formData[field.model]"
                :id="field._id"
                v-bind="field.props"
                @change="handleFieldChange(field)"
            ></textarea>
          </div>

          <div v-else-if="field.type === 'checkbox' && formData.privilege === '1'">
            <div v-for="option in field.options" :key="option.value" class="checkbox-group">
              <input
                  type="checkbox"
                  :id="option.value"
                  :value="option.value"
                  :checked="(formData[field.model] || []).includes(option.value)"
                  @change="handleCheckboxChange(field.model, option.value)"
              />
              <label :for="option.value">{{ option.text }}</label>
            </div>
          </div>

          <div v-else>
            <input
                :type="field.type"
                v-model="formData[field.model]"
                :id="field._id"
                v-bind="field.props"
                @change="handleFieldChange(field)"
            />
          </div>
        </div>

        <div class="form-buttons-container">
          <button type="submit" class="form-submit-button">{{ submitButtonText }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: "AdminForm",
  components: { VueEditor },
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
      formData: {...this.initialFormData},
      savedServices: [],
      imagePreview: null,
      imageFile: null,
      imageName: null,
    };
  },
  computed: {
    visibleFormFields() {
      return this.formFields.filter(field => {
        if (field.id === "services" && this.formData.privilege !== "1") {
          return false;
        }
        return field.visible !== false;
      });
    },
  },
  watch: {
    initialFormData: {
      deep: true,
      handler(newValue) {
        this.formData = {...newValue};
      },
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("submit", { ...this.formData, imageFile: this.imageFile, imageName: this.imageName });
    },
    goBack() {
      this.$emit("back");
    },
    handleFieldChange(field) {
      if (field.id === "privilege") {
        if (this.formData.privilege === "1") {
          this.formData.services = this.savedServices;
        } else {
          if (this.formData.services.length > 0) {
            this.savedServices = [...this.formData.services];
          }
          this.formData.services = [];
        }
      }
      if (field.id === "customer_id") {
        this.$emit("prestataireSelected", this.formData.customer_id);
      } else if (field.id === "service_id") {
        this.$emit("serviceSelected", this.formData.service_id);
      } else if (field.id === "stand_id") {
        this.$emit("standSelected", this.formData.stand_id);
      } else if (field.id === "date") {
        this.$emit("dateSelected", this.formData.date);
      } else if (field.id === "start_time") {
        this.$emit("startTimeSelected", this.formData.start_time);
      } else if (field.id === "ticket_id") {
        this.$emit("ticketSelected", this.formData.ticket_id);
      }
      this.$emit("field-change", field);
      this.$emit("update:formData", this.formData);
    },
    handleCheckboxChange(model, value) {
      if (!Array.isArray(this.formData[model])) {
        this.$set(this.formData, model, []);
      }
      const index = this.formData[model].indexOf(value);
      if (index > -1) {
        this.formData[model].splice(index, 1);
      } else {
        this.formData[model].push(value);
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageFile = file;
        this.imageName = file.name;

        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
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
  justify-content: center;
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

select:disabled,
textarea:disabled,
input[type="text"]:disabled,
input[type="date"]:disabled,
input[type="time"]:disabled {
  background-color: #e9ecef;
  color: #6c757d;
  cursor: not-allowed;
}

.checkbox-group {
  display: flex;
  align-items: center;
  margin-bottom: 0.5em;
}

.checkbox-group input {
  margin-right: 0.5em;
}

.image-preview {
  max-width: 100%;
  height: auto;
  margin-top: 1em;
}
</style>