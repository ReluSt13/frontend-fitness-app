<template>
    <v-container style="border: 1px solid rgb(47, 51, 54)">
        <v-row>
            <v-col 
              class="d-flex justify-center"
              cols="1"
            >
                <v-avatar :image="post.User.Avatar" icon="mdi-account" size="50" color="#999"></v-avatar>
            </v-col>
            <v-col cols="11">
                <div class="d-flex">
                    <div class="text-body-1 font-weight-light mr-1">{{ post.User.UserName }}</div>
                    <v-tooltip
                      :text="formatLongDate(post.DateAdded)"
                      bottom
                      contained
                    >
                        <template v-slot:activator="{ props }">
                            <div 
                                class="text-grey-darken-1" 
                                :style="{fontSize: 'smaller'}" 
                                v-bind="props" 
                            >
                                • {{ formatShortDate(post.DateAdded) }}
                            </div>
                        </template>
                    </v-tooltip>
                    <div class="d-flex flex-grow-1 justify-end">
                        <v-menu :close-on-content-click="false">
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
                                    :slim="true"
                                    :value="index"
                                    @click="item.action"
                                >
                                    <template #prepend v-if="item.title !== 'Edit'">
                                        <v-icon :color="item.color">{{ item.icon }}</v-icon>
                                    </template>
                                    <v-list-item-title v-if="item.title !== 'Edit'">{{ item.title }}</v-list-item-title>
                                    <edit-post v-else :post="post" @edit:post="handleEditPost"></edit-post>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                </div>
                <div class="text-body-2 font-weight-light mb-1">{{ post.Content }}</div>
                <v-img
                  v-if="post.Image"
                  class="rounded-lg"
                  :src="post.Image"
                  style="max-width: 512px;"
                ></v-img>
                <div class="d-flex mt-1">
                    <div class="d-flex align-center mr-4">
                        <v-btn
                          density="compact"
                          icon="mdi-heart-outline"
                          variant="plain"
                        ></v-btn>
                        <span class="text-caption">69</span>
                    </div>
                    <div class="d-flex align-center">
                        <v-btn
                          density="compact"
                          icon="mdi-comment-outline"
                          variant="plain"
                        ></v-btn>
                        <span class="text-caption">420</span>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
import { useAppStore } from '../store/app.js';
import { Event } from '../utils/constant.js';
import EditPost from './EditPost.vue';

export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    components: {
        EditPost
    },
    emits: [Event.DELETE_POST],
    data() {
        return {
            user: undefined,
            editModalOpen: false,
            items: []
        }
    },
    computed: {
        isOwner() {
            return this.user?.id === this.post.User.Id;
        }
    },
    mounted() {
        this.user = this.appStore.getUser();
        if (this.isOwner) {
            this.items.push({
                title: 'Edit',
                icon: 'mdi-pencil'
            });
            this.items.push({
                title: 'Delete',
                action: this.handleDeletePost,
                icon: 'mdi-delete',
                color: 'red-accent-4'
            });
        } else {
            this.items.push({
                title: 'Report',
                action: this.handleReportPost,
                icon: 'mdi-flag'
            });
        }
    },
    methods: {
        formatShortDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleString('en-US', { month: 'short', day: '2-digit' });
        },
        formatLongDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + ' - ' + 
                date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
        },
        handleDeletePost() {
            this.$emit(Event.DELETE_POST, this.post);
        },
        handleEditPost(requestBody) {
            this.$emit(Event.EDIT_POST, requestBody);
        }
    },
    setup() {
        const appStore = useAppStore();

        return {
            appStore
        }
    }
}
</script>