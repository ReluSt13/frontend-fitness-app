<template>
  <v-app>
    <SideBar @create:post="handleCreatePost"></SideBar>
    <v-main class="d-flex flex-column align-center justify-center">
      <SocialPost
        v-for="post in posts"
        :key="post.id"
        :post="post"
        style="max-width: 600px"
        @delete:post="handleDeletePost"
        @edit:post="handleEditPost"
        @create:feedback="handleCreateFeedback"
        @delete:feedback="handleDeleteFeedback"
        @create:comment="handleCreateComment"
        @delete:comment="handleDeleteComment"
        @edit:comment="handleEditComment"
      ></SocialPost>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import SocialPost from "@/components/SocialPost.vue";
import { useAppStore } from "@/store/app.js";

export default {
  components: {
    SideBar,
    SocialPost,
  },
  data() {
    return {
      user: {},
      posts: [],
    };
  },
  async created() {
    this.user = this.appStore.getUser();
    const postsResult = await this.appStore.getPosts();
    if (postsResult.isSuccess) {
      this.posts = postsResult.response;
      console.log(this.posts);
    }
  },
  methods: {
    async handleDeletePost(post) {
      const result = await this.appStore.deletePost(post.Id);
      if (result.isSuccess) {
        this.posts = this.posts.filter((p) => p.Id !== post.Id);
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
        const index = this.posts.findIndex((p) => p.Id === requestBody.postId);
        this.posts[index].Content = requestBody.content;
        this.posts[index].Image = requestBody.image;
      }
    },
    async handleCreateFeedback(postId) {
      const result = await this.appStore.createFeedback({
        postId: postId,
        value: true,
      });
      if (result.isSuccess) {
        const index = this.posts.findIndex((p) => p.Id === postId);
        this.posts[index].Feedbacks.push(result.response);
      }
    },
    async handleDeleteFeedback(postId) {
      const result = await this.appStore.deleteFeedback(postId);
      if (result.isSuccess) {
        const index = this.posts.findIndex((p) => p.Id === postId);
        this.posts[index].Feedbacks = this.posts[index].Feedbacks.filter(
          (f) => f.UserId !== this.user.id
        );
      }
    },
    async handleCreateComment(requestBody) {
      const result = await this.appStore.createComment(requestBody);
      if (result.isSuccess) {
        const index = this.posts.findIndex((p) => p.Id === requestBody.postId);
        this.posts[index].Comments.push(result.response);
      }
    },
    async handleDeleteComment(comment) {
      const result = await this.appStore.deleteComment(comment.Id);
      if (result.isSuccess) {
        const index = this.posts.findIndex((p) => p.Id === comment.PostId);
        this.posts[index].Comments = this.posts[index].Comments.filter(
          (c) => c.Id !== comment.Id
        );
      }
    },
    async handleEditComment(requestBody) {
      const result = await this.appStore.editComment(requestBody);
      if (result.isSuccess) {
        const index = this.posts.findIndex((p) => p.Id === requestBody.postId);
        const commentIndex = this.posts[index].Comments.findIndex(
          (c) => c.Id === requestBody.commentId
        );
        this.posts[index].Comments[commentIndex].Content = requestBody.content;
      }
    },
  },
  setup() {
    const appStore = useAppStore();

    return {
      appStore,
    };
  },
};
</script>
