<template>
  <v-app>
    <SideBar @create:post="handleCreatePost"></SideBar>
    <v-main class="d-flex flex-column align-center justify-center">
      <h1>Workouts here</h1>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "@/components/SideBar.vue";

export default {
  components: {
    SideBar,
  },
};
</script>
