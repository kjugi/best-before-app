<template>
  <div class="home">
    <h2 class="home__title">
      List of products
    </h2>

    <top-bar v-if="products.length > 0" />

    <ul
      v-if="products.length > 0"
      :class="[
        'home__list',
        { 'home__list--compact': !isStandardViewActive }
      ]"
    >
      <li
        v-for="(item, index) in products"
        :key="index"
        :class="[
          'home__item',
          { 'home__item--warning-date': isCloseToExpire(item.expireDate) },
          { 'home__item--expire-date': dateExpired(item.expireDate) }
        ]"
      >
        <div class="home__item-content">
          <p class="home__item-details">
            <span class="home__item-line">
              <span class="home__item-label">
                No. {{ index }}.

                Product name:
              </span>

              <span class="home__item-detail">
                {{ item.name }}
              </span>
            </span>
            <span class="home__item-line">
              <span class="home__item-label">
                Category:
              </span>

              <span class="home__item-detail">
                {{ item.category }}
              </span>
            </span>

            <span class="home__item-line">
              <span class="home__item-label">
                Expire date:
              </span>

              <span class="home__item-detail">
                {{ item.expireDate }}
              </span>
            </span>
          </p>

          <p
            v-if="isCloseToExpire(item.expireDate) && !dateExpired(item.expireDate)"
            class="home__item-info"
          >
            Best before time is close!

            <span class="home__item-detail">
              <template v-if="isCloseToExpire(item.expireDate) !== '0'">
                Only {{ isCloseToExpire(item.expireDate) }} day(s) left
              </template>
              <template v-else>
                Will expire today!
              </template>
            </span>
          </p>

          <p
            v-if="dateExpired(item.expireDate)"
            class="home__item-info"
          >
            <span class="home__item-detail">
              Date expired!
            </span>
          </p>
        </div>

        <button
          v-if="idToDelete !== item['.key']"
          class="home__item-delete"
          @click="idToDelete = item['.key']"
        >
          Delete product
        </button>

        <button
          v-else
          class="home__item-confirm"
          @click="deleteProduct(item['.key'])"
        >
          Confirm?
        </button>
      </li>
    </ul>
    <p
      v-else
      class="home__no-results"
    >
      <strong class="home__no-results-title">
        You don't have any products.
      </strong>

      <span>
        Add one in <a href="/add-product">add product page</a>
      </span>
    </p>

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

import Notify from '../components/Notify.vue'
import TopBar from '../components/TopBar.vue'
import { initFunction } from '../logic/Notify.js'

export default {
  name: 'Home',
  components: {
    Notify,
    TopBar
  },
  setup (props, context) {
    // Run fetching products from firebase
    context.root.$store.dispatch('bindProducts')

    let idToDelete = ref(null)

    function isCloseToExpire (dateToCompare) {
      // TODO: user defined close to expired for now static 14 days
      const numberOfDays = Math.ceil((new Date(dateToCompare) - new Date()) / (1000 * 60 * 60 * 24))
      return numberOfDays <= 14 && numberOfDays >= 0 ? String(numberOfDays) : false
    }

    function dateExpired (dateToCompare) {
      return Math.ceil((new Date(dateToCompare) - new Date()) / (1000 * 60 * 60 * 24)) < 0 || false
    }

    async function deleteProduct (id) {
      context.root.$store.commit('changeRequestProcess', true)
      idToDelete.value = null

      await context.root.$store.dispatch('deleteProduct', id)

      showMessage({
        status: true,
        messageClass: 'notify--success',
        message: 'Successfully deleted'
      })
      context.root.$store.commit('changeRequestProcess', false)
    }

    // Notify init
    const {
      isMessageShowed,
      message,
      messageClasses,
      toggleMessage,
      showMessage
    } = initFunction()

    // Items view type
    const isStandardViewActive = computed(() =>
      context.root.$store.state.isStandardViewActive
    )

    return {
      products: computed(() => context.root.$store.state.products),
      idToDelete,
      isCloseToExpire,
      dateExpired,
      deleteProduct,
      // Notify logic
      isMessageShowed,
      message,
      messageClasses,
      toggleMessage,
      // Items view type
      isStandardViewActive
    }
  }
}
</script>

<style lang="scss">
.home {
  &__list {
    padding: 0;
    margin: 0;
    list-style: none;

    &--compact {
      .home__item {
        justify-content: center;
      }

      .home__item-content {
        width: auto;
      }

      .home__item-details {
        display: inline-block;
        margin: 0;
      }

      .home__item-info {
        display: inline-block;
      }

      .home__item-line {
        display: initial;
      }

      .home__item-label {
        display: none;
      }

      .home__item-detail:after {
        content: '-';
      }
    }
  }

  &__item {
    display: flex;
    align-items: baseline;
    padding: 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid #2c3e50;

    &--warning-date {
      background-color: #ECA72C;
    }

    &--expire-date {
      background-color: #EE5622;
      color: #fff;
    }
  }

  &__item-content {
    width: calc(100% - 132px);
    margin-right: 12px;
  }

  &__item-detail {
    font-weight: 700;
  }

  &__item-line {
    display: block;
  }

  &__item-delete {
    width: 120px;
  }

  &__no-results {
    text-align: center;
  }

  &__no-results-title {
    display: block;
    font-size: 18px;
  }
}
</style>
