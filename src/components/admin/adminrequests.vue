<template>
  <div class="requests-container">
    <h2>Demandes de Prestataires</h2>
    <ul>
      <li v-for="request in providerRequests" :key="request._id">
        <p><strong>Nom:</strong> {{ request.name }}</p>
        <p><strong>Email:</strong> {{ request.email }}</p>
        <p><strong>Statut:</strong> {{ request.status }}</p>
        <button @click="approveRequest(request._id)">Approuver</button>
        <button @click="rejectRequest(request._id)">Rejeter</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "AdminRequests",
  computed: {
    ...mapState("account", ["providerRequests"]),
  },
  methods: {
    ...mapActions("account", [
      "fetchProviderRequests",
      "approveProviderRequest",
      "rejectProviderRequest",
    ]),

    async approveRequest(id) {
      await this.approveProviderRequest(id);
    },

    async rejectRequest(id) {
      await this.rejectProviderRequest(id);
    },
  },
  async mounted() {
    await this.fetchProviderRequests();
  },
};
</script>




<style scoped>
.admin-requests {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

button {
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
