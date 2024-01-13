<template>
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
      <v-form v-model="formStatus" @submit.prevent="handleRegister">
        <div class="text-subtitle-1 text-medium-emphasis">Email</div>
    
        <v-text-field
            v-model="email"
            :rules="[rules.required, rules.email]"
            density="compact"
            placeholder="Email address"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Username</div>
    
        <v-text-field
            v-model="username"
            :rules="[rules.required, rules.minLength]"
            density="compact"
            placeholder="Username"
            prepend-inner-icon="mdi-account-outline"
            variant="outlined"
        ></v-text-field>
    
        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">Password</div>
    
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

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">Confirm Password</div>
    
        <v-text-field
            v-model="confirmPassword"
            :rules="[rules.required, rules.password]"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Confirm your password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
        ></v-text-field>
    
        <v-card
            v-show="error"
            class="mb-4 mt-4"
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
            variant="tonal"
            type="submit"
        >
            Register
        </v-btn>
    
        <v-card-text class="text-center">
            <router-link
                class="text-blue text-decoration-none"
                to="/login"
            >
                Already have an account? Login <v-icon icon="mdi-chevron-right"></v-icon>
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
        email: undefined,
        username: undefined,
        password: undefined,
        confirmPassword: undefined,
        formStatus: false,
        visible: false,
        error: undefined,
        rules: {
            required: value => !!value || 'Field is required',
            minLength: value => value.length >= 5 || 'Min 5 characters',
            email: value => /.+@.+\..+/.test(value) || 'Email must be valid',
            password: value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) || 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character and must be at least 8 characters long'
        },
      }
    },
    computed: {
        confirmedPassword() {
            return this.password === this.confirmPassword;
        }
    },
    watch: {
      confirmPassword(value) {
        if (value && !this.confirmedPassword) {
            this.error = 'Passwords do not match';
        } else {
            this.error = undefined;
        }
      }
    },
    methods: {
      async handleRegister() {
        if (this.formStatus && this.confirmedPassword) {
            const payload = {
                username: this.username,
                email: this.email,
                password: this.password
            }
            const response = await this.appStore.register(payload);
            if (response.isSuccess) {
              this.appStore.snackbarInfo = {
                message: 'Account was created. You can now log in!',
                color: 'success'
              }
                this.appStore.openSnackbar(true);
                this.$router.push({ name: 'Login' });
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