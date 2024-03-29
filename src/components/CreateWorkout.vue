<template>
  <div class="p-10">
    <v-form v-model="formStatus" @submit.prevent="submitWorkoutForm">
      <v-text-field
        v-model="workoutName"
        :rules="workoutNameRule"
        label="Workout Name"
        required
      ></v-text-field>

      <!-- Exercise List -->
      <v-row v-for="exercise in exercises" :key="exercise.id">
        <v-col>
          <!-- Dropdown for Exercise Names -->
          <v-select
            v-model="exercise.name"
            :items="exerciseNames"
            label="Exercise Name"
            class="exercise-select"
            required
            :rules="[(v) => !!v || 'Exercise name is required']"
          ></v-select>
        </v-col>

        <v-col>
          <v-text-field
            v-model="exercise.sets"
            label="Sets"
            type="number"
            class="sets-select"
            required
            :rules="[(v) => !!v || 'Required', (v) => v > 0 || 'Bro at least 1']"
          ></v-text-field>
        </v-col>

        <v-col>
          <!-- Number field for Reps -->
          <v-text-field
            v-model="exercise.reps"
            label="Reps"
            type="number"
            class="reps-select"
            required
            :rules="[(v) => !!v || 'Required', (v) => v > 0 || 'Do some reps']"
          ></v-text-field>
        </v-col>

        <v-col>
          <!-- Number field for Weight -->
          <v-text-field
            v-model="exercise.weight"
            label="Weight (kg)"
            type="number"
            class="weight-select"
            required
            :rules="[(v) => !!v || 'Required', (v) => v > 0 || 'Use some weight']"
          ></v-text-field>
        </v-col>
        <v-col>
          <!-- Button to Remove Exercise -->
          <v-btn @click="removeExercise(index)" icon>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-btn
        @click="addExercise"
        color="cyan-darken-4"
        variant="outlined"
        style="margin: 0 auto; display: block"
        >Add exercise</v-btn
      >

      <v-container class="d-flex justify-space-around">
        <v-btn
          type="submit"
          color="orange-darken-4"
          variant="outlined"
          class="ma-2"
          :disabled="!formStatus"
          >Submit</v-btn
        >
        <v-btn
          @click="cancelWorkout"
          color="cyan-darken-2"
          variant="outlined"
          class="ma-2"
          >Cancel</v-btn
        >
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { useAppStore } from "@/store/app";

export default {
  props: {
    workout: {
      type: Object,
    },
  },
  data() {
    return {
      formStatus: undefined,
      workoutName: "",
      exercises: [{ name: "", reps: "", weight: "" }],
      exerciseNames: [],
      exerciseNamesMap: {},
      workoutNameRule: [(v) => !!v || "Workout name is required", (v) => v.length <= 20 || "Workout name must be less than 20 characters"]
    };
  },
  async created() {
    this.user = this.appStore.getUser();
    const exerciseNamesResult = await this.appStore.getAllExercises();
    if (exerciseNamesResult.isSuccess) {
      exerciseNamesResult.response.forEach((element) => {
        this.exerciseNamesMap[element.Name] = element.Id;
        this.exerciseNames.push(element.Name);
      });
    }
  },
  methods: {
    addExercise() {
      // Add a new exercise to the list
      this.exercises.push({ name: "", reps: "", weight: "" });
    },
    removeExercise(index) {
      // Remove the selected exercise
      this.exercises.splice(index, 1);
    },
    async submitWorkoutForm() {
      // Handle form submission logic here
      // You can access the workoutName and exercises data and perform further actions
      if (this.formStatus) {
        const result = await this.appStore.createWorkout({
          name: this.workoutName.trim(),
        });

        if (result.isSuccess) {
          this.appStore.newWorkout = result.response;
          const workoutId = result.response.Id;

          for (var exercise of this.exercises) {
            const exerciseId = this.exerciseNamesMap[exercise.name];
            const payload = {
              workoutId: workoutId,
              exerciseId: exerciseId,
              reps: exercise.reps,
              weight: exercise.weight,
              sets: exercise.sets,
            };
            await this.appStore.createWorkoutExercise(payload);
          }
        }

        this.workoutName = "";
        this.exercises = [];
        this.$emit("cancelWorkout");
      }
      // Add logic to send data to the server or perform other actions
    },
    cancelWorkout() {
      this.workoutName = "";
      this.exercises = [];
      this.$emit("cancelWorkout");
    },
  },
  setup() {
    const appStore = useAppStore();

    return {
      appStore,
    };
  },
};
</script>
<style scoped>
.exercise-select {
  min-width: 200px;
}
.weight-select {
  min-width: 150px;
}
.reps-select,
.sets-select {
  min-width: 90px;
}

.p-10 {
  padding: 10px;
}
</style>
