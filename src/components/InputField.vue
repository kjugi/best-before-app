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

<style lang="scss">
.input-field {
  padding: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid #2c3e50;

  &__label {
    display: block;
  }

  &__input {
    width: calc(100% - 26px);
    padding: 8px 12px;
    background-color: #fff;
    border: 1px solid #2c3e50;
    border-radius: unset;

    &[type="checkbox"] {
      width: auto;
    }
  }

  &__select-wrapper {
    position: relative;
  }

  &__select {
    width: 100%;
    padding: 8px 12px;
    background-color: #fff;
    border: 1px solid #2c3e50;
    border-radius: unset;
    -webkit-appearance: none;
  }

  &__select-arrow {
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 24px;
    height: 24px;
    margin: auto;
    text-align: center;

    &:after {
      content: '\25BE'
    }
  }

  &__error {
    margin: 12px 0 12px;
    font-size: 14px;
    color: #EE5622;
  }
}
</style>
