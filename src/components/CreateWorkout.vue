<template>
  <div class="p-10">
    <v-form @submit.prevent="submitWorkoutForm">
      <v-text-field v-model="workoutName" label="Workout Name"></v-text-field>

      <!-- Exercise List -->
      <v-row v-for="(exercise, index) in exercises" :key="index">
        <v-col>
          <!-- Dropdown for Exercise Names -->
          <v-select
            v-model="exercise.name"
            :items="exerciseNames"
            label="Exercise Name"
            class="exercise-select"
          ></v-select>
        </v-col>
        <v-col>
          <!-- Number field for Reps -->
          <v-text-field
            v-model="exercise.reps"
            label="Reps"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col>
          <!-- Number field for Weight -->
          <v-text-field
            v-model="exercise.weight"
            label="Weight (kg)"
            type="number"
            class="weight-select"
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
        color="cyan-accent-4"
        style="width: 150px; margin: 0 auto; display: block"
        >Add Exercise</v-btn
      >

      <v-container class="d-flex justify-space-around mt-2">
        <v-btn
          type="submit"
          color="orange-darken-4"
          variant="outlined"
          class="ma-2"
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
export default {
  data() {
    return {
      workoutName: "",
      exercises: [{ name: "", reps: "", weight: "" }],
      exerciseNames: ["Exercise 1", "Exercise 2", "Exercise 3"], // Replace with your actual exercise names
    };
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
    submitWorkoutForm() {
      // Handle form submission logic here
      // You can access the workoutName and exercises data and perform further actions
      console.log("Workout Name:", this.workoutName);
      console.log("Exercises:", this.exercises);
      // Add logic to send data to the server or perform other actions
    },
    cancelWorkout() {
      this.workoutName = "";
      this.exercises = [];
      this.$emit("cancelWorkout");
    },
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

.p-10 {
  padding: 10px;
}
</style>
