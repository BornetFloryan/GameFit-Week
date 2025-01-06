<template>
  <div>
    <router-link to="/admin-dashboard/admin-accounts-add">
      <button class="btn-action">Ajouter un compte</button>
    </router-link>
    <AdminTable
        :title="title"
        :headers="headers"
        :fields="fields"
        :modifyName="modifyName"
        :showModifyButton="true"
        :modifyButtonText="'Modifier'"
        :showReservationsButton="enableRes"
        :reservationsButtonText="'Voir les réservations'"
        :showDeleteButton="enableDelete"
        :deleteButtonText="'Supprimer'"
        @delete="handleDeleteButton"
        @toggle-service-state="handleToggleServiceState"
        :dataSource="dataSource"
    />
  </div>
</template>

<script>
import AdminTable from "@/components/admin/AdminTable.vue";
import {mapActions, mapState, mapGetters} from "vuex";

export default {
  name: 'AdminAccountsManagement',
  components: {AdminTable},
  data() {
    return {
      title: "Gestion des comptes clients",
      headers: ['Numéro', 'Nom', 'Login', 'Email', 'Image', 'Description', 'Privilege', 'Service', 'Session'],
      fields: ['_id', 'name', 'login', 'email', 'picture', 'description', 'privilege', 'services', 'session'],
      modifyName: 'admin-accounts-edit',
      enableRes: false,
      enableDelete: true,
      dataSource: [],
      providers: [],
    };
  },
  computed: {
    ...mapState('account', ['customersAccounts']),
    ...mapGetters('prestation', ['getProviderServiceCategoriesByCustomerId', 'getProviderOfferingServices']),
    ...mapGetters('stands', ['getStandsReservationsByCustomerIdAndServiceId'])
  },
  methods: {
    ...mapActions('account', ['getCustomersAccounts', 'deleteCustomerAccount']),
    ...mapActions('prestation', ['getServiceCategories', 'getProviderServiceCategories', 'modifyProviderServiceCategory']),
    ...mapActions('stands', ['getStandsReservations']),

    async handleDeleteButton(id) {
      if (confirm('Voulez-vous vraiment supprimer ce compte ?')) {
        await this.deleteCustomerAccount(id);
        await this.getCustomersAccounts();
      }
    },
    filterAccounts() {
      this.dataSource = this.customersAccounts.map(customer => {
        return {
          ...customer,
          services: this.getProviderServiceCategoriesByCustomerId(customer._id) || [],
        };
      });
    },
    async handleToggleServiceState({ service }) {
      await this.modifyProviderServiceCategory({ service });
    },
  },
  async mounted() {
    await this.getCustomersAccounts();
    await this.getServiceCategories();
    await this.getProviderServiceCategories();
    await this.getStandsReservations();
    this.filterAccounts();
  },
};
</script>

<style scoped>
.btn-action {
  padding: 0.5em 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.3s ease;
  margin-bottom: 1em;
  margin-right: 1em;
}

.btn-action:hover {
  background-color: #0056b3;
}
</style>