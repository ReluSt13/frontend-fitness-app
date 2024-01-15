<template>
    <v-container class="bg-grey-darken-4 rounded-lg" style="overflow-y: scroll;">
      <v-row>
          <v-col cols="1">
              <v-btn
                icon="mdi-close"
                density="compact"
                variant="plain"
                @click="handleClose"
              ></v-btn>
          </v-col>
          <v-col cols="9"></v-col>
          <v-col cols="2">
              <v-img src="../assets/new-text-logo.png"></v-img>
          </v-col>
      </v-row>
      <div class="d-flex pt-2" style="gap: 8px">
          <v-avatar :image="user.avatar" icon="mdi-account" size="50" color="#999"></v-avatar>
          <v-textarea
              v-model="commentContent"
              :rules="textAreaRules"
              variant="filled"
              auto-grow
              placeholder="Leave a comment :)"
              rows="4"
              row-height="30"
              shaped
          ></v-textarea>
      </div>
      <v-row>
          <v-col cols="8">
              <v-img src="../assets/another-text-logo.png" height="30" width="120"></v-img>
          </v-col>
          <v-col cols="4" class="d-flex justify-end">
              <v-btn
                color="deep-orange"
                :disabled="!canSubmit"
                @click="handleSubmit"
              >
                {{ btnText }}
              </v-btn>
          </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { useAppStore } from '../store/app.js';
  import { Event } from '../utils/constant.js';
  
  export default {
      props: {
          comment: {
              type: Object
          },
          post: {
              type: Object
          },
          update: {
              type: Boolean,
              default: false
          }
      },
      emits: [Event.CLOSE_MODAL, Event.CREATE_COMMENT, Event.EDIT_COMMENT],
      data() {
          return {
              commentContent: undefined,
              postId: undefined,
              btnText: 'Comment',
              textAreaRules: [
                (value) => {
                    if (!value) {
                        return 'Please enter some content.';
                    } else {
                        return true;
                    }
                },
                (value) => {
                    if (value && value.length > 1024) {
                        return 'Content must be less than 1024 characters.';
                    } else {
                        return true;
                    }
                }
            ]
          }
      },
      mounted() {
          this.postId = this.post.Id;
          if (this.update) {
              this.btnText = 'Edit';
              this.commentContent = this.comment.Content;
          }
      },
      computed: {
          canSubmit() {
              return this.commentContent && this.commentContent.length > 0 && this.textAreaRules[0](this.commentContent) === true && this.textAreaRules[1](this.commentContent) === true;
          }
      },
      methods: {
          handleClose() {
              this.$emit(Event.CLOSE_MODAL);
          },
          handleSubmit() {
              const requestBody = {}
              requestBody.postId = this.postId;
              requestBody.content = this.commentContent;

              if (this.update) {
                requestBody.commentId = this.comment.Id;
                this.$emit(Event.EDIT_COMMENT, requestBody);
              } else {
                  this.$emit(Event.CREATE_COMMENT, requestBody);
              }
              this.$emit(Event.CLOSE_MODAL);
          }
      },
      setup() {
          const appStore = useAppStore();
  
          return {
              user: appStore.getUser()
          }
      }
  }
  </script>