<template>
  <div class="requests-container">
    <h2>Demandes de Prestataires</h2>
    <table>
      <thead>
      <tr>
        <th>Numéro</th>
        <th>Date</th>
        <th>Client</th>
        <th>Services</th>
        <th>Statut</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="request in providerRequests" :key="request._id">
        <td>{{ request._id }}</td>
        <td>{{ request.date }}</td>
        <td>{{ getCustomerById(request.customer_id)?.name || 'Unknown' }}</td>
        <td>
          <ul class="indented-list">
            <li v-for="service in getProviderServiceCategoriesByCustomerId(request.customer_id)" :key="service._id">
              {{ getServiceCategoryById(service.service_category_id).name }}
            </li>
          </ul>
        </td>
        <td>{{ request.state }}</td>
        <td>
          <button v-if="request.state !== '1' && request.state !== '2'" @click="approveRequest(request)">Approuver</button>
          <button v-if="request.state === '1' || request.state === '2'" @click="deleteRequest(request)">Supprimer</button>
          <button v-if="request.state !== '1' && request.state !== '2'" @click="rejectRequest(request)">Rejeter</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from "vuex";

export default {
  name: "AdminRequests",
  computed: {
    ...mapState("account", ["currentUser", "providerRequests"]),
    ...mapGetters("prestation", ["getProviderServiceCategoriesByCustomerId", "getServiceCategoryById"]),
    ...mapGetters("account", ["getCustomerById"]),
    ...mapGetters('stands', ['getStandsReservationsByCustomerId'])
  },
  methods: {
    ...mapActions("account", [
      "getCustomersAccounts",
      "getProviderRequests",
      "approveProviderRequest",
      "rejectProviderRequest",
      "deleteProviderRequest",
      "modifyCustomerAccount",
    ]),
    ...mapActions('prestation', ['getServiceCategories', 'getProviderServiceCategories', "deleteProviderServiceCategory"]),
    ...mapActions('stands', ['getStands', 'getStandsReservations']),

    async approveRequest(request) {
      if (confirm("Êtes-vous sûr de vouloir approuver cette demande ?")) {
        try {
          let response = await this.approveProviderRequest(request);
          if (response.error === 0) {
            let user = this.getCustomerById(request.customer_id);
            if (user) {
              user.privilege = "1";
              response = await this.modifyCustomerAccount(user);
              if (response.error !== 0) {
                alert(response.data);
              }
            }
          } else {
            alert(response.data);
          }
        } catch (error) {
          console.error(error);
        }
      }
    },

    async rejectRequest(request) {
      if (confirm("Êtes-vous sûr de vouloir rejeter cette demande ?")) {
        try {
          let response = await this.rejectProviderRequest(request);
          if (response.error === 0) {
            for (let category of this.getProviderServiceCategoriesByCustomerId(request.customer_id)) {
              try {
                response = await this.deleteProviderServiceCategory(category);
                if (response.error !== 0) {
                  alert(response.data);
                }
              } catch (error) {
                console.error(error);
              }
            }
          } else {
            alert(response.data);
          }
        } catch (error) {
          console.error(error);
        }
      }
    },

    async deleteRequest(request) {
      let standReservations = this.getStandsReservationsByCustomerId(request.customer_id);
      if (standReservations && standReservations.length) {
        let reservationIds = standReservations.map(reservation => reservation._id).join(', ');
        alert(`Impossible de supprimer la demande car le prestataire a des réservations de stand. Numéros de réservation: ${reservationIds}`);
        return;
      }
      if (confirm("Êtes-vous sûr de vouloir supprimer cette demande ?")) {
        try {
          let response = await this.deleteProviderRequest(request);
          if (response.error !== 0) {
            alert(response.data);
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
  async mounted() {
    await this.getCustomersAccounts()
    await this.getProviderRequests();
    await this.getServiceCategories()
    await this.getProviderServiceCategories();
    await this.getStands()
    await this.getStandsReservations()
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

.indented-list {
  padding-left: 20px;
}
</style>