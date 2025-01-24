<template>
  <div class="modify-account-form">
    <AdminForm
        :title="'Modifier Compte ' + id"
        :backButtonText="'Retour'"
        :submitButtonText="'Modifier'"
        :cancelButtonText="'Annuler'"
        :formFields="computedFormFields"
        :initialFormData="formData"
        @submit="handleModifyCustomerAccount"
        @back="goBack"
        @update:formData="updateFormData"
    />
  </div>
</template>

<script>
import AdminForm from "@/components/admin/AdminForm.vue";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: "AdminModifyAccount",
  components: {AdminForm: AdminForm},
  data() {
    return {
      id: "",
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
    };
  },
  computed: {
    ...mapState("account", ["customersAccounts"]),
    ...mapState("prestation", ["serviceCategories", 'providerServiceCategories']),
    ...mapGetters("account", ["getCustomerById"]),
    ...mapGetters("prestation", ["getProviderServiceCategoriesByCustomerId"]),
    computedFormFields() {
      const fields = [
        {id: "name", label: "Nom", type: "text", model: "name", props: {required: true}},
        {id: "login", label: "Login", type: "text", model: "login", props: {required: true}},
        {id: "password", label: "Mot de passe", type: "password", model: "password", props: {required: true}},
        {id: "email", label: "Email", type: "email", model: "email", props: {required: true}},
        {id: "picture", label: "Image", type: "text", model: "picture", props: {required: false}},
        {id: "description", label: "Description", type: "textarea", model: "description", props: {required: false}},
        {
          id: "privilege", label: "Privilège", type: "select", model: "privilege", options: [
            {value: "0", text: "Client"},
            {value: "1", text: "Prestataire"},
            {value: "2", text: "Admin"},
          ], props: {required: true}
        },
      ];

      if (this.formData.privilege === "1") {
        fields.push({
          id: "services",
          label: "Services",
          type: "checkbox",
          model: "services",
          options: this.serviceOptions,
          props: {required: true}
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
    ...mapActions("account", ["modifyCustomerAccount"]),
    ...mapActions("prestation", ["getServiceCategories", "getProviderServiceCategories", "addProviderServiceCategory", "deleteProviderServiceCategory"]),

    async handleModifyCustomerAccount(data) {
      const updatedAccount = {
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

      let currentServices = this.getProviderServiceCategoriesByCustomerId(this.id).map(service => service._id);

      let servicesToRemove = currentServices.filter(service => !data.services.includes(service));
      if (servicesToRemove.length > 0) {
        let providerServices = this.getProviderServiceCategoriesByCustomerId(this.id);
        for (const service of servicesToRemove) {
          let serviceToDelete = providerServices.find(providerService => providerService._id === service);
          try {
            let response = await this.deleteProviderServiceCategory(serviceToDelete);
            if (response.error !== 0) {
              alert(response.data);
              return;
            }
          } catch (e) {
            console.error(e);
          }
        }
      }

      let servicesToAdd = data.services.filter(service => !currentServices.includes(service));

      if (servicesToAdd.length > 0) {
        for (const service of servicesToAdd) {
          try {
            let response = await this.addProviderServiceCategory({
              user: {email: this.formData.email},
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

      await this.modifyCustomerAccount(updatedAccount);
      await this.$router.push("/admin-dashboard/admin-accounts");
    },

    goBack() {
      this.$router.go(-1);
    },

    async initializeFormFields() {
      await this.getServiceCategories();
      await this.getProviderServiceCategories();

      if (this.formData.privilege === "1") {
        const userServices = await this.getProviderServiceCategoriesByCustomerId(this.id);

        this.formData.services = userServices.map(service => service.service_id);
      }
    },

    updateFormData(newFormData) {
      this.formData = newFormData;
    },
  },
  async mounted() {
    if (this.$route.params.item_id) {
      const account = this.getCustomerById(this.$route.params.item_id);
      if (account) {
        this.id = account._id;
        this.formData = {...account, services: account.services || []};
        this.savedServices = this.formData.services;
      }
    }
    await this.initializeFormFields();
  },
};
</script>