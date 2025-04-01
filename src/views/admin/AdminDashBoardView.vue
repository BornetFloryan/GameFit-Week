<template>
  <div class="admin-dashboard-container">
    <AdminSideBar />
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AdminSideBar from "@/components/admin/AdminSideBar.vue";

export default {
  name: 'DashBoardView',
  components: { AdminSideBar },
};
</script>

<style scoped>
.admin-dashboard-container {
  display: flex;
  height: 100vh;
}

.main-content {
  padding: 20px;
}
</style>