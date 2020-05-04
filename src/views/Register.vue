<template>
  <div class="register">
    <h2 class="register__title">
      Register form
    </h2>

    <form>
      <input type="text" v-model="login"/>

      <input type="password" v-model="password" />

      <button>
        Register
      </button>
    </form>
  </div>
</template>

<script>
export default {

}
</script>
