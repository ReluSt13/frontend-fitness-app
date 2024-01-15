<template>
    <v-container class="justify-end" style="border: 1px solid rgb(47, 51, 54); padding: 8px 8px 8px 24px !important">
        <v-row>
            <v-col 
              class="d-flex justify-center"
              cols="1"
            >
                <v-avatar :image="comment.User?.Avatar" icon="mdi-account" size="40" color="#999"></v-avatar>
            </v-col>
            <v-col cols="11">
                <div class="d-flex">
                    <div class="text-body-2 font-weight-light mr-1 text-deep-orange-darken-3">{{ comment.UserName }}</div>
                    <v-tooltip
                      :text="formatLongDate(comment.DateCreated)"
                      bottom
                      contained
                    >
                        <template v-slot:activator="{ props }">
                            <div 
                                class="text-grey-darken-1" 
                                :style="{fontSize: 'smaller'}" 
                                v-bind="props" 
                            >
                                • {{ formatShortDate(comment.DateCreated) }}
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
                                    :disabled="item.disabled"
                                    :slim="true"
                                    :value="index"
                                    @click="item.action"
                                >
                                    <template #prepend v-if="item.title !== 'Edit'">
                                        <v-icon :color="item.color">{{ item.icon }}</v-icon>
                                    </template>
                                    <v-list-item-title v-if="item.title !== 'Edit'">{{ item.title }}</v-list-item-title>
                                    <edit-comment v-else :post="post" :comment="comment" @edit:comment="handleEditComment"></edit-comment>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                </div>
                <div class="text-body-2 font-weight-light mb-1">{{ comment.Content }}</div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { useAppStore } from '../store/app.js';
import { formatShortDate, formatLongDate } from '../utils/function.js';
import { Event } from '../utils/constant.js';
import EditComment from './EditComment.vue';
export default {
    props: {
        comment: {
            type: Object
        },
        post: {
            type: Object
        }
    },
    components: {
        EditComment
    },
    emits: [Event.DELETE_COMMENT, Event.EDIT_COMMENT],
    data() {
        return {
            user: undefined,
            items: []
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
                action: this.handleDeleteComment,
                icon: 'mdi-delete',
                color: 'red-accent-4'
            });
        } else {
            this.items.push({
                title: 'Report (Coming soon)',
                action: this.handleReportComment,
                icon: 'mdi-flag',
                disabled: true
            });
        }
        if (this.isAdmin) {
            this.items.push({
                title: 'Delete (Admin)',
                action: this.handleDeletePost,
                icon: 'mdi-delete',
                color: 'red-darken-4'
            });
        }
    },
    computed: {
        isOwner() {
            return this.user.id === this.comment.UserId;
        },
        isAdmin() {
            return this.user?.roles?.includes('Admin');
        }
    },
    methods: {
        handleDeleteComment() {
            this.$emit(Event.DELETE_COMMENT, this.comment);
        },
        handleEditComment(requestBody) {
            this.$emit(Event.EDIT_COMMENT, requestBody);
        },
    },
    setup() {
        const appStore = useAppStore();

        return {
            appStore,
            formatShortDate,
            formatLongDate
        }
    }
}
</script>