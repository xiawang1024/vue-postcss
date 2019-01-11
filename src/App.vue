<template>
  <div id="app">
    <Index />
  </div>
</template>

<script>
import Index from "views/Index";

export default {
  name: "app",
  components: {
    Index
  }
};
</script>

<style lang="scss">
#app {
  width: 750px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
