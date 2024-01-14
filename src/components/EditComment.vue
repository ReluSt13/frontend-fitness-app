<template>
    <v-dialog width="600">
        <template #activator="{ props }">
            <div class="d-flex align-center" style="gap: 8px" v-bind="props">
                <v-icon>mdi-pencil</v-icon>
                <v-list-item-title>Edit</v-list-item-title>
            </div>
        </template>

        <template #default="{ isActive }">
            <comment-modal
              :comment="comment"
              :post="post"
              :update="true" 
              @edit:comment="handleSubmit" 
              @close:modal="isActive.value = false"
            ></comment-modal>
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
        },
        comment: {
            type: Object
        }
    },
    emits: [Event.EDIT_COMMENT],
    methods: {
        handleSubmit(requestBody) {
            this.$emit(Event.EDIT_COMMENT, requestBody);
        }
    }
}
</script>