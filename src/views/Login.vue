<template>
  <div class="login">
    <h2 class="login__title">
      Login to account
    </h2>

    <form @submit.prevent="triggerLogin">
      <input-field
        id="login"
        label="Login"
        v-model="login"
        type="email"
      />

      <input-field
        id="password"
        label="Password"
        v-model="password"
        type="password"
      />

      <button>
        Login
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

import InputField from '../components/InputField.vue'
import Notify from '../components/Notify.vue'
import { auth } from '../logic/Db.js'
import { initFunction } from '../logic/Notify.js'

export default {
  name: 'LoginPage',
  components: {
    InputField,
    Notify
  },
  setup () {
    const login = ref('')
    const password = ref('')

    function triggerLogin() {
      auth.signInWithEmailAndPassword(login.value, password.value)
        .then(() => {
          showMessage({
            status: true,
            messageClass: 'notify--success',
            message: `Welcome ${login.value}`
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
      triggerLogin,
      // Notify message
      isMessageShowed,
      toggleMessage,
      messageClasses,
      message
    }
  }
}
</script>
