<template>
    <v-app>
      <SideBar></SideBar>
      <v-main class="d-flex flex-column align-center justify-center">
        <div class="bg-grey-darken-4 rounded-lg w-25">
            <div 
              v-for="(user, index) in leaderboardUsers" 
              :key="user.user.Id"
              class="d-flex align-center pa-5 rounded-lg ma-2"
              :class="getBackgroundClass(index)"
            >
                <span class="mr-2">{{ index + 1}}</span>
                <v-avatar :image="user.user.Avatar" icon="mdi-account" size="60" color="#999"></v-avatar>
                <span class="ml-2 mr-2 text-h5">{{ user.user.UserName }}</span>
                <div class="d-flex flex-grow-1 justify-end">
                    <v-icon color="red" class="mr-2" size="large">mdi-heart</v-icon>
                    <span class="text-body-1">{{ user.feedbackCount }}</span>
                </div>
            </div>
        </div>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import SideBar from "@/components/SideBar.vue";
  import { useAppStore } from "@/store/app.js";
  
  export default {
    components: {
      SideBar
    },
    data() {
      return {
        user: {},
        posts: [],
        leaderboardUsers: []
      };
    },
    async created() {
      this.user = this.appStore.getUser();
      const postsResult = await this.appStore.getPosts();
      if (postsResult.isSuccess) {
        this.posts = postsResult.response;
        // for each post, look at the user who posted it and count the number of feedbacks
        // the leaderboardUsers array should be an array of objects with the following properties:
        // - user: the user object
        // - feedbackCount: the number of feedbacks the user has received
        this.posts.forEach(post => {
          const user = post.User;
          const feedbackCount = post.Feedbacks.length;
          const leaderboardUser = this.leaderboardUsers.find(u => u.user.Id === user.Id);
          if (leaderboardUser) {
            leaderboardUser.feedbackCount += feedbackCount;
          } else {
            this.leaderboardUsers.push({
              user,
              feedbackCount
            });
          }
        });
        // sort the leaderboardUsers array by feedbackCount in descending order
        this.leaderboardUsers.sort((a, b) => b.feedbackCount - a.feedbackCount);
      }
    },
    methods: {
        getBackgroundClass(index) {
            switch (index) {
                case 0:
                    return 'bg-yellow-darken-2';
                case 1:
                    return 'bg-grey-lighten-2';
                case 2:
                    return 'bg-brown-darken-3';
                default:
                    return 'bg-black';
            }
        }
    },
    setup() {
      const appStore = useAppStore();
  
      return {
        appStore,
      };
    },
  };
  </script>
  