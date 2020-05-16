<template>
  <div class="loader">
    <div class="loader__wrapper">
      <p class="loader__text">
        Loading...
      </p>

      <div class="loader__bar">
        <span class="loader__progress"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 10;

  &__wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
  }

  &__text {
    width: 100%;
    font-size: 18px;
    text-align: center;
  }

  &__bar {
    position: relative;
    width: 200px;
    max-width: 80%;
    height: 12px;
    border-radius: 12px;
    background-color: #fff;
    border: 1px solid #2c3e50;
    overflow: hidden;
  }

  &__progress {
    display: block;
    width: 200px;
    height: 12px;
    border-radius: 12px;
    background-color: #42b983;
    animation: scroll 2s infinite;
    transform: translateX(-100%);
  }
}

@keyframes scroll {
  0% {
    transform: translateX(-100%);
  }

  50% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(100%);
  }
}
</style>
