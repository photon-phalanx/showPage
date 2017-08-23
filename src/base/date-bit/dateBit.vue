<template>
  <div class="date-bit">
    <div class="bit-top" :class="{rotateTop: rotateTopFlag}">
      <div class="sub">{{oldNum}}</div>
    </div>
    <div class="bit-bottom">
      <div class="sub">{{oldDeltaNum}}</div>
    </div>
    <div class="bit-bottom" :class="{rotateBottom: rotateBottomFlag}">
      <div class="sub">{{oldNum}}</div>
    </div>
    <div class="bit-behind">{{num}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        oldNum: 0,
        oldDeltaNum: 0,
        rotateTopFlag: false,
        rotateBottomFlag: false
      }
    },
    mounted () {
      this.oldNum = this.num
      this.oldDeltaNum = this.num
    },
    props: {
      num: {
        type: Number,
        default: 0
      }
    },
    watch: {
      num (newVal, oldVal) {
        if (oldVal === newVal) return
        else {
          if (this.timer) clearTimeout(this.timer)
          this.rotateTopFlag = true
          this.timer = setTimeout(() => {
            this.rotateTopFlag = false
            this.rotateBottomFlag = true
            this.oldNum = newVal
            this.timer = setTimeout(() => {
              this.rotateBottomFlag = false
              this.oldDeltaNum = newVal
            }, 400)
          }, 400)
        }
      }
    },
    methods: {},
    components: {}
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  @keyframes rotateTop {
    0% {
      transform: rotateX(0);
    }
    100% {
      transform: rotateX(-90deg);
    }
  }

  @keyframes rotateBottom {
    0% {
      transform: rotateX(90deg);
    }
    100% {
      transform: rotateX(0);
    }
  }

  .rotateTop {
    animation: rotateTop 0.4s linear;
  }

  .rotateBottom {
    animation: rotateBottom 0.4s linear;
  }

  .date-bit {
    position: relative;
    width: 100px;
    height: 150px;
    background-color: rgb(51, 51, 51);
    font-size: 160px;
    line-height: 1;
    color: rgb(204, 204, 204);
    .bit-top, .bit-bottom, .bit-behind {
      position: absolute;
      left: 0;
      right: 0;
    }
    .bit-top {
      top: 0;
      height: 50%;
      overflow: hidden;
      z-index: 2;
      background-color: rgb(51, 51, 51);
      transform-origin: bottom;
    }
    .bit-bottom {
      bottom: 0;
      height: 50%;
      overflow: hidden;
      z-index: 2;
      background-color: rgb(51, 51, 51);
      transform-origin: top;
      .sub {
        position: relative;
        top: -100%;
      }
    }
    .bit-behind {
      top: 0;
      bottom: 0;
      z-index: 1;
    }
  }
</style>
