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
      />

      <input-field
        id="password"
        label="Password"
        v-model="password"
        type="password"
      />

      <button>
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

import InputField from '../components/InputField.vue'
import Notify from '../components/Notify.vue'
import { initFunction } from '../logic/Notify.js'
import { auth } from '../logic/Db.js'

export default {
  name: 'RegisterPage',
  components: {
    InputField,
    Notify
  },
  setup () {
    const login = ref('')
    const password = ref('')

    function triggerRegister() {
      auth.createUserWithEmailAndPassword(login.value, password.value)
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
      triggerRegister,
      // Notify message
      isMessageShowed,
      toggleMessage,
      messageClasses,
      message
    }
  }
}
</script>
