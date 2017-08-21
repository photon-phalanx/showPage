<template>
  <div class="progress">
    <div class="container">
      <my-title title="进度"></my-title>
    </div>
    <div class="progress-bar-wrapper">
      <img src="./totalProgress.png" class="img"/>
      <progressing-bar class="progressing-bar"></progressing-bar>
      <div class="flag-wrapper" v-if="dataProps.length">
        <flag class="flag" v-for="(item, index) in dataProps" :detail="item" :key="item[0]"></flag>
      </div>
      <board v-for="(item, index) in boardList" key="item" :class="{reverse: index % 2 === 0}"
             :style="calcBoardPos(index)" :list="item" :reverseFlag="!(index % 2)"></board>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import MyTitle from 'base/my-title/MyTitle'
  import Flag from 'base/flag/Flag'
  import Board from 'base/board/Board'
  import ProgressingBar from 'base/progressing-bar/ProgressingBar'
  const PROGRESS_WIDTH = '1250'
  export default {
    data () {
      return {
        dataProps: [[1, 0, 0], [2, 0, 100], [3, 0, 15]],
        boardList: []
      }
    },
    mounted () {
      this.getProgressData()
    },
    props: {},
    methods: {
      calcBoardPos (i) {
        return {left: i * PROGRESS_WIDTH / 10 - 28 + 'px'}
      },
      getProgressData () {
        setTimeout(() => {
          axios.get('/api/getProgressData').then((res) => {
            let arr = res.data.data
            let boardList = []
            arr.forEach((item) => {
              item[2] = parseInt(item[2])
            })
            arr.sort((a, b) => {
              return b - a
            })
            arr.forEach((item) => {
              let progress = item[2]
              for (let i = 1; i * 10 < progress; i++) {
                if (!boardList[i - 1]) boardList[i - 1] = []
                boardList[i - 1].push(item)
              }
            })
            this.boardList = boardList
            this.dataProps = arr
          })
        }, 2000)
      }
    },
    components: {
      MyTitle,
      Flag,
      Board,
      ProgressingBar
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
      .progressing-bar {
        position: absolute;
        top: 56px;
        width: 100%;
        box-sizing: border-box;
        left: -10px;
        z-index: 10;
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
