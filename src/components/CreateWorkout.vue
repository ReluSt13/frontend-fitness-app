<template>
  <div class="p-10">
    <v-form v-model="formStatus" @submit.prevent="submitWorkoutForm">
      <v-text-field
        v-model="workoutName"
        label="Workout Name"
        required
        :rules="[(v) => !!v || 'Workout name is required']"
      ></v-text-field>

      <!-- Exercise List -->
      <v-row v-for="(exercise, index) in exercises" :key="index">
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
          <!-- Number field for Reps -->
          <v-text-field
            v-model="exercise.reps"
            label="Reps"
            type="number"
            class="reps-select"
            required
            :rules="[(v) => !!v || 'Required']"
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
            :rules="[(v) => !!v || 'Required']"
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
export default {
  data() {
    return {
      formStatus: undefined,
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
      if (this.formStatus) {
        console.log("Workout Name:", this.workoutName);
        console.log("Exercises:", this.exercises);
      }
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
.reps-select {
  min-width: 100px;
}

.p-10 {
  padding: 10px;
}
</style>