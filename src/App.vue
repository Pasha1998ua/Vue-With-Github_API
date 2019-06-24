<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background-color: #e5e8f7;
}
</style>
