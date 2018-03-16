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
@import url(//at.alicdn.com/t/font_590901_s2fj9p6r0mfb6gvi.css);
@import './styles/index';
::-webkit-scrollbar{
  display:none;
}
</style>
