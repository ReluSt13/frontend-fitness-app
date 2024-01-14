<template>
    <v-dialog width="600">
        <template #activator="{ props }">
            <v-btn
                v-bind="props"
                class="mr-1"
                density="compact"
                icon="mdi-comment-plus-outline"
                variant="plain"
            ></v-btn>
        </template>

        <template #default="{ isActive }">
            <comment-modal :post="post" @create:comment="handleSubmit" @close:modal="isActive.value = false"></comment-modal>
        </template>
    </v-dialog>
</template>

<script>
import CommentModal from './CommentModal.vue';
import { Event } from '../utils/constant.js';
export default {
    components: {
        CommentModal
    },
    props: {
        post: {
            type: Object
        }
    },
    emits: [Event.CREATE_COMMENT],
    methods: {
        handleSubmit(requestBody) {
            this.$emit(Event.CREATE_COMMENT, requestBody);
        }
    }
}
</script>