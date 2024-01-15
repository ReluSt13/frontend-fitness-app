<template>
    <v-navigation-drawer
      theme="dark"
      :width="drawerWidth"
    >
      <v-divider></v-divider>
      <v-container class="d-flex flex-column align-center">
        <v-dialog width="600">
          <template #activator="{ props }">
            <v-avatar
              class="hover"
              :image="user?.avatar" 
              icon="mdi-account" 
              size="100" 
              color="#999"
              v-bind="props"
            ></v-avatar>
          </template>
          <template #default="{ isActive }">
            <update-avatar-modal
              @update:avatar="handleUpdateAvatar"
              @close:modal="isActive.value = false"
            ></update-avatar-modal>
          </template>
        </v-dialog>
        <div class="text-body-1 mt-2">
          Welcome, <span class="text-deep-orange-darken-2 mr-1">{{ user?.name }}</span>
          <v-icon v-if="isVerified" size="x-small" color="deep-orange-darken-2">mdi-check-decagram</v-icon>
        </div>
          
      </v-container>
      <v-divider></v-divider>

    <create-post
      v-if="!isDrawerExpanded"
      :verified="isVerified" @create:post="handleCreatePost"
    ></create-post>

    <router-link v-if="isOnHomeRoute && !isDrawerExpanded" to="/workouts">
      <v-btn block variant="text">Workouts</v-btn>
    </router-link>

    <router-link v-if="!isOnHomeRoute && !isDrawerExpanded" to="/">
      <v-btn block variant="text">Home</v-btn>
    </router-link>

    <create-workout
      v-if="isDrawerExpanded"
      @workout-submitted="handleWorkoutSubmitted"
      @cancelWorkout="toggleExpandDrawer"
    ></create-workout>

    <v-btn
      v-if="!isDrawerExpanded"
      block
      class="rounded-pill"
      color="deep-orange-darken-4"
      variant="text"
      @click.stop="toggleExpandDrawer"
    >
      New workout
    </v-btn>

    <template v-slot:append>
      <div class="pl-2 pr-2">
            <v-btn
              v-if="!isVerified"
              class="mb-2"
              block
              color="light-blue-darken-2"
              @click="handleGetVerified"
            >
              Get verified
            </v-btn>
        <v-btn block variant="outlined" @click="handleLogout"> Logout </v-btn>
      </div>
      <div class="d-flex justify-center mt-2">
        <div class="text-caption font-weight-thin">
          &copy;FitnessWellness - 2024
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { useAppStore } from "../store/app.js";
import CreatePost from "./CreatePost.vue";
import CreateWorkout from "./CreateWorkout.vue";
import UpdateAvatarModal from "./UpdateAvatarModal.vue";
import { Event } from "../utils/constant.js";
export default {
  components: {
    CreatePost,
    CreateWorkout,
    UpdateAvatarModal
  },
  emits: [Event.CREATE_POST],
  data() {
    return {
      user: undefined,
      drawerWidth: 300,
      isDrawerExpanded: false,
    }
  },
  computed: {
      isVerified() {
        return this.user?.roles?.includes('Verified');
      },
      isOnHomeRoute() {
        return this.$route.name === "Home";
      }
  },
  mounted() {
    this.user = this.appStore.getUser();
  },
  methods: {
    handleLogout() {
      this.appStore.logout();
      this.$router.push({ name: "Login" });
    },
    async handleGetVerified() {
        const response = await this.appStore.verifyUser();
        if (response.isSuccess) {
          this.appStore.logout();
          this.$router.push({ name: 'Login' });
          this.appStore.snackbarInfo = {
            message: 'You are now verified. Please log in again.',
            color: 'success'
          }
          this.appStore.openSnackbar(true);
        }
    },
    handleCreatePost(requestBody) {
      this.$emit(Event.CREATE_POST, requestBody);
    },
    toggleExpandDrawer() {
      this.isDrawerExpanded = !this.isDrawerExpanded;
      this.drawerWidth = this.isDrawerExpanded ? 600 : 300;
      this.rail = !this.isDrawerExpanded;
    },
    async handleUpdateAvatar(newAvatar) {
      const result = await this.appStore.updateAvatar({ avatar: newAvatar });
      if (result.isSuccess) {
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
      appStore,
    };
  }
};
</script>

<style>
.hover:hover {
  cursor: pointer;
  transform: scale(1.1);
  transition: transform 0.2s;
}
</style>