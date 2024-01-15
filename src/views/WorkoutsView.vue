<template>
  <v-app>
    <SideBar></SideBar>
    <v-main>
      <div class="d-flex flex-wrap w-100 h-100 pa-8 align-content-start" style="gap: 32px;">
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
              <v-btn icon="mdi-delete" size="medium" variant="plain" color="red"></v-btn>
            </template>

            <v-card-subtitle>{{ formatLongDate(workout.DateCreated) }}</v-card-subtitle>
          </v-card-item>

          <v-card-actions class="justify-space-around">
            <v-btn variant="outlined">
              View
            </v-btn>
            <v-btn variant="outlined">
              Edit
            </v-btn>
          </v-card-actions>
      </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import { formatLongDate } from "@/utils/function";
import { useAppStore } from "@/store/app";

export default {
  components: {
    SideBar,
  },
  data() {
    return {
      workouts: []
    };
  },
  async created() {
    const result = await this.appStore.getAllUserWorkouts();
    if (result.isSuccess) {
      this.workouts = result.response;
    }
  },
  watch: {
    'appStore.newWorkout': {
      handler(newWorkout) {
        if (newWorkout !== undefined) {
          this.workouts.unshift(newWorkout);
          this.appStore.newWorkout = undefined;
        }
      },
      deep: true
    }
  },
  setup() {
    const appStore = useAppStore();

    return {
      appStore,
      formatLongDate
    };
  },
};
</script>

<style>

</style>
