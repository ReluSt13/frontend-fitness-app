<template>
  <v-app>
    <SideBar @create:post="handleCreatePost"></SideBar>
    <v-main class="d-flex flex-column align-center justify-center">
      <SocialPost
        v-for="post in posts"
        :key="post.id"
        :post="post"
        style="max-width: 600px;"
        @delete:post="handleDeletePost"
        @edit:post="handleEditPost"
      ></SocialPost>
    </v-main>
  </v-app>
</template>

<script>
  import SideBar from '@/components/SideBar.vue'
  import SocialPost from '@/components/SocialPost.vue'
  import { useAppStore } from '@/store/app.js'

  export default {
    components: {
      SideBar,
      SocialPost
    },
    data() {
      return {
        user: {},
        posts: []
      }
    },
    async created() {
      this.user = this.appStore.getUser();
      const postsResult = await this.appStore.getPosts();
      if (postsResult.isSuccess) {
        this.posts = postsResult.response;
      }
    },
    methods: {
      async handleDeletePost(post) {
        const result = await this.appStore.deletePost(post.Id);
        if (result.isSuccess) {
          this.posts = this.posts.filter(p => p.Id !== post.Id);
        }
      },
      async handleCreatePost(requestBody) {
        const result = await this.appStore.createPost(requestBody);
        if (result.isSuccess) {
          this.posts.unshift(result.response);
        }
      },
      async handleEditPost(requestBody) {
        const result = await this.appStore.editPost(requestBody);
        if (result.isSuccess) {
          const index = this.posts.findIndex(p => p.Id === requestBody.postId);
          this.posts[index].Content = requestBody.content;
          this.posts[index].Image = requestBody.image;
        }
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
