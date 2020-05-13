<template>
  <div :class="['input-field', { 'input-field--error': isError } ]">
    <slot name="label">
      <label
        v-if="label"
        :for="id"
        class="input-field__label"
      >
        {{ label }}
      </label>
    </slot>

    <slot name="field">
      <input
        :id="id"
        v-bind="$attrs"
        class="input-field__input"
        v-on="listeners"
      />
    </slot>

    <slot name="validation">
      <p
        v-if="isError"
        class="input-field__error"
      >
        {{ errorMessage }}
      </p>
    </slot>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'

export default {
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default: 'id1'
    },
    label: {
      type: String,
      default: null
    },
    isError: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: null
    }
  },
  setup(props, context) {
    const listeners = computed(() => {
      return {
        ...context.$listeners,
        input: event => {
          if (event.target.type === 'checkbox') {
            context.emit('input', event.target.checked)
          } else {
            context.emit('input', event.target.value)
          }
        }
      }
    })

    return {
      listeners
    }
  }
}
</script>
