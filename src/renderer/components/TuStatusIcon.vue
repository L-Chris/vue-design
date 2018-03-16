<template>
  <i class="iconfont" :class="`icon-${currentStatus}`"/>
</template>

<script>
  export default {
    props: {
      status: {
        type: String | Number | Boolean
      },
      statusList: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      currentStatus () {
        const status = this.statusList.find(_ => _.id === this.status)
        return (status && status.value) || ''
      }
    }
  }
</script>
