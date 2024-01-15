<template>
    <v-container class="bg-grey-darken-4 rounded-lg">
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
        <v-text-field
            :rules="avatarRule"
            v-model="newAvatar"
            placeholder="New avatar URL"
            validate-on="blur"
        ></v-text-field>
      </div>
      <v-row>
          <v-col cols="7">
              <v-img src="../assets/another-text-logo.png" height="30" width="120"></v-img>
          </v-col>
          <v-col cols="5" class="d-flex justify-end">
              <v-btn
                color="deep-orange"
                :disabled="!canSubmit"
                @click="handleSubmit"
              >
                Update Avatar
              </v-btn>
          </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { useAppStore } from '../store/app.js';
  import { Event } from '../utils/constant.js';
  
  export default {
      emits: [Event.CLOSE_MODAL, Event.UPDATE_AVATAR],
      data() {
          return {
            newAvatar: undefined,
            avatarRule: [
                (value) => {
                    const pattern = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
                    if (!pattern.test(value)) {
                        return 'Invalid URL. Please enter a URL that points to an image.';
                    } else {
                        return true;
                    }
                }
            ]
          }
      },
      computed: {
            canSubmit() {
                return this.newAvatar && this.avatarRule[0](this.newAvatar) === true;
            }
      },
      methods: {
          handleClose() {
              this.$emit(Event.CLOSE_MODAL);
          },
          handleSubmit() {
            if (this.newAvatar && this.newAvatar !== this.user.avatar && this.avatarRule[0](this.newAvatar) === true) {
                this.$emit(Event.UPDATE_AVATAR, this.newAvatar);
            }
          }
      },
      setup() {
          const appStore = useAppStore();
          const user = appStore.getUser();
          return {
              appStore,
              user
          }
      }
  }
  </script>