<template>
  <div class="register">
    <h2 class="register__title">
      Register to app
    </h2>

    <form @submit.prevent="triggerRegister">
      <input-field
        id="login"
        label="Login"
        v-model="login"
        type="email"
        :is-error="validation.login.$invalid"
        :error-message="validation.login.$errors[0] ? validation.login.$errors[0].$message : ''"
      />

      <input-field
        id="password"
        label="Password"
        v-model="password"
        type="password"
        :is-error="validation.password.$invalid"
        :error-message="validation.password.$errors[0] ? validation.password.$errors[0].$message : ''"
      />

      <button
        :disabled="validation.$invalid"
        @click="triggerRegister"
      >
        Register
      </button>
    </form>

    <portal to="notify-portal">
      <transition name="fade">
        <notify
          v-show="isMessageShowed"
          :class="messageClasses"
          :message="message"
          @click.native="toggleMessage(10)"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import { required, email } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import firebase from 'firebase/app'
import 'firebase/auth'

import InputField from '@/components/InputField.vue'
import Notify from '@/components/Notify.vue'
import { initFunction } from '@/logic/Notify.js'

export default {
  components: {
    InputField,
    Notify
  },
  setup () {
    const login = ref('')
    const password = ref('')

    const validation = useVuelidate(
      {
        login: {
          required,
          email
        },
        password: {
          required
        }
      },
      { login, password }
    )

    function triggerRegister() {
      firebase.auth().createUserWithEmailAndPassword(login.value, password.value)
        .then(() => {
          showMessage({
            status: true,
            messageClass: 'notify--success',
            message: 'Welcome ' + login.value
          })
        })
        .catch(error => {
          showMessage({
            status: true,
            messageClass: 'notify--error',
            message: error.message
          })
        })

      clearFields()
    }

    function clearFields () {
      login.value = ''
      password.value = ''
    }

    // Notify init
    const {
      isMessageShowed,
      message,
      messageClasses,
      toggleMessage,
      showMessage
    } = initFunction()

    return {
      // Fields
      login,
      password,
      // Trigger
      triggerRegister,
      // Validation
      validation,
      // Notify message
      isMessageShowed,
      toggleMessage,
      messageClasses,
      message
    }
  }
}
</script>
