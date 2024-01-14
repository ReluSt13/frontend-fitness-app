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
                        <v-menu>
                            <template v-slot:activator="{ props }">
                                <v-btn
                                  v-bind="props"
                                  density="compact"
                                  icon="mdi-dots-horizontal"
                                  variant="plain"
                                ></v-btn>
                            </template>
                            <v-list>
                                <v-list-item
                                    v-for="(item, index) in items"
                                    :key="index"
                                    :value="index"
                                >
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
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
export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    emits: [Event.DELETE_POST],
    data() {
        return {
            user: undefined,
            items: [
                { title: 'Click Me' },
                { title: 'Click Me' },
                { title: 'Click Me' },
                { title: 'Click Me 2' },
            ]
        }
    },
    computed: {
        isOwner() {
            return this.user?.id === this.post.User.Id;
        }
    },
    mounted() {
        this.user = this.appStore.getUser();
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
            this.$emit('delete:post', this.post);
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