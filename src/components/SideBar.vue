<template>
  <v-navigation-drawer :width="drawerWidth" theme="dark" permanent>
    <v-divider></v-divider>
    <v-container class="d-flex flex-column align-center">
      <v-avatar
        :image="user?.avatar"
        icon="mdi-account"
        size="100"
        color="#999"
      ></v-avatar>
      <div class="text-body-1 mt-2">
        Welcome,
        <span class="text-deep-orange-darken-2">{{ user?.name }}</span>
        ({{ user?.roles }})
      </div>
    </v-container>

    <v-divider></v-divider>

    <create-post
      v-if="!isDrawerExpanded"
      @create:post="handleCreatePost"
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
      New workout</v-btn
    >

    <template v-slot:append>
      <div class="pl-2 pr-2">
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
import { Event } from "../utils/constant.js";
export default {
  components: {
    CreatePost,
    CreateWorkout,
  },
  emits: [Event.CREATE_POST],
  data() {
    return {
      user: undefined,
      drawerWidth: 300,
      isDrawerExpanded: false,
    };
  },
  mounted() {
    this.user = this.appStore.getUser();
  },
  methods: {
    handleLogout() {
      this.appStore.logout();
      this.$router.push({ name: "Login" });
    },
    handleCreatePost(requestBody) {
      this.$emit(Event.CREATE_POST, requestBody);
    },
    toggleExpandDrawer() {
      this.isDrawerExpanded = !this.isDrawerExpanded;
      this.drawerWidth = this.isDrawerExpanded ? 600 : 300;
      this.rail = !this.isDrawerExpanded;
    },
  },
  setup() {
    const appStore = useAppStore();

    return {
      appStore,
    };
  },
  computed: {
    isOnHomeRoute() {
      return this.$route.name === "Home";
    },
  },
};
</script>
