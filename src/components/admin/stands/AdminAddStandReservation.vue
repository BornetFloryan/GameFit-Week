<template>
  <div class="add-stand-form">
    <AdminForm
        :title="'Ajouter une réservation'"
        :backButtonText="'Retour'"
        :submitButtonText="'Ajouter'"
        :cancelButtonText="'Annuler'"
        :formFields="formFields"
        :initialFormData="formData"
        @submit="handleAddStandReservation"
        @back="goBack"
        @prestataireSelected="updateServicesPrestatairesCategory"
        @serviceSelected="updateStandVisibility"
        @standSelected="updateFormVisibility"
        @startTimeSelected="updateEndTimeOptions"
        @dateSelected="updateAvailableTimes"
    />
  </div>
</template>

<script>
import AdminForm from "@/components/admin/AdminForm.vue";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: "AdminAddStandReservation",
  components: { AdminForm },
  data() {
    return {
      formData: {
        date: "",
        start_time: "",
        end_time: "",
        description: "",
        customer_id: "",
        service_id: "",
        stand_id: "",
      },
      formFields: [],
      prestataires: [],
      servicesPrestataires: [],
      availableTimes: this.generateAvailableTimes(),
    };
  },
  computed: {
    ...mapState("stands", ["standsReservations", "stands"]),
    ...mapState("account", ["customersAccounts"]),
    ...mapState("prestation", ["providerServiceCategories", "serviceCategories"]),
    ...mapGetters("stands", ["getStandById", "getStandReservationById", "getStandsReservationsByStandIdAndDate"]),
    ...mapGetters("prestation", ["getProviderServiceCategoriesByCustomerId", "getServiceCategoryById", "getProviderOfferingServices"]),

    servicesPrestatairesCategory() {
      return this.getProviderServiceCategoriesByCustomerId(this.formData.customer_id);
    },
  },
  methods: {
    ...mapActions("stands", ["getStands", "addStandReservation"]),
    ...mapActions("prestation", ["getProviderServiceCategories"]),

    async handleAddStandReservation(data) {
      await this.addStandReservation({...this.formData, ...data});
      await this.$router.push("/admin-dashboard/admin-stand-reservation");
    },

    goBack() {
      this.$router.go(-1);
    },

    generateAvailableTimes() {
      return Array.from({length: 10}, (_, i) => `${(9 + i).toString().padStart(2, '0')}:00`);
    },

    filterAvailableTimes(date, stand_id) {
      const reservations = this.getStandsReservationsByStandIdAndDate(stand_id, date);
      const customerReservations = this.standsReservations.filter(res => res.customer_id === this.formData.customer_id && res.date === date && res.stand_id !== stand_id);
      const usedTimes = [...reservations, ...customerReservations]
          .filter(res => res._id !== this.id)
          .flatMap((res) => {
            const start = parseInt(res.start_time.split(':')[0], 10);
            const end = parseInt(res.end_time.split(':')[0], 10);
            return Array.from({ length: end - start }, (_, i) => `${(start + i).toString().padStart(2, '0')}:00`);
          });
      const availableTimes = this.availableTimes.filter(
          (time) => !usedTimes.includes(time) && time !== "18:00"
      );
      return availableTimes.length > 0 ? availableTimes : [];
    },

    getAvailableDates(stand_id) {
      const dates = ["2025-07-07", "2025-07-08", "2025-07-09", "2025-07-10", "2025-07-11", "2025-07-12"];
      return dates.filter(date => this.filterAvailableTimes(date, stand_id).length > 0);
    },

    initializeFormFields() {
      this.formFields = [
        {
          id: "customer_id",
          label: "Prestataire",
          type: "select",
          model: "customer_id",
          options: this.prestataires.map((p) => ({value: p._id, text: p.name})),
          props: {required: true, disabled: false},
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
          props: {required: true, disabled: !this.formData.customer_id},
        },
        {
          id: "stand_id",
          label: "Stand",
          type: "select",
          model: "stand_id",
          options: this.stands.map((stand) => ({value: stand._id, text: stand.name})),
          props: {required: true, disabled: !this.formData.service_id},
        },
        {
          id: "date",
          label: "Date",
          type: "date",
          model: "date",
          props: {
            required: true,
            min: "2025-07-07",
            max: "2025-07-12",
            disabled: !this.formData.stand_id || !this.formData.service_id || !this.formData.customer_id
          },
        },
        {
          id: "start_time",
          label: "Heure de début",
          type: "select",
          model: "start_time",
          options: this.availableTimes.map(time => ({value: time, text: time})),
          props: {required: true, disabled: !this.formData.date},
        },
        {
          id: "end_time",
          label: "Heure de fin",
          type: "select",
          model: "end_time",
          options: this.availableTimes.map(time => ({value: time, text: time})),
          props: {required: true, disabled: true},
        },
        {
          id: "description",
          label: "Description",
          type: "textarea",
          model: "description",
          props: {required: true, disabled: !this.formData.date},
        },
      ];
    },

    updateServicesPrestatairesCategory(prestataire_id) {
      this.formData.customer_id = prestataire_id;
      this.formData.service_id = "";
      this.updateVisibility("service_id", prestataire_id);
      const serviceField = this.formFields.find((field) => field.id === "service_id");
      if (serviceField) {
        serviceField.options = this.getProviderServiceCategoriesByCustomerId(prestataire_id).map((service) => ({
          value: service.service_category_id,
          text: this.getServiceName(service.service_category_id),
        }));
      }
      this.updateVisibility("date", this.formData.customer_id && this.formData.service_id && this.formData.stand_id);
    },

    updateStandVisibility(service_id) {
      this.formData.service_id = service_id;
      this.updateVisibility("stand_id", service_id);
      this.updateVisibility("date", this.formData.customer_id && service_id && this.formData.stand_id);
    },

    updateFormVisibility(stand_id) {
      this.formData.stand_id = stand_id;
      const availableDates = this.getAvailableDates(stand_id);
      this.updateFieldOptions("date", availableDates.map(date => ({value: date, text: date})));
      this.updateVisibility("date", this.formData.customer_id && this.formData.service_id && stand_id);
      const availableTimes = this.filterAvailableTimes(this.formData.date, stand_id);
      this.updateFieldOptions("start_time", availableTimes);
      this.updateEndTimeOptions(this.formData.start_time);
    },

    updateEndTimeOptions(start_time) {
      this.formData.start_time = start_time;
      const availableTimes = this.generateAvailableTimes();
      const reservations = this.getStandsReservationsByStandIdAndDate(this.formData.stand_id, this.formData.date);
      const nextReservation = reservations
          .map((res) => res.start_time)
          .sort()
          .find((time) => time > start_time);
      const endTimeOptions = availableTimes.filter((time) => {
        return time > start_time && (!nextReservation || time <= nextReservation);
      });
      this.updateFieldOptions("end_time", endTimeOptions);
      this.updateVisibility("end_time", !!start_time);
    },

    updateAvailableTimes(date) {
      this.formData.date = date;
      this.formData.start_time = "";
      this.formData.end_time = "";
      const availableTimes = this.filterAvailableTimes(date, this.formData.stand_id);
      this.updateFieldOptions("start_time", availableTimes.filter((time) => time !== "18:00"));
      this.updateFieldOptions("end_time", []);
      this.updateVisibility("start_time", availableTimes.length > 0);
      this.updateVisibility("description", availableTimes.length > 0 && this.formData.customer_id && this.formData.service_id);
      if (availableTimes.length === 0) {
        this.formData.date = "";
      }
    },

    updateVisibility(fieldId, condition) {
      const field = this.formFields.find((f) => f.id === fieldId);
      if (field) field.props.disabled = !condition;
    },

    updateFieldOptions(fieldId, options) {
      const field = this.formFields.find((f) => f.id === fieldId);
      if (field) field.options = options.map((time) => ({value: time, text: time}));
    },

    getServiceName(service_id) {
      const service = this.getServiceCategoryById(service_id);
      return service ? service.name : "N/A";
    },
  },

  async created() {
    if (this.$route.params.stand_id) {
      this.formData.stand_id = this.$route.params.stand_id;
    }
  },

  async mounted() {
    await this.getStands();
    await this.getProviderServiceCategories();
    this.prestataires = this.getProviderOfferingServices;
    this.servicesPrestataires = this.providerServiceCategories;
    this.initializeFormFields();
  },
};
</script>

<style scoped>
</style>