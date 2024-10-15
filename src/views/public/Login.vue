<template>
  <div class="home-container">
    <div class="home-image">
      <img src="@/assets/images/main_background.png" alt="home" />
    </div>
    <div class="home-content">
      <div class="content-header">
        <h1>Log In</h1>
        <p>Enter your credentials to access your account</p>
      </div>
      <div class="content-login">
        <v-form>
          <div class="login-field">
            <span class="field-label">Username</span>
            <v-text-field v-model="username" variant="outlined" class="input-field" />
          </div>
          <div class="login-field">
            <span class="field-label">Password</span>
            <v-text-field
              v-model="password"
              variant="outlined"
              type="password"
              class="input-field"
            />
          </div>
          <v-btn color="black" class="login-button" @click="submitLogin"> Log In </v-btn>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    submitLogin() {
      const result = this.login({ id: this.username, password: this.password })
      if (result) {
        this.$router.push({ name: 'home' })
      } else {
        alert('Login failed')
      }
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/home.css';

.login-field {
  margin-bottom: 1.5rem;
}

.field-label {
  color: var(--black-100, #000);
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem;
}

.input-field {
  margin-top: 0.25rem; /* To give a little space between label and input */
}

.login-button {
  width: 240px;
  color: white;
}
</style>
