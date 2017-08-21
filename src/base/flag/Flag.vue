<template>
  <div class="flag" :style="{transform: calcOffsetWidth, zIndex: index}">
    <p class="id">{{detail[0]}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  const PROGRESS_WIDTH = '1175'
  export default {
    data () {
      return {}
    },
    mounted () {
    },
    props: {
      detail: {
        type: Array
      },
      index: {
        type: Number,
        default: 1
      }
    },
    methods: {},
    components: {},
    computed: {
      // 本身偏移应该是父组件的事情,和旗子无关，但是项目不复杂,子组件里写会比较方便,所以就写在子组件了
      calcOffsetWidth () {
        let offset = parseInt(this.detail[2]) * PROGRESS_WIDTH / 100
        return `translate3d(${offset}px, 0, 0)`
      }
    }
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .flag {
    position: relative;
    width: 50px;
    height: 110px;
    background: url(flag.png);
    background-size: cover;
    transition: all 0.4s linear;
    .id {
      position: absolute;
      top: 15%;
      left: 40%;
      font-size: 20px;
      transform: translate3d(-50%, -50%, 0);
    }
  }
</style>
