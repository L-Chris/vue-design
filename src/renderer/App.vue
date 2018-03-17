<template>
  <div id="app">
    <v-app>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss">
@import './styles/index';
@import './styles/iconfont';
::-webkit-scrollbar{
  display:none;
} 
</style>
