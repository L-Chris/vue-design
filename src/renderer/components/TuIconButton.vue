<template>
  <v-btn class="tu-icon-button" flat large>
    <i class="iconfont" :class="`icon-${icon}`"/>
    <div class="tu-icon-button-text">{{text}}</div>
  </v-btn>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.tu-icon-button {
  min-width: 48px;
  .iconfont {
    font-size: 18px;
  }
  .btn__content {
    flex-direction: column;
    padding: 0 4px;
  }
  &-text {
    font-size: 10px;
    line-height: 10px;
  }
}
</style>
