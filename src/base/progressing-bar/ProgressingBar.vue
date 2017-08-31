<template>
  <div class="progressing-bar-wrapper">
    <div class="img-hidden-wrapper" :style="{width: calShowWidth}">
      <img class="img" src="./averageProgress.png"/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
      }
    },
    props: {
      process: {
        type: Number,
        default: 0
      }
    },
    computed: {
      calShowWidth () {
        if (this.process === 0) return 0
        return this.process * 1192 + 5 + 'px'
      }
    },
    mounted () {
    },
    methods: {
    },
    components: {}
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  @import "~common/scss/variable";
  @import "~common/scss/mixin";
  .progressing-bar-wrapper {
    .img-hidden-wrapper {
      transition: width 5s linear;
      overflow-x: hidden;
      .img {
        // width: 100%;
        width: 1192px;
        height: auto;
      }
    }
  }
</style>
