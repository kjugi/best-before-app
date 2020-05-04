<template>
  <div class="app">
    <div class="nav">
      <h1 class="nav__heading">
        <router-link
          to="/">
          Best before app
        </router-link>
      </h1>

      <div>
        <router-link
          class="nav__link"
          to="/"
        >
          Home
        </router-link> |

        <router-link
          class="nav__link"
          to="/add-product"
        >
          Add product
        </router-link>
      </div>
    </div>

    <div class="app__container">
      <router-view/>
    </div>

    <portal-target name="notify-portal" />
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
}

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

button {
  padding: 8px;
  font-size: 12px;
  background-color: #fff;
  border-radius: 0;
  border: 1px solid #2c3e50;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover,
  &:focus {
    background-color: #2c3e50;
    color: #fff;
  }

  &:disabled {
    pointer-events: none;
  }
}

.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  &__container {
    max-width: 800px;
    margin: 24px auto;
  }
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid #2c3e50;

  &__heading {
    & a {
      color: #2c3e50;
      text-decoration: none;
    }
  }

  &__link {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
      text-decoration: underline;
    }

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
}
</style>
