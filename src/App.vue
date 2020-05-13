<template>
  <div class="app">
    <div class="nav">
      <h1 class="nav__heading">
        <router-link
          to="/">
          Best before app
        </router-link>
      </h1>

      <div>
        <router-link
          class="nav__link"
          to="/"
        >
          Home
        </router-link> |

        <router-link
          class="nav__link"
          to="/add-product"
        >
          Add product
        </router-link> |

        <template v-if="!isLogged">
          <router-link
            class="nav__link"
            to="/login"
          >
            Login
          </router-link> |

          <router-link
            class="nav__link"
            to="/register"
          >
            Register
          </router-link> |
        </template>

        <button
          v-else
          @click="logout"
        >
          Logout
        </button>
      </div>
    </div>

    <div class="app__container">
      <router-view />
    </div>

    <portal-target name="notify-portal" />
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
import { auth } from './logic/Db.js'

export default {
  setup (props, context) {
    auth.onAuthStateChanged(user => {
      context.root.$store.commit('setUser', user)

      if (user) {
        context.root.$router.push({ name: 'Home' })
      }
    })

    const isLogged = computed(() => !!context.root.$store.getters.isUserLogged)

    function logout() {
      try {
        auth.signOut()
        context.root.$store.commit('setUser', null)
        context.root.$router.push({ name: 'Login' })
      } catch {
        // TODO: Error handling
        console.log('problem')
      }
    }

    return {
      isLogged,
      logout
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
