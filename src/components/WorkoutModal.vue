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
          <v-col class="d-flex align-center justify-center pa-0" cols="8">
            <v-icon v-if="!appStore.isMobile" color="orange-darken-4">mdi-arm-flex</v-icon>
            <div
              class="ml-2"
              :class="{'text-h5': !appStore.isMobile, 'text-body-1': appStore.isMobile}"
            >
                {{ workout.Name }}
            </div>
            <v-tooltip
                :text="formatLongDate(workout.DateCreated)"
                bottom
                contained
            >
                <template v-slot:activator="{ props }">
                    <div 
                      v-bind="props" 
                      class="ml-2 text-grey-darken-2"
                      :class="{'text-body-2': !appStore.isMobile, 'text-caption': appStore.isMobile}"
                    >• {{ formatShortDate(workout.DateCreated) }}</div>
                </template>
            </v-tooltip>
            
          </v-col>
          <v-col cols="3">
              <v-img height="50" src="../assets/new-text-logo.png"></v-img>
          </v-col>
      </v-row>
      <slot name="content" :exercises="exercises"></slot>
      <v-row>
          <v-col cols="8">
              <v-img src="../assets/another-text-logo.png" height="30" width="120"></v-img>
          </v-col>
          <v-col cols="4" class="d-flex justify-end">
              <v-btn
                v-if="btnText"
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
import { Event } from '@/utils/constant';
import { formatShortDate, formatLongDate } from '@/utils/function';
import { useAppStore } from '@/store/app';
export default {
    props: {
        btnText: {
            type: String,
            default: undefined
        },
        workout: {
            type: Object
        }
    },
    emits: [Event.CLOSE_MODAL],
    data() {
        return {
            exercises: []
        }
    },
    async created() {
      const result = await this.appStore.getAllWorkoutExercises(this.workout.Id);
      if (result.isSuccess) {
        this.exercises = result.response;
      }
    },
    methods: {
        handleClose() {
            this.$emit(Event.CLOSE_MODAL);
        },
        handleSubmit() {
            this.$emit(Event.UPDATE_WORKOUT);
        }
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