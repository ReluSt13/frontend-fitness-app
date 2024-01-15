<template>
  <v-dialog width="600">
    <template #activator="{ props }">
      <div class="pa-2">
        <v-btn
          v-bind="props"
          block
          class="rounded-pill"
          color="deep-orange-darken-4"
          :disabled="!isOnHomeRoute"
        >
          Post
        </v-btn>
      </div>
    </template>

    <template #default="{ isActive }">
      <post-modal
        v-if="verified"
        @create:post="handleSubmit"
        @close:modal="isActive.value = false"
      ></post-modal>
      <v-alert
        v-else
        color="deep-orange-darken-4"
        dark
        elevation="2"
        icon="mdi-alert-circle-outline"
        outlined
        prominent
      >
        <span class="text-body-1 font-weight-light"
          >You must be verified to post. Please use the 'Get verified'
          button!</span
        >
      </v-alert>
    </template>
  </v-dialog>
</template>

<script>
import PostModal from "./PostModal.vue";
import { Event } from "../utils/constant.js";
export default {
  props: {
    verified: {
      type: Boolean,
    },
  },
  components: {
    PostModal,
  },
  emits: [Event.CREATE_POST],
  computed: {
    isOnHomeRoute() {
      return this.$route.name === "Home";
    },
  },
  methods: {
    handleSubmit(requestBody) {
      this.$emit(Event.CREATE_POST, requestBody);
    },
  },
};
</script>
