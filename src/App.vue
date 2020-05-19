<template>
  <div class="app">
    <div class="nav">
      <h1 class="nav__heading">
        <router-link
          to="/">
          Best before app
        </router-link>
      </h1>

      <main-menu />
    </div>

    <div class="app__container">
      <router-view />

      <loader v-if="isRequest" />
    </div>

    <notify
      v-show="isMessageShowed"
      :message="messageToWatch"
      @click.native="toggleMessage(10)"
    />

    <portal-target name="notify-portal" />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from '@vue/composition-api'
import { auth, messaging } from '@/logic/Db.js'

import MainMenu from '@/components/Menu.vue'
import Notify from '@/components/Notify.vue'
import Loader from '@/components/Loader.vue'

import { tokenRefresh, onMessage, notifyMessage } from './logic/Messages.js'

export default {
  components: {
    MainMenu,
    Notify,
    Loader
  },
  setup (props, context) {
    const isRequest = computed(() => context.root.$store.state.isRequestProcessed)
    const messageToWatch = computed(() => notifyMessage)
    const isMessageShowed = ref(false)

    context.root.$store.commit('changeRequestProcess', true)

    auth.onAuthStateChanged(user => {
      context.root.$store.commit('setUser', user)

      if (user) {
        context.root.$router.push({ name: 'Home' })
      }
      context.root.$store.commit('changeRequestProcess', false)
    })

    onMounted(() => {
      // TODO: Init on safari browser after enter the page
      tokenRefresh()
      if (messaging) {
        messaging.onMessage(payload => onMessage(payload))
      }
    })

    watch(messageToWatch, n => {
      if (n.length > 0) {
        isMessageShowed.value = true
        toggleMessage()
      }
    })

    function toggleMessage (data = 5000) {
      setTimeout(() => {
        isMessageShowed.value = false
      }, data)
    }

    return {
      isRequest,
      messageToWatch,
      isMessageShowed,
      toggleMessage
    }
  }
}
</script>

<style lang="scss">
@import 'assets/mq';

body {
  margin: 0;
  overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 {
  margin: 12px;

  @include mq(768px) {
    margin: 12px 0;
  }
}

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

button {
  padding: 8px;
  font-size: 12px;
  background-color: #fff;
  border-radius: 0;
  border: 1px solid #2c3e50;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover,
  &:focus {
    background-color: #2c3e50;
    color: #fff;
  }

  &:disabled {
    pointer-events: none;
  }
}

a {
  color: #2c3e50;
}

.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  &__container {
    max-width: 800px;
    margin: 24px auto;
  }
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid #2c3e50;

  &__heading {
    & a {
      color: #2c3e50;
      text-decoration: none;
    }
  }
}
</style>
