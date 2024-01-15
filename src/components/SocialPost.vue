<template>
  <v-container style="border: 1px solid rgb(47, 51, 54)">
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="10"
        ><v-row>
          <v-col class="d-flex justify-center" cols="1">
            <v-avatar
              :image="post.User.Avatar"
              icon="mdi-account"
              size="50"
              color="#999"
            ></v-avatar>
          </v-col>
          <v-col class="pl-5" cols="11">
            <div class="d-flex">
              <div
                class="text-body-1 font-weight-light mr-1 text-deep-orange-darken-3"
              >
                {{ post.User.UserName }}
              </div>
              <v-tooltip
                :text="formatLongDate(post.DateAdded)"
                bottom
                contained
              >
                <template v-slot:activator="{ props }">
                  <div
                    class="text-grey-darken-1"
                    :style="{ fontSize: 'smaller' }"
                    v-bind="props"
                  >
                    • {{ formatShortDate(post.DateAdded) }}
                  </div>
                </template>
              </v-tooltip>
              <div class="d-flex flex-grow-1 justify-end">
                <v-menu :close-on-content-click="true">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      density="compact"
                      icon="mdi-dots-horizontal"
                      variant="plain"
                    ></v-btn>
                  </template>
                  <v-list elevation="10">
                    <v-list-item
                      v-for="(item, index) in items"
                      :key="index"
                      :base-color="item.color"
                      density="compact"
                      :disabled="item.disabled"
                      :slim="true"
                      :value="index"
                      @click="item.action"
                    >
                      <template #prepend v-if="item.title !== 'Edit'">
                        <v-icon :color="item.color">{{ item.icon }}</v-icon>
                      </template>
                      <v-list-item-title v-if="item.title !== 'Edit'">{{
                        item.title
                      }}</v-list-item-title>
                      <edit-post
                        v-else
                        :post="post"
                        @edit:post="handleEditPost"
                      ></edit-post>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </div>

            <div
              class="text-body-2 font-weight-light mb-1"
              style="word-break: break-all"
            >
              {{ post.Content }}
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-img
            v-if="post.Image"
            class="rounded-lg"
            :src="post.Image"
            style="max-width: 512px"
          ></v-img>
        </v-row>

        <v-row>
          <div class="d-flex mt-2 mb-2">
            <div class="d-flex align-center mr-4">
              <v-btn
                class="mr-1"
                density="compact"
                :icon="liked ? 'mdi-heart' : 'mdi-heart-outline'"
                :color="liked ? 'red' : undefined"
                variant="plain"
                @click="liked ? handleDeleteFeedback() : handleCreateFeedback()"
              ></v-btn>
              <v-menu
                v-if="post?.Feedbacks?.length"
                :contained="true"
                :open-on-hover="true"
              >
                <template v-slot:activator="{ props }">
                  <span v-bind="props" class="text-caption">{{
                    this.post.Feedbacks.length
                  }}</span>
                </template>
                <v-list>
                  <v-list-item
                    v-for="feedback in post.Feedbacks"
                    :key="feedback.UserId"
                    :title="feedback.UserName"
                  >
                    <template #prepend>
                      <v-avatar
                        :image="feedback.User?.Avatar"
                        icon="mdi-account"
                        size="40"
                        color="#999"
                      ></v-avatar>
                    </template>
                  </v-list-item>
                </v-list>
              </v-menu>
              <span v-else class="text-caption">0</span>
            </div>
            <div class="d-flex align-center">
              <create-comment
                :post="post"
                @create:comment="handleCreateComment"
              ></create-comment>
              <span class="text-caption">{{
                this.post.Comments?.length || 0
              }}</span>
            </div>
          </div>
        </v-row>
      </v-col>
    </v-row>
    <v-row style="margin-top: 0 !important">
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <social-comment
          v-for="comment in post.Comments"
          :key="comment.Id"
          :comment="comment"
          :post="post"
          class="mb-1"
          @delete:comment="handleDeleteComment"
          @edit:comment="handleEditComment"
        ></social-comment>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useAppStore } from "../store/app.js";
import { Event } from "../utils/constant.js";
import EditPost from "./EditPost.vue";
import SocialComment from "./SocialComment.vue";
import CreateComment from "./CreateComment.vue";
import { formatShortDate, formatLongDate } from "../utils/function.js";

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  components: {
    CreateComment,
    EditPost,
    SocialComment,
  },
  emits: [
    Event.DELETE_POST,
    Event.EDIT_POST,
    Event.CREATE_FEEDBACK,
    Event.DELETE_FEEDBACK,
    Event.CREATE_COMMENT,
    Event.DELETE_COMMENT,
    Event.EDIT_COMMENT,
  ],
  data() {
    return {
      user: undefined,
      editModalOpen: false,
      items: [],
    };
  },
  computed: {
    isOwner() {
      return this.user.id === this.post.UserId;
    },
    isAdmin() {
      return this.user?.roles?.includes("Admin");
    },
    liked() {
      return (
        this.post.Feedbacks &&
        this.post.Feedbacks.length > 0 &&
        !!this.post.Feedbacks.find((f) => f.UserId === this.user?.id)
      );
    },
  },
  mounted() {
    this.user = this.appStore.getUser();
    if (this.isOwner) {
      this.items.push({
        title: "Edit",
        icon: "mdi-pencil",
      });
      this.items.push({
        title: "Delete",
        action: this.handleDeletePost,
        icon: "mdi-delete",
        color: "red-accent-4",
      });
    } else {
      this.items.push({
        title: "Report (Coming soon)",
        action: this.handleReportPost,
        icon: "mdi-flag",
        disabled: true,
      });
    }
    if (this.isAdmin) {
      this.items.push({
        title: "Delete (Admin)",
        action: this.handleDeletePost,
        icon: "mdi-delete",
        color: "red-darken-4",
      });
    }
  },
  methods: {
    handleDeletePost() {
      this.$emit(Event.DELETE_POST, this.post);
    },
    handleEditPost(requestBody) {
      this.$emit(Event.EDIT_POST, requestBody);
    },
    handleCreateFeedback() {
      this.$emit(Event.CREATE_FEEDBACK, this.post.Id);
    },
    handleDeleteFeedback() {
      this.$emit(Event.DELETE_FEEDBACK, this.post.Id);
    },
    handleCreateComment(requestBody) {
      this.$emit(Event.CREATE_COMMENT, requestBody);
    },
    handleDeleteComment(comment) {
      this.$emit(Event.DELETE_COMMENT, comment);
    },
    handleEditComment(requestBody) {
      this.$emit(Event.EDIT_COMMENT, requestBody);
    },
  },
  setup() {
    const appStore = useAppStore();

    return {
      appStore,
      formatShortDate,
      formatLongDate,
    };
  },
};
</script>
