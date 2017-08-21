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
        showWidth: 0
      }
    },
    computed: {
      calShowWidth () {
        if (this.showWidth === 0) return 0
        return this.showWidth + 0.5 + '%'
      }
    },
    mounted () {
    },
    props: {},
    methods: {},
    components: {}
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  @import "~common/scss/variable";
  @import "~common/scss/mixin";
  .progressing-bar-wrapper {
    padding: 0 49px;
    .img-hidden-wrapper {
      overflow-x: hidden;
      .img {
        // width: 100%;
        width: 1268px;
        height: auto;
      }
    }
  }
</style>
