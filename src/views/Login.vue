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
        class="login__button"
        :disabled="validation.$invalid"
      >
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
import { required, email } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

import InputField from '@/components/InputField.vue'
import Notify from '@/components/Notify.vue'
import { auth } from '@/logic/Db.js'
import { initFunction } from '@/logic/Notify.js'

export default {
  name: 'LoginPage',
  components: {
    InputField,
    Notify
  },
  setup (props, context) {
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

    async function triggerLogin() {
      context.root.$store.commit('changeRequestProcess', true)

      await auth.signInWithEmailAndPassword(login.value, password.value)
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
      context.root.$store.commit('changeRequestProcess', false)
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

<style lang="scss">
.login {
  &__button {
    padding: 8px 24px;
  }
}
</style>
