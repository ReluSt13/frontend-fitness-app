<template>
  <v-responsive class="align-center text-center">
    <v-img height="300" src="../assets/bright-logo.png" />
    <v-img height="80" src="../assets/text-logo.png" />

    <v-avatar :image="user?.avatar" icon="mdi-account" size="x-large" color="#999"></v-avatar>
    <div class="text-body-2 font-weight-light">Welcome, {{ user?.name }} ({{ user?.roles }})</div>
    <v-form v-model="avatarFormStatus" @submit.prevent="updateAvatar" class="mb-4">
      <v-text-field
        :rules="avatarRule"
        v-model="newAvatar" 
        label="New avatar URL"
        validate-on="blur"
      ></v-text-field>
      <v-btn type="submit" :disabled="!avatarFormStatus">Update Avatar</v-btn>
    </v-form>

    <v-btn v-if="appStore.isLoggedIn()" @click="handleLogout">Log out</v-btn>

    <v-btn @click="appStore.testRoles">Test Roles</v-btn>
  </v-responsive>
</template>

<script>
import { useAppStore } from '../store/app.js';
export default {
  data() {
    return {
      user: undefined,
      newAvatar: undefined,
      avatarFormStatus: undefined,
      avatarRule: [
        (value) => {
          const pattern = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
          if (!pattern.test(value)) {
            return 'Invalid URL. Please enter a URL that points to an image.';
          } else {
            return true;
          }
        }
      ]
    }
  },
  mounted() {
    this.user = this.appStore.getUser();
  },
  methods: {
    handleLogout() {
     this.appStore.logout();
     this.$router.push({ name: 'Login' });
    },
    async updateAvatar() {
      const result = await this.appStore.updateAvatar({ avatar: this.newAvatar });
      if (result.isSuccess) {
        this.newAvatar = undefined;
        this.appStore.logout();
        this.$router.push({ name: 'Login' });
        this.appStore.snackbarInfo = {
          message: 'Avatar updated. Please log in again.',
          color: 'success'
        }
        this.appStore.openSnackbar(true);
      }
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