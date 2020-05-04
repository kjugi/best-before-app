<template>
  <div class="login">
    <h2 class="login__title">
      Login form
    </h2>

    <form>
      <input type="text" v-model="login"/>

      <input type="password" v-model="password" />

      <button>
        Login
      </button>
    </form>
  </div>
</template>

<script>
export default {

}
</script>
