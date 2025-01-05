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
        :dataSource="dataSource"
    />
  </div>
</template>

<script>
import AdminTable from "@/components/admin/AdminTable.vue";
import {mapActions, mapState} from "vuex";

export default {
  name: 'AdminAccountsManagement',
  components: {AdminTable},
  data() {
    return {
      title: "Gestion des comptes clients",
      headers: ['Numéro', 'Nom', 'Login', 'Email', 'Image', 'Description', 'Privilege', 'Session'],
      fields: ['_id', 'name', 'login', 'email', 'picture', 'description', 'privilege', 'session'],
      modifyName: 'admin-accounts-edit',
      enableRes: false,
      enableDelete: true,
      dataSource: [],
    };
  },
  computed: {
    ...mapState('account', ['customersAccounts']),
  },
  methods: {
    ...mapActions('account', ['getCustomersAccounts', 'deleteCustomerAccount']),

    async handleDeleteButton(id) {
      if (confirm('Voulez-vous vraiment supprimer ce compte ?')) {
        await this.deleteCustomerAccount(id);
        await this.getCustomersAccounts();
      }
    },
    filterAccounts() {
      this.dataSource = this.customersAccounts;
    }
  },
  async mounted() {
    await this.getCustomersAccounts();
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