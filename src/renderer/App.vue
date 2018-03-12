<template>
  <div id="app">
    <v-app>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'vue-design-electron'
  }
</script>

<style lang="scss">
@import './styles/index';
::-webkit-scrollbar{
  display:none;
}
</style>
