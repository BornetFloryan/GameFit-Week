<template>
  <div class="ticketing-view">
    <NavView />
    <TicketingForm />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import NavView from "@/components/NavBar.vue";
import TicketingForm from "@/components/TicketingForm.vue";

export default {
  name: 'TicketingView',
  components: { NavView, TicketingForm },
  data: () => {
    return {
    };
  },
  computed: {
    ...mapState([]),
  },
  methods: {
    ...mapActions([]),
  },
  mounted() {
  }
}
</script>

<style scoped>
</style>