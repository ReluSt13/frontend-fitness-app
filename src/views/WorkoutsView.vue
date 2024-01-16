<template>
  <v-app>
    <SideBar></SideBar>
    <v-main v-if="workouts.length > 0">
      <div
        class="d-flex flex-wrap w-100 h-100 pa-8 align-content-start"
        style="gap: 32px"
      >
        <v-card
          v-for="workout in workouts"
          :key="workout.Id"
          width="300"
          height="150"
          variant="outlined"
          class="rounded"
        >
          <v-card-item>
            <v-card-title>{{ workout.Name }}</v-card-title>
            <template #append>
              <v-dialog width="250">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    icon="mdi-delete"
                    size="medium"
                    variant="plain"
                    color="red"
                  ></v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                  <v-card title="Are you sure?">
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        text="Delete"
                        color="red"
                        variant="outlined"
                        @click="deleteWorkout(workout)"
                      ></v-btn>

                      <v-btn
                        text="Close"
                        variant="outlined"
                        @click="isActive.value = false"
                      ></v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </template>

            <v-card-subtitle>{{
              formatLongDate(workout.DateCreated)
            }}</v-card-subtitle>
          </v-card-item>

          <v-card-actions class="justify-space-around">
            <v-dialog width="600">
              <template #activator="{ props }">
                <v-btn v-bind="props" variant="outlined">View</v-btn>
              </template>
              <template #default="{ isActive }">
                <workout-modal
                  :workout="workout"
                  @close:modal="isActive.value = false"
                >
                  <template #content="slotProps">
                    <template v-if="slotProps.exercises.length > 0">
                      <v-card-text :class="{ 'pa-0 ma-0': appStore.isMobile }">
                        <v-list>
                          <v-list-item
                            v-for="exercise in slotProps.exercises"
                            :key="exercise.Id"
                          >
                            <v-list-item-title>
                              <span class="text-orange-darken-4"
                                >{{
                                  exerciseNames[exercise.ExerciseId - 1]
                                }}:</span
                              >
                              {{ exercise.Sets }}
                              {{ exercise.Sets > 1 ? "sets" : "set" }} of
                              {{ exercise.Reps }}
                              {{ exercise.Reps > 1 ? "reps" : "rep" }} -
                              {{ exercise.Weight }}kg
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-card-text>
                    </template>
                    <template v-else>
                      <v-card-text>No exercises added yet.</v-card-text>
                    </template>
                  </template>
                </workout-modal>
              </template>
            </v-dialog>

            <!-- <v-btn
              variant="outlined"
            >
              Edit
            </v-btn> -->
          </v-card-actions>
        </v-card>
      </div>
    </v-main>
    <v-main
      v-else
      class="text-h5 d-flex flex-column align-center justify-center"
      >You don't have any workouts</v-main
    >
  </v-app>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import { formatLongDate } from "@/utils/function";
import { useAppStore } from "@/store/app";
import WorkoutModal from "@/components/WorkoutModal.vue";

export default {
  components: {
    SideBar,
    WorkoutModal,
  },
  data() {
    return {
      workouts: [],
      exerciseNames: [],
    };
  },
  async created() {
    const result = await this.appStore.getAllUserWorkouts();
    if (result.isSuccess) {
      this.workouts = result.response;
    }
    const exerciseNamesResult = await this.appStore.getAllExercises();
    if (exerciseNamesResult.isSuccess) {
      exerciseNamesResult.response.forEach((element) => {
        this.exerciseNames.push(element.Name);
      });
    }
  },
  watch: {
    "appStore.newWorkout": {
      handler(newWorkout) {
        if (newWorkout !== undefined) {
          this.workouts.unshift(newWorkout);
          this.appStore.newWorkout = undefined;
        }
      },
      deep: true,
    },
  },
  methods: {
    async deleteWorkout(workout) {
      const result = await this.appStore.deleteWorkout(workout.Id);
      if (result.isSuccess) {
        this.workouts = this.workouts.filter((w) => w.Id !== workout.Id);
      }
    },
  },
  setup() {
    const appStore = useAppStore();

    return {
      appStore,
      formatLongDate,
    };
  },
};
</script>

<style></style>
