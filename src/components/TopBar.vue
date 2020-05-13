<template>
  <div class="top-bar">
    <button
      :class="[
        'top-bar__button',
        { 'top-bar__button--active': !isStandardViewActive }
      ]"
      @click="setNewView(false)"
    >
      Compact
    </button>

    <button
      :class="[
        'top-bar__button',
        { 'top-bar__button--active': isStandardViewActive }
      ]"
      @click="setNewView(true)"
    >
      Standard
    </button>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'

export default {
  setup (props, context) {
    const isStandardViewActive = computed(() =>
      context.root.$store.state.isStandardViewActive
    )

    function setNewView(state) {
      if (state !== isStandardViewActive.value) {
        context.root.$store.commit('changeView')
      }
    }

    return {
      isStandardViewActive,
      setNewView
    }
  }
}
</script>

<style lang="scss">
.top-bar {
  display: flex;
  padding: 12px;
  margin-bottom: 24px;
  background-color: #2c3e50;

  &__button {
    margin-right: 12px;
    padding: 6px;
    border: 1px solid #2c3e50;
    font-size: 8px;
    color: #2c3e50;

    &--active {
      background-color: #2c3e50;
      color: #fff;
      border: 1px solid #fff;
    }
  }
}
</style>
