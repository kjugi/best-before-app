<template>
  <div class="notify">
    <slot>
      {{ message }}
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.notify {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 100%;
  max-width: 300px;
  padding: 12px;
  text-align: right;
  background-color: #fff;
  border: 1px solid #2c3e50;

  &--error {
    background-color: #EE5622;
    color: #2c3e50;
  }

  &--success {
    background-color: #42b983;
    color: #2c3e50;
  }
}
</style>
