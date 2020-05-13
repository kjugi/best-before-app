<template>
  <div>
    <button
      class="menu__mobile-trigger"
      @click="isMenuActive = !isMenuActive"
    >
      Show Menu
    </button>

    <div
      :class="[
        'menu__background',
        { 'menu__background--active': isMenuActive }
      ]"
      @click="isMenuActive = false"
    ></div>

    <div
      :class="[
        'menu',
        { 'menu--active': isMenuActive }
      ]"
    >
      <router-link
        class="menu__link"
        to="/"
        @click.native="isMenuActive = false"
      >
        Home
      </router-link>

      <router-link
        class="menu__link"
        to="/add-product"
        @click.native="isMenuActive = false"
      >
        Add product
      </router-link>

      <template v-if="!isLogged">
        <router-link
          class="menu__link"
          to="/login"
          @click.native="isMenuActive = false"
        >
          Login
        </router-link>

        <router-link
          class="menu__link"
          to="/register"
          @click.native="isMenuActive = false"
        >
          Register
        </router-link>
      </template>

      <button
        v-else
        class="menu__logout"
        @click="logout"
      >
        Logout
      </button>
    </div>

    <portal to="notify-portal">
      <transition name="fade">
        <notify
          v-show="isMessageShowed"
          :message="message"
          @click.native="toggleMessage(10)"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
import { auth } from '@/logic/Db.js'

import Notify from '@/components/Notify.vue'
import { initFunction } from '@/logic/Notify.js'

export default {
  components: {
    Notify
  },
  setup (props, context) {
    let isMenuActive = ref(false)
    const isLogged = computed(() => !!context.root.$store.getters.isUserLogged)

    function logout() {
      isMenuActive.value = false

      try {
        auth.signOut()
        context.root.$store.commit('setUser', null)
        context.root.$router.push({ name: 'Login' })
      } catch (error) {
        showMessage({
          status: true,
          messageClass: 'notify--error',
          message: `Problem with logout. ${error.message}`
        })
      }
    }

    // Notify init
    const {
      isMessageShowed,
      message,
      toggleMessage,
      showMessage
    } = initFunction()

    return {
      isMenuActive,
      isLogged,
      logout,
      // Notify
      isMessageShowed,
      message,
      toggleMessage
    }
  }
}
</script>

<style lang="scss">
@import '../assets/mq';

.menu {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  min-width: 230px;
  padding: 12px;
  background-color: #fff;
  border-left: 1px solid #2c3e50;
  transform: translateX(100%);
  transition: all 0.3s ease-in-out;
  z-index: 1;

  &--active {
    transform: translateX(0);
  }

  @include mq(768px) {
    position: relative;
    width: auto;
    height: auto;
    border-left: unset;
    transform: translateX(0);
  }

  &__link {
    display: block;
    padding: 12px;
    color: #2c3e50;
    font-size: 22px;
    font-weight: bold;
    text-decoration: none;

    @include mq(768px) {
      display: initial;
      padding: 0;
      font-size: 16px;
      margin-right: 12px;
    }

    &.router-link-exact-active {
      color: #42b983;
      text-decoration: underline;
    }

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  &__logout {
    width: calc(100% - 26px);
    margin: 12px;
    font-size: 18px;

    @include mq(768px) {
      width: auto;
      margin: 0;
      font-size: 12px;
    }
  }

  &__mobile-trigger {
    font-size: 14px;

    @include mq(768px) {
      display: none;
    }
  }

  &__background {
    &--active {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(#2c3e50, 0.5);
      z-index: 0;
    }
  }
}
</style>
