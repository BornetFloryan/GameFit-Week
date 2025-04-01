<template>
  <div class="stand-table-container">
    <AdminTable
        :title="'Liste des Tickets'"
        :headers="headers"
        :fields="fields"
        :dataSource="tickets"
        :showModifyButton="false"
        :showReservationsButton="false"
        :showDeleteButton="false"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AdminTable from "@/components/admin/AdminTable.vue";

export default {
  name: "AdminTicketsView",
  components: {
    AdminTable,
  },
  data() {
    return {
      headers: ["ID", "Date", "Heure", "ID Client", "ID Prix"],
      fields: ["_id", "date", "time", "customer_id", "price_id"],
    };
  },
  computed: {
    ...mapState("ticket", ["tickets"]),
  },
  methods: {
    ...mapActions("ticket", ["getTickets"]),
    ...mapActions("account", ["getCustomersAccounts"]),
  },
  async mounted() {
    await this.getTickets();
    await this.getCustomersAccounts();
  },
};
</script>

<style scoped>
.stand-table-container {
  padding: 2em;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  margin-bottom: 1.5em;
  text-align: center;
  color: #333;
  font-size: 1.8em;
}
</style>