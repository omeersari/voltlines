<template>
  <div id="app">
    <div id="nav">
      <login />
    </div>
  </div>
</template>

<style lang="scss">
@import "./assets/scss/app.scss";
</style>

<script>
import Login from "./components/Login.vue";

export default {
  components: {
    Login,
  },
};
</script>
