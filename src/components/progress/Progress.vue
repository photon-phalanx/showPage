<template>
  <div class="progress">
    <div class="progress-bar-wrapper">
      <img src="./totalProgress.png" class="img"/>
      <progressing-bar class="progressing-bar" :process="process"></progressing-bar>
      <div class="flag-wrapper" v-if="dataProps.length">
        <flag class="flag" v-for="(item, index) in dataProps" :index="index" :detail="item" :key="item[0]"></flag>
      </div>
      <board v-for="(item, index) in boardList" key="item" :class="{reverse: index % 2 === 0}"
             :style="calcBoardPos(index)" :list="item" :reverseFlag="!(index % 2)"></board>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import Flag from 'base/flag/Flag'
  import Board from 'base/board/Board'
  import {tabMixin} from 'common/js/mixins'
  import {axiosPath} from 'common/js/config'
  import ProgressingBar from 'base/progressing-bar/ProgressingBar'
  const PROGRESS_WIDTH = '1175'
  export default {
    data () {
      return {
        dataProps: [],
        boardList: [],
        process: 0
      }
    },
    created () {
      this.timer = null
    },
    mounted () {
      this.getProgressData()
    },
    mixins: [tabMixin],
    props: {},
    methods: {
      calcBoardPos (i) {
        return {left: i * PROGRESS_WIDTH / 10 + 138 + 'px'}
      },
      getProgressData () {
        axios.get(axiosPath + 'getProgress').then((res) => {
          let arr = res.data.data
          let boardList = []
          arr.forEach((item) => {
            item[3] = parseInt(item[3])
          })
          arr.sort((a, b) => {
            return a[3] - b[3]
          })
          arr.forEach((item) => {
            let progress = item[3]
            let index = Math.floor(progress / 10) - 1
            if (index >= 0) {
              if (!boardList[index]) boardList[index] = []
              boardList[index].push(item)
            }
          })
          this.boardList = boardList
          this.dataProps = arr
          this.process = parseFloat(res.data.process)
          this.timer = setTimeout(() => {
            this.getProgressData()
          }, 5000)
        })
      }
    },
    components: {
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
    width: 100%;
    height: 100%;
    .progress-bar-wrapper {
      position: absolute;
      width: 100%;
      box-sizing: border-box;
      padding: 0 50px 0 70px;
      height: 200px;
      top: 60%;
      left: 0;
      transform: translate3d(0, -50%, 0);
      .img {
        width: 100%;
        height: auto;
      }
      .progressing-bar {
        position: absolute;
        top: 52px;
        width: 100%;
        box-sizing: border-box;
        left: 87px;
        z-index: 100;
      }
      .flag {
        position: absolute;
        top: -45px;
        left: 88px;
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
