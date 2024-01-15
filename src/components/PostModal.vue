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
            v-model="postContent"
            :rules="textAreaRules"
            variant="filled"
            auto-grow
            placeholder="What's on your mind?"
            rows="4"
            row-height="30"
            shaped
        ></v-textarea>
    </div>
    <v-row>
        <v-col cols="12" class="d-flex justify-end">
            <v-text-field
                :rules="imageRule"
                v-model="postImage" 
                :clearable="true"
                density="compact"
                placeholder="Share an image"
                prepend-inner-icon="mdi-image-outline"
                validate-on="blur"
                style="max-width: 510px;"
            ></v-text-field>
        </v-col>
    </v-row>
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
        post: {
            type: Object
        }
    },
    emits: [Event.CLOSE_MODAL, Event.CREATE_POST, Event.EDIT_POST],
    data() {
        return {
            postContent: undefined,
            postImage: undefined,
            postId: undefined,
            btnText: 'Post',
            imageRule: [
                (value) => {
                    const pattern = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
                    if (!pattern.test(value)) {
                        return 'Invalid URL. Please enter a URL that points to an image.';
                    } else {
                        return true;
                    }
                }
            ],
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
        if (this.post) {
            this.btnText = 'Edit';
            this.postContent = this.post.Content;
            this.postImage = this.post.Image;
            this.postId = this.post.Id;
        }
    },
    computed: {
        canSubmit() {
            return this.postContent && this.postContent.length > 0 && (!this.postImage || this.imageRule[0](this.postImage) === true) && this.textAreaRules[0](this.postContent) === true && this.textAreaRules[1](this.postContent) === true;
        }
    },
    methods: {
        handleClose() {
            this.$emit(Event.CLOSE_MODAL);
        },
        handleSubmit() {
            const requestBody = {}
            if (this.postContent) {
                requestBody.content = this.postContent;
            }
            if (this.postImage) {
                requestBody.image = this.postImage;
            }
            if (this.postId) {
                requestBody.postId = this.postId;
            }
            if (requestBody.postId) {
                this.$emit(Event.EDIT_POST, requestBody);
            } else {
                this.$emit(Event.CREATE_POST, requestBody);
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