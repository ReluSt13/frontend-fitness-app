<template>
    <v-dialog
      v-model="open"
      width="600"
    >
        <template #activator="{ props }">
            <div class="d-flex align-center" style="gap: 8px" v-bind="props">
                <v-icon>mdi-pencil</v-icon>
                <v-list-item-title v-bind="props">Edit</v-list-item-title>
            </div>
        </template>
        <template #default="{ isActive }">
            <post-modal
              :post="post"
              @edit:post="handleSubmit" 
              @close:modal="isActive.value = false"
            ></post-modal>
        </template>
    </v-dialog>
</template>

<script>
import PostModal from './PostModal.vue';
import { Event } from '../utils/constant.js';
export default {
    props: {
        post: {
            type: Object
        }
    },
    components: {
        PostModal
    },
    emits: [Event.EDIT_POST],
    data() {
        return {
            open: false
        }
    },
    watch: {
        isOpen(value) {
            this.open = value;
        }
    },
    methods: {
        handleSubmit(requestBody) {
            this.$emit(Event.EDIT_POST, requestBody);
        }
    }
}
</script>