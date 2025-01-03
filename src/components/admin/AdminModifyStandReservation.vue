<template>
  <div class="modify-stand-form">
    <AdminStandForm
        :title="'Modifier Réservation ' + id"
        :backButtonText="'Retour'"
        :submitButtonText="'Modifier'"
        :cancelButtonText="'Annuler'"
        :formFields="formFields"
        :initialFormData="formData"
        @submit="handleModifyStandReservation"
        @back="goBack"
    />
  </div>
</template>

<script>
import AdminStandForm from "@/components/admin/AdminStandForm.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "AdminModifyStand",
  components: { AdminStandForm },
  data() {
    return {
      id: "",
      formData: {
        date: "",
        start_time: "",
        end_time: "",
        description: "",
        prestataire_id: "",
        service_id: "",
        stand_id: "",
      },
      formFields: [],
      prestataires: [],
      servicesPrestataires: [],
    };
  },
  computed: {
    ...mapState("stands", ["standsReservations", "stands"]),
    ...mapState("account", ["customersAccounts"]),
    ...mapState("prestation", ["providerServiceCategories", "serviceCategories"]),
    servicesPrestatairesCategory() {
      return this.servicesPrestataires.filter(
          (service) => service.prestataire_id === this.formData.prestataire_id
      );
    },
  },
  methods: {
    ...mapActions("stands", ["getStands", "modifyStandsReservations"]),
    ...mapActions("prestation", ["getProviderServiceCategories"]),
    getServiceName(service_id) {
      const service = this.serviceCategories.find((s) => s._id === service_id);
      return service ? service.name : "N/A";
    },
    async handleModifyStandReservation(data) {
      const updatedReservation = {
        ...this.formData,
        date: data.date,
        start_time: data.start_time,
        end_time: data.end_time,
        description: data.description,
        prestataire_id: data.prestataire_id,
        service_id: data.service_id,
        stand_id: data.stand_id,
      };
      await this.modifyStandsReservations(updatedReservation);
      await this.$router.push("/admin-dashboard/admin-stand-reservations");
    },
    goBack() {
      this.$router.go(-1);
    },
    initializeFormFields() {
      this.formFields = [
        {
          id: "date",
          label: "Date",
          type: "date",
          model: "date",
          props: { required: true, min: "2025-07-07", max: "2025-07-12" },
        },
        {
          id: "start_time",
          label: "Heure de début",
          type: "time",
          model: "start_time",
          props: { required: true },
        },
        {
          id: "end_time",
          label: "Heure de fin",
          type: "time",
          model: "end_time",
          props: { required: true },
        },
        {
          id: "description",
          label: "Description",
          type: "textarea",
          model: "description",
          props: { required: true },
        },
        {
          id: "prestataire_id",
          label: "Prestataire",
          type: "select",
          model: "prestataire_id",
          options: this.prestataires.map((p) => ({ value: p._id, text: p.name })),
          props: { required: true },
        },
        {
          id: "service_id",
          label: "Service du prestataire",
          type: "select",
          model: "service_id",
          options: this.servicesPrestatairesCategory.map((service) => ({
            value: service.service_category_id,
            text: this.getServiceName(service.service_category_id),
          })),
          props: { required: true },
        },
        {
          id: "stand_id",
          label: "Stand",
          type: "select",
          model: "stand_id",
          options: this.stands.map((stand) => ({ value: stand._id, text: stand.name })),
          props: { required: true },
        },
      ];
    },
  },
  async mounted() {
    await this.getStands();
    await this.getProviderServiceCategories();

    const reservation = this.standsReservations.find(
        (r) => r._id === this.$route.params.item_id
    );

    if (reservation) {
      this.id = reservation._id;
      this.formData = { ...reservation };
    }

    this.prestataires = this.customersAccounts.filter(
        (account) => account.privilege === "1"
    );
    this.servicesPrestataires = this.providerServiceCategories;

    this.initializeFormFields();
  },
};
</script>


<style scoped>
</style>