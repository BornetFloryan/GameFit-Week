<template>
  <div class="modify-stand-form">
    <AdminForm
        :title="'Modifier réservation ' + id"
        :backButtonText="'Retour'"
        :submitButtonText="'Modifier'"
        :cancelButtonText="'Annuler'"
        :formFields="formFields"
        :initialFormData="formData"
        @submit="handleModifyServiceReservation"
        @back="goBack"
        @ticketSelected="verifyTicket"
        @prestataireSelected="updateDateVisibility"
        @dateSelected="updateAvailableTimes"
    />
  </div>
</template>

<script>
import AdminForm from "@/components/admin/AdminForm.vue";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: "AdminModifyDedicationReservation",
  components: { AdminForm },
  data() {
    return {
      id: "",
      formData: {
        ticket_id: "",
        customer_id: "",
        service_id: "0",
        stands_reservations_id: "",
        date: "",
        time: "",
      },
      formFields: [],
      prestataires: [],
      availableTimes: [],
    };
  },
  computed: {
    ...mapState("prestation", ["providerServiceCategories", "serviceCategories"]),
    ...mapGetters("stands", ["getStandById", "getStandReservationById", "getStandsReservationsByCustomerIdAndServiceIdAndDate", "getStandReservationById"]),
    ...mapGetters("prestation", ["getProviderServiceCategoriesByCustomerId", "getProviderOfferingServices", "getServiceReservationsByTicketIdAndDate", "getServiceReservationsByDate", "getServiceReservationsById"]),
    ...mapGetters("ticket", ["getTicketById"]),
  },
  methods: {
    ...mapActions("stands", ["getStands"]),
    ...mapActions("prestation", ["getProviderServiceCategories", 'modifyServiceReservation']),
    ...mapActions("ticket", ["getTickets"]),

    initializeFormFields() {
      this.formFields = [
        {
          id: "ticket_id",
          label: "Numéro de ticket",
          type: "text",
          model: "ticket_id",
          props: {required: true},
        },
        {
          id: "customer_id",
          label: "Prestataire",
          type: "select",
          model: "customer_id",
          options: this.prestataires.map((p) => ({value: p._id, text: p.name})),
          props: {required: true, disabled: !this.formData.ticket_id},
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
            disabled: !this.formData.customer_id,
          },
        },
        {
          id: "time",
          label: "Horaire",
          type: "select",
          model: "time",
          options: this.availableTimes.map(time => ({value: time, text: time})),
          props: {required: true, disabled: !this.formData.date},
        },
      ];
    },

    updateVisibility(fieldId, condition) {
      const field = this.formFields.find((f) => f.id === fieldId);
      if (field) field.props.disabled = !condition;
    },

    updateFieldOptions(fieldId, options) {
      const field = this.formFields.find((f) => f.id === fieldId);
      if (field) field.options = options.map((time) => ({value: time, text: time}));
    },

    async verifyTicket(ticket_id) {
      if (!ticket_id) {
        this.formData.ticket_id = "";
        this.formData.customer_id = "";
        this.updateVisibility("customer_id", false);
        return;
      }
      const ticket = this.getTicketById(ticket_id);
      if (ticket) {
        this.formData.ticket_id = ticket_id;
        this.updateVisibility("customer_id", true);
      } else {
        this.formData.ticket_id = "";
        this.formData.customer_id = "";
        this.updateVisibility("customer_id", false);
      }
    },

    updateDateVisibility(customer_id) {
      this.formData.customer_id = customer_id;
      this.formData.date = "";
      this.formData.time = "";
      this.availableTimes = [];
      const availableDates = this.getAvailableDates(customer_id);
      this.updateFieldOptions("date", availableDates.map(date => ({value: date, text: date})));
      this.updateVisibility("date", this.formData.ticket_id && this.formData.customer_id);
      this.updateVisibility("time", false);
    },

    getAvailableDates(customer_id) {
      const dates = ["2025-07-07", "2025-07-08", "2025-07-09", "2025-07-10", "2025-07-11", "2025-07-12"];
      return dates.filter(date => this.filterAvailableTimes(date, customer_id).length > 0);
    },

    filterAvailableTimes(date, customer_id) {
      const customerReservations = this.getServiceReservationsByTicketIdAndDate(this.formData.ticket_id, date);
      const ServiceReservations = this.getServiceReservationsByDate(date);
      const prestataireAvailableTimes = this.getPrestataireAvailableTimes(customer_id, date);

      const usedTimes = [...customerReservations, ...ServiceReservations].map((reservation) => reservation.time);

      let availableTimes = prestataireAvailableTimes.filter((time) => !usedTimes.includes(time) && time !== "18:00")

      if (this.$route.params.item_id) {
        const reservation = this.getServiceReservationsById(this.$route.params.item_id);
        if (reservation) {
          const standReservation = this.getStandReservationById(reservation.stands_reservations_id);
          if (standReservation) {
            const start = parseInt(standReservation.start_time.split(':')[0], 10) * 60 + parseInt(standReservation.start_time.split(':')[1], 10);
            const end = parseInt(standReservation.end_time.split(':')[0], 10) * 60 + parseInt(standReservation.end_time.split(':')[1], 10);
            const selectedTime = reservation.time;
            const selectedMinutes = parseInt(selectedTime.split(':')[0], 10) * 60 + parseInt(selectedTime.split(':')[1], 10);
            if (selectedMinutes >= start && selectedMinutes < end) {
              availableTimes.push(selectedTime);
            }
          }
        }
      }

      availableTimes.sort((a, b) => {
            const [aHours, aMinutes] = a.split(':').map(Number);
            const [bHours, bMinutes] = b.split(':').map(Number);
            return aHours * 60 + aMinutes - (bHours * 60 + bMinutes);
          });

      return availableTimes.length > 0 ? availableTimes : [];
    },

    getPrestataireAvailableTimes(customer_id, date) {
      const schedules = this.getStandsReservationsByCustomerIdAndServiceIdAndDate(customer_id, "0", date);

      if (!schedules || schedules.length === 0) {
        return [];
      }

      const times = [];
      schedules.forEach(schedule => {
        const start = parseInt(schedule.start_time.split(':')[0], 10) * 60 + parseInt(schedule.start_time.split(':')[1], 10);
        const end = parseInt(schedule.end_time.split(':')[0], 10) * 60 + parseInt(schedule.end_time.split(':')[1], 10);

        for (let minutes = start; minutes < end; minutes += 5) {
          const hours = Math.floor(minutes / 60);
          const mins = minutes % 60;
          const time = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
          times.push(time);
        }
      });

      return times;
    },

    updateAvailableTimes(date) {
      this.formData.date = date;
      let availableTimes = this.filterAvailableTimes(date, this.formData.customer_id);

      this.updateFieldOptions("time", availableTimes.filter((time) => time !== "18:00"));
      this.updateVisibility("time", availableTimes.length > 0);
      this.updateVisibility("description", availableTimes.length > 0 && this.formData.customer_id && this.formData.service_id);

      if (availableTimes.length === 0) {
        this.formData.date = "";
      }

      this.availableTimes = availableTimes;
      this.initializeFormFields();
    },

    goBack() {
      this.$router.go(-1);
    },

    async handleModifyServiceReservation(data) {
      const standReservations = this.getStandsReservationsByCustomerIdAndServiceIdAndDate(data.customer_id, "0", data.date);
      const selectedTime = data.time;
      const standReservation = standReservations.find(reservation => {
        const startTime = parseInt(reservation.start_time.split(':')[0], 10) * 60 + parseInt(reservation.start_time.split(':')[1], 10);
        const endTime = parseInt(reservation.end_time.split(':')[0], 10) * 60 + parseInt(reservation.end_time.split(':')[1], 10);
        const selectedMinutes = parseInt(selectedTime.split(':')[0], 10) * 60 + parseInt(selectedTime.split(':')[1], 10);
        return selectedMinutes >= startTime && selectedMinutes < endTime;
      });

      if (standReservation) {
        data.stands_reservations_id = standReservation._id;
      } else {
        alert("No valid stand reservation found for the selected time.");
        return;
      }

      try {
        let response = await this.modifyServiceReservation(data);
        if (response.error === 0) {
          await this.$router.push("/admin-dashboard/admin-dedication-reservation");
          return;
        }
        alert(response.data);
      } catch (e) {
        alert("Une erreur s'est produite lors de la modification de la réservation");
      }
    },
  },

  async mounted() {
    await this.getTickets();
    await this.getStands();
    await this.getProviderServiceCategories();

    if (this.$route.params.item_id) {
      const reservation = this.getServiceReservationsById(this.$route.params.item_id);
      if (reservation) {
        this.id = reservation._id;
        this.formData = {...reservation};
        this.formData.customer_id = this.getStandReservationById(reservation.stands_reservations_id).customer_id;

        this.updateAvailableTimes(this.formData.date);
      }
    }

    this.prestataires = this.getProviderOfferingServices.filter((p) =>
        this.getProviderServiceCategoriesByCustomerId(p._id).some((psc) => psc.service_category_id === "0" && psc.state === '1')
    );
    this.initializeFormFields();
  },
};
</script>

<style scoped>
</style>