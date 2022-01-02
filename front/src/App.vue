<template>
  <div>
    <img alt="Vue logo" src="./assets/logos/icon.svg" />
    <Counter />
    <EventHandler />
  </div>
</template>

<script>
import Counter from "./components/Counter.vue";
import EventHandler from "./components/EventHandler.vue";

export default {
  name: "App",
  components: {
    Counter,
    EventHandler,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

img {
  height: 30vh;
}
</style>
