<template>
  <div v-if="stand">
    <AdminStandForm
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
import AdminStandForm from './AdminStandForm.vue';
import {mapActions, mapState} from 'vuex';

export default {
  name: 'AdminModifyStand',
  components: { AdminStandForm },
  data() {
    return {
      stand: null,
    };
  },
  computed: {
    ...mapState('stands', ['stands']),
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
    this.stand = this.stands.find((stand) => stand._id === this.$route.params.item_id);
  },
};
</script>
