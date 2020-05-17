<template>
  <div class="product">
    <h2 class="product__title">
      Add product
    </h2>

    <form @submit.prevent="addProductTrigger">
      <div class="product__form">
        <input-field
          id="name"
          label="Product name"
          v-model="name"
          type="text"
        />

        <input-field
          id="expireDate"
          label="Expire date"
          v-model="expireDate"
          type="date"
          :min="today"
        />

        <input-field
          id="isDateRequired"
          label="Is expire date required?"
          v-model="isDateRequired"
          type="checkbox"
          checked="true"
        />

        <input-field label="Product category">
          <template #field>
            <div class="input-field__select-wrapper">
              <select
                v-model="selectedCategory"
                class="input-field__select"
                v-bind="$attrs"
              >
                <option
                  v-for="(category, key) in categories"
                  :key="key"
                  :selected="selectedCategory === category"
                >
                  {{ category }}
                </option>
              </select>

              <span class="input-field__select-arrow"></span>
            </div>
          </template>
        </input-field>
      </div>

      <button
        type="submit"
        class="product__button"
        @click="addProductTrigger"
      >
        Add product to database
      </button>
    </form>

    <portal to="notify-portal">
      <transition name="fade">
        <notify
          v-show="isMessageShowed"
          :class="messageClasses"
          :message="message"
          @click.native="toggleMessage(10)"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api'

import InputField from '../components/InputField.vue'
import Notify from '../components/Notify.vue'
import { initFunction } from '../logic/Notify.js'

export default {
  name: 'AddProductPage',
  components: {
    InputField,
    Notify
  },
  setup (props, context) {
    // input Date logic
    const today = computed(() => {
      return new Date().toJSON().substr(0, 10)
    })

    // isDateRequired field
    const isDateRequired = ref(true)
    const mustBeCool = (value) => {
      return isDateRequired.value && value.length === 0 ? false : true
    }

    // Validation logic
    const name = ref('')
    const expireDate = ref('')

    // Adding product logic
    async function addProductTrigger () {
      context.root.$store.commit('changeRequestProcess', true)

      await context.root.$store.dispatch('addProduct', {
        name: name.value,
        expireDate: expireDate.value,
        category: selectedCategory.value,
        pushingNew: true
      })

      showMessage({
        status: true,
        messageClass: 'notify--success',
        message: 'Successfully added'
      })

      clearFields()
      context.root.$store.commit('changeRequestProcess', false)
    }

    function clearFields () {
      name.value = ''
      expireDate.value = ''
      selectedCategory.value = categories.value[0]
    }

    // Notify init
    const {
      isMessageShowed,
      message,
      messageClasses,
      toggleMessage,
      showMessage
    } = initFunction()

    // Category field logic
    const categories = computed(() => context.root.$store.state.categories)
    const selectedCategory = ref(categories.value[0])

    return {
      name,
      expireDate,
      today,
      addProductTrigger,
      // Notify logic
      isMessageShowed,
      message,
      messageClasses,
      toggleMessage,
      // Category field logic
      categories,
      selectedCategory,
      // isDateRequired field
      isDateRequired
    }
  }
}
</script>

<style lang="scss">
.product {
  &__form {
    margin-bottom: 12px;
  }

  &__field {
    padding: 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid #2c3e50;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__button {
    display: block;
    margin: 0 0 0 auto;
  }
}
</style>
