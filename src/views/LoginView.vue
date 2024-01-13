<template>
  <v-snackbar
    v-if="appStore.snackbar"
    v-model="appStore.snackbar"
    :color="appStore.snackbarInfo.color"
    @update:model-value="value => appStore.openSnackbar(value)"
  >
    <v-icon left>mdi-check-circle</v-icon>
    {{ appStore.snackbarInfo.message  }}
  </v-snackbar>
  <div class="d-flex justify-center align-center">
    <v-img
      class="my-6"
      max-height="80"
      max-width="80"
      src="../assets/bright-logo.png"
    ></v-img>
    <v-img
      class="my-6"
      max-width="200"
      src="../assets/text-logo.png"
    ></v-img>
  </div>
  <v-card
    class="mx-auto pa-12 pb-8"
    elevation="8"
    max-width="448"
    rounded="lg"
  >
    <v-form v-model="formStatus" @submit.prevent="handleLogin">
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>
  
      <v-text-field
        v-model="username"
        :rules="[rules.required, rules.minLength]"
        density="compact"
        placeholder="Username"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
      ></v-text-field>
  
      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password
      </div>
  
      <v-text-field
        v-model="password"
        :rules="[rules.required, rules.password]"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>
  
      <v-card
        v-show="error"
        class="mb-4"
        color="deep-orange-accent-4"
        variant="tonal"
      >
        <v-card-text class="text-medium-emphasis text-caption">
          {{ error }}
        </v-card-text>
      </v-card>
  
      <v-btn
        block
        class="mb-4"
        color="blue"
        size="large"
        type="submit"
        variant="tonal"
      >
        Log In
      </v-btn>
  
      <v-card-text class="text-center">
        <router-link
            class="text-blue text-decoration-none"
            to="/register"
        >
            Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </router-link>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
import { useAppStore } from '../store/app.js';
export default {
  name: 'LoginView',
  data() {
    return {
      visible: false,
      password: undefined,
      username: undefined,
      formStatus: false,
      error: undefined,
      rules: {
            required: value => !!value || 'Field is required',
            minLength: value => value.length >= 5 || 'Min 5 characters',
            password: value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) || 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character and must be at least 8 characters long'
        },
    }
  },
  methods: {
    async handleLogin() {
      if (this.formStatus) {
        const payload = {
          username: this.username,
          password: this.password
        }
        const response = await this.appStore.login(payload);

        if (response.isSuccess) {
          localStorage.setItem('token', response.response);
          this.$router.push({ name: 'Home' });
        } else {
          this.error = response.errors[0];
        }
      }
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