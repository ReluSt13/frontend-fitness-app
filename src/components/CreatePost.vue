<template>
    <v-dialog width="600">
        <template #activator="{ props }">
            <div class="pa-2">
                <v-btn
                  v-bind="props"
                  block
                  class="rounded-pill"
                  color="deep-orange-darken-4"
                >
                  Post
                </v-btn>
            </div>
        </template>

        <template #default="{ isActive }">
            <post-modal @create:post="handleSubmit" @close:modal="isActive.value = false"></post-modal>
        </template>
    </v-dialog>
</template>

<script>
import PostModal from './PostModal.vue';
import { Event } from '../utils/constant.js';
export default {
    components: {
        PostModal
    },
    emits: [Event.CREATE_POST],
    methods: {
        handleSubmit(requestBody) {
            this.$emit(Event.CREATE_POST, requestBody);
        }
    }
}
</script>