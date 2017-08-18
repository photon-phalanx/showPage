<template>
  <div class="progress">
    <div class="container">
      <my-title title="进度"></my-title>
    </div>
    <div class="progress-bar-wrapper">
      <img src="./totalProgress.png" class="img"/>
      <div class="flag-wrapper" v-if="dataProps.length">
        <flag class="flag" v-for="(item, index) in dataProps" :detail="item" :key="item[0]"></flag>
      </div>
      <board v-for="i in 10" key="i" :class="{reverse: i % 2 === 0}" :style="calcBoardPos(i)"
             :reverseFlag="!(i % 2)"></board>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MyTitle from 'base/my-title/MyTitle'
  import Flag from 'base/flag/Flag'
  import Board from 'base/board/Board'

  const PROGRESS_WIDTH = '1250'
  export default {
    data () {
      return {
        dataProps: [[1, 0, 0], [2, 0, 100], [3, 0, 15]]
      }
    },
    mounted () {
      let self = this
      setTimeout(function () {
        self.testPos = '300px'
      }, 3000)
    },
    props: {},
    methods: {
      calcBoardPos (i) {
        return {left: i * PROGRESS_WIDTH / 10 - 28 + 'px'}
      }
    },
    components: {
      MyTitle,
      Flag,
      Board
    }
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .progress {
    position: fixed;
    width: 1366px;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    background: url(../../assets/bg.jpg);
    background-size: cover;
    .progress-bar-wrapper {
      position: absolute;
      width: 100%;
      box-sizing: border-box;
      padding: 0 20px;
      height: 200px;
      top: 50%;
      left: 0;
      transform: translate3d(0, -50%, 0);
      .img {
        width: 100%;
        height: auto;
      }
      .flag {
        position: absolute;
        top: -40px;
        left: 42px;
      }
      .board {
        position: absolute;
        top: 65px;
        &.reverse {
          top: -180px;
          transform: rotate(180deg);
        }
      }
    }
  }
</style>
