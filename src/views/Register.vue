<template>
  <div class="register">
    <h2 class="register__title">
      Register form
    </h2>

    <form>
      <input type="text" v-model="login"/>

      <input type="password" v-model="password" />

      <button @click="registerUser">
        Register
      </button>

      {{ errorMessage }}
    </form>
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

    function registerUser() {
      firebase.auth().createUserWithEmailAndPassword(login.value, password.value)
        .catch(error => {
          // TODO: Error handling
          errorMessage = error.message
        })
    }

    return {
      login,
      password,
      errorMessage,
      registerUser
    }
  }
}
</script>
