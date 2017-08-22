<template>
  <div class="battlefield-wrapper" ref="battlefieldWrapper">
    <div class="battlefield" ref="battlefield">
      <div class="title-wrapper">
        <span class="team-name"></span>
        <span class="visible-horizontal">
        <span class="question-wrapper">
          <span class="question" v-for="i in totalNumber"><span class="number">{{i}}</span></span>
        </span>
      </span>
      </div>
      <div class="visible-vertical" ref="visibleVertical">
        <div class="team-wrapper">
          <div class="team" v-for="(team, index) in list">
            <span class="team-name">123</span>
            <span class="visible-horizontal">
              <span class="question-wrapper">
                <span class="question" v-for="question in team"><img :src="choosePic(question)" class="resolve"/></span>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div class="triangle triangle-up" @click="pageDown()" v-show="currentPage !== 0"></div>
      <div class="triangle triangle-down" @click="pageUp()"></div>
      <div class="triangle triangle-left" @click="pageLeft()" v-show="currentHorizontalPage !== 0"></div>
      <div class="triangle triangle-right" @click="pageRight()"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        // 总题数,
        list: [[0, 1, 1, 1, 1, 2, 3, 1, 4, 1], [0, 1, 1, 1, 1, 2, 3, 1, 4, 1], [0, 1, 1, 1, 1, 2, 3, 1, 4, 1],
          [0, 1, 1, 1, 1, 2, 3, 1, 4, 1], [0, 1, 1, 1, 1, 2, 3, 1, 4, 1], [0, 1, 1, 1, 1, 2, 3, 1, 4, 1],
          [0, 1, 1, 1, 1, 2, 3, 1, 4, 1], [0, 1, 1, 1, 1, 2, 3, 1, 4, 1], [0, 1, 1, 1, 1, 2, 3, 1, 4, 1],
          [0, 1, 1, 1, 1, 2, 3, 1, 4, 1], [0, 1, 1, 1, 1, 2, 3, 1, 4, 1], [0, 1, 1, 1, 1, 2, 3, 1, 4, 1],
          [0, 1, 1, 1, 1, 2, 3, 1, 4, 1], [0, 1, 1, 1, 1, 2, 3, 1, 4, 1], [0, 1, 1, 1, 1, 2, 3, 1, 4, 1],
          [0, 1, 1, 1, 1, 2, 3, 1, 4, 1], [0, 1, 1, 1, 1, 2, 3, 1, 4, 1], [0, 1, 1, 1, 1, 2, 3, 1, 4, 1]
        ],
        totalNumber: 10,
        horizontalScrollWidth: 1080,
        pageLen: 0,
        visibleHeight: 0,
        currentPage: 0,
        currentHorizontalPage: 0,
        firstPic: require('./first.png'),
        secondPic: require('./second.png'),
        thirdPic: require('./third.png'),
        finishPic: require('./finish.png')
      }
    },
    mounted () {
      this.initVisibleHeight()
    },
    props: {},
    methods: {
      initVisibleHeight () {
        let height = this.$refs.battlefieldWrapper.clientHeight
        this.pageLen = Math.floor(height / 50) - 2
        this.visibleHeight = this.pageLen * 50
        this.$refs.battlefield.style.height = this.visibleHeight + 50 + 'px'
        this.$refs.visibleVertical.style.height = this.visibleHeight + 'px'
      },
      choosePic (question) {
        // 这里的都是测试数据,因为不知道具体情况
        if (question === 0) {
          return ''
        } else if (question === 1) {
          return this.firstPic
        } else if (question === 2) {
          return this.secondPic
        } else if (question === 3) {
          return this.thirdPic
        } else {
          return this.finishPic
        }
      },
      pageUp () {
        if ((this.currentPage + 1) * this.pageLen > this.list.length) return
        this.currentPage++
      },
      pageDown () {
        if (this.currentPage === 0) return
        this.currentPage--
      },
      pageLeft () {
        if (this.currentHorizontalPage === 0) return
        this.currentHorizontalPage--
      },
      pageRight () {
        if ((this.currentHorizontalPage + 1) * 18 > this.totalNumber) return
        this.currentHorizontalPage++
      }
    },
    components: {}
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .battlefield-wrapper {
    width: 100%;
    height: 100%;
    .battlefield {
      position: relative;
      background-color: $container-bg-alpha;
      .triangle {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 20px solid $color-blue;
      }
      .triangle-up {
        position: absolute;
        top: 10px;
        left: 100px;
      }
      .triangle-down {
        position: absolute;
        transform: rotate(180deg);
        bottom: -20px;
        left: 100px;
      }
      .triangle-left {
        position: absolute;
        transform: rotate(-90deg);
        top: 10px;
        left: 180px;
      }
      .triangle-right {
        position: absolute;
        transform: rotate(90deg);
        top: 10px;
        right: 0;
      }
      .team-name, .question {
        display: inline-block;
        box-sizing: border-box;
        width: 40px;
        margin: 0 10px;
        height: 40px;
        font-size: 22px;
        line-height: 40px;
        color: #fff;
        text-align: center;
        vertical-align: top;
        .number {
        }
      }
      .team-name {
        display: inline-block;
        width: 200px;
        text-align: center;
        border: none;
      }
      .visible-horizontal {
        display: inline-block;
        height: 40px;
        width: 1080px;
        overflow: hidden;
      }
      .title-wrapper {
        @include no-wrap();
        .question {
          border-radius: 50%;
          border: 1px solid #fff;
        }
      }
      .team-wrapper {
        @include no-wrap();
      }
      .visible-vertical {
        overflow: hidden;
        .team {
          height: 40px;
          padding: 5px 0;
          .question {
            text-align: center;
            .resolve {
              width: 34px;
              height: auto;
            }
          }
        }
      }
    }
  }
</style>
