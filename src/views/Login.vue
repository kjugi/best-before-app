<template>
  <div class="login">
    <h2 class="login__title">
      Login form
    </h2>

    <input
      type="text"
      v-model="login"
    />

    <input
      type="password"
      v-model="password"
    />

    <button @click="loginUser">
      Login
    </button>

    {{ errorMessage }}
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  setup () {
    const login = ref('')
    const password = ref('')
    let errorMessage = ref('')

    function loginUser() {
      firebase.auth().signInWithEmailAndPassword(login.value, password.value)
        .catch(error => {
          errorMessage = error.message
        })
    }

    return {
      login,
      password,
      errorMessage,
      loginUser
    }
  }
}
</script>
