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
import { useAppStore } from "@/store/app";

export default {
  components: {
    SideBar,
  },
  setup() {
      const appStore = useAppStore();

      return {
        appStore
      }
    }
};
</script>
