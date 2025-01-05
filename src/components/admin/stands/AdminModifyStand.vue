<template>
  <div v-if="stand">
    <AdminForm
        :title="'Modifier ' + stand.name"
        backButtonText="Retour"
        submitButtonText="Modifier"
        cancelButtonText="Annuler"
        :formFields="[
    {
      _id: 'price',
      label: 'Prix',
      type: 'number',
      model: 'price',
      props: {
        required: true,
      },
    }
  ]"
        :initialFormData="{ price: stand.price }"
        @submit="handleModifyStand"
        @back="goBack"
    />
  </div>
</template>

<script>
import AdminForm from '../AdminForm.vue';
import {mapActions, mapGetters, mapState} from 'vuex';

export default {
  name: 'AdminModifyStand',
  components: { AdminForm: AdminForm },
  data() {
    return {
      stand: null,
    };
  },
  computed: {
    ...mapState('stands', ['stands']),
    ...mapGetters('stands', ['getStandById']),
  },
  methods: {
    ...mapActions('stands', ['modifyStand']),
    async handleModifyStand(formData) {
      const updatedStand = {
        ...this.stand,
        price: formData.price,
      };
      await this.modifyStand(updatedStand);

      await this.$router.push('/admin-dashboard/admin-stand-management/');
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.stand = this.getStandById(this.$route.params.item_id);
  },
};
</script>
