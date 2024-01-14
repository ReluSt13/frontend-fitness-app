<template>
    <v-navigation-drawer
      theme="dark"
      permanent
    >
        <v-divider></v-divider>
        <v-container class="d-flex flex-column align-center">
            <v-avatar :image="user?.avatar" icon="mdi-account" size="100" color="#999"></v-avatar>
            <div class="text-body-1 mt-2">Welcome, <span class="text-deep-orange-darken-2">{{ user?.name }}</span> ({{ user?.roles }})</div>
        </v-container>
        <v-divider></v-divider>

        <create-post @create:post="handleCreatePost"></create-post>

        <v-list color="transparent">
          <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard"></v-list-item>
          <v-list-item prepend-icon="mdi-account-box" title="Account"></v-list-item>
          <v-list-item prepend-icon="mdi-gavel" title="Admin"></v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pl-2 pr-2">
            <v-btn
              block
              variant="outlined"
              @click="handleLogout"
            >
              Logout
            </v-btn>
          </div>
          <div class="d-flex justify-center mt-2">
            <div class="text-caption font-weight-thin">&copy;FitnessWellness - 2024</div>
          </div>
        </template>
      </v-navigation-drawer>
</template>

<script>
import { useAppStore } from '../store/app.js';
import CreatePost from './CreatePost.vue';
import { Event } from '../utils/constant.js';
export default {
    components: {
        CreatePost
    },
    emits: [Event.CREATE_POST],
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
        },
        handleCreatePost(requestBody) {
            this.$emit(Event.CREATE_POST, requestBody);
        }
    },
    setup() {
        const appStore = useAppStore();

        return {
            appStore
        }
    }
}
</script>