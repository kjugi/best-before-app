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
