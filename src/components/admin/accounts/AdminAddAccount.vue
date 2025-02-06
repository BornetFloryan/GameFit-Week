<template>
  <div class="add-account-form">
    <AdminForm
        :title="'Ajouter Compte'"
        :backButtonText="'Retour'"
        :submitButtonText="'Ajouter'"
        :cancelButtonText="'Annuler'"
        :formFields="computedFormFields"
        :initialFormData="formData"
        @submit="handleAddCustomerAccount"
        @back="goBack"
        @update:formData="updateFormData"
    />
  </div>
</template>

<script>
import AdminForm from "@/components/admin/AdminForm.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "AdminAddAccount",
  components: { AdminForm: AdminForm },
  data() {
    return {
      formData: {
        name: "",
        login: "",
        password: "",
        email: "",
        picture: "",
        description: "",
        privilege: "",
        services: [],
        session: "",
      },
      formFields: [],
      savedServices: [],
    };
  },
  computed: {
    ...mapState("prestation", ["serviceCategories"]),
    computedFormFields() {
      const fields = [
        { id: "name", label: "Nom", type: "text", model: "name", props: { required: true } },
        { id: "login", label: "Login", type: "text", model: "login", props: { required: true } },
        { id: "password", label: "Mot de passe", type: "password", model: "password", props: { required: true } },
        { id: "email", label: "Email", type: "email", model: "email", props: { required: true } },
        { id: "picture", label: "Image", type: "text", model: "picture", props: { required: false } },
        { id: "description", label: "Description", type: "textarea", model: "description", props: { required: false } },
        {
          id: "privilege", label: "Privilège", type: "select", model: "privilege", options: [
            { value: 0, text: "Client" },
            { value: 1, text: "Prestataire" },
            { value: 2, text: "Admin" },
          ], props: { required: true }
        },
      ];

      if (this.formData.privilege === "1") {
        fields.push({
          id: "services",
          label: "Services",
          type: "checkbox",
          model: "services",
          options: this.serviceOptions,
          props: { required: true }
        });
      }

      return fields;
    },
    serviceOptions() {
      return this.serviceCategories ? this.serviceCategories.map(service => ({
        value: service._id,
        text: `${service.name}`,
      })) : [];
    },
  },
  methods: {
    ...mapActions("account", ["addCustomerAccount"]),
    ...mapActions("prestation", ["getServiceCategories", "addProviderServiceCategory"]),

    async handleAddCustomerAccount(data) {
      const newAccount = {
        ...this.formData,
        name: data.name,
        login: data.login,
        password: data.password,
        email: data.email,
        picture: data.picture,
        description: data.description,
        privilege: data.privilege,
        session: data.session,
      };

      await this.addCustomerAccount(newAccount);

      if (data.privilege === "1" && data.services.length > 0) {
        for (const service of data.services) {
          try {
            let response = await this.addProviderServiceCategory({
              user: { email: this.formData.email },
              serviceCategory: service
            });
            if (response.error !== 0) {
              alert(response.data);
              return;
            }
          } catch (e) {
            console.error(e);
          }
        }
      }

      await this.$router.push("/admin-dashboard/admin-accounts");
    },

    goBack() {
      this.$router.go(-1);
    },

    async initializeFormFields() {
      await this.getServiceCategories();
    },

    updateFormData(newFormData) {
      this.formData = newFormData;
    },
  },
  async mounted() {
    await this.initializeFormFields();
  },
};
</script>

<style scoped>
.add-account-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
  padding: 1em;
}
</style>