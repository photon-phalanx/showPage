<template>
  <div class="progressing-bar-wrapper">
    <div class="img-hidden-wrapper" :style="{width: calShowWidth}">
      <img class="img" src="./averageProgress.png"/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  export default {
    data () {
      return {
        percent: 0
      }
    },
    computed: {
      calShowWidth () {
        if (this.percent === 0) return 0
        return this.percent * 1192 / 100 + 5 + 'px'
      }
    },
    mounted () {
      this.getAverageData()
    },
    methods: {
      getAverageData () {
        axios.get('/api/getAverageData').then((res) => {
          console.log(res.data)
          this.percent = res.data.i
        })
      }
    },
    components: {}
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  @import "~common/scss/variable";
  @import "~common/scss/mixin";
  .progressing-bar-wrapper {
    .img-hidden-wrapper {
      overflow-x: hidden;
      .img {
        // width: 100%;
        width: 1192px;
        height: auto;
      }
    }
  }
</style>
