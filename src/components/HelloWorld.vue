<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-img height="300" src="../assets/bright-logo.png" />
      <v-img height="80" src="../assets/text-logo.png" />

      <div class="text-body-2 font-weight-light">Welcome, {{ user?.name }} ({{ user?.roles }})</div>

      <v-btn v-if="appStore.isLoggedIn()" @click="handleLogout">Log out</v-btn>

      <v-btn @click="appStore.testRoles">Test Roles</v-btn>
    </v-responsive>
  </v-container>
</template>

<script>
import { useAppStore } from '../store/app.js';
export default {
  data() {
    return {
      user: undefined
    }
  },
  mounted() {
    this.user = this.appStore.getUser();
  },
  methods: {
    handleLogout() {
     this.appStore.logout();
     this.$router.push({ name: 'Login' });
    }
  },
  setup() {
    const appStore = useAppStore();
    return {
      appStore
    };
  }
}
</script>
