<template>
  <div class="rank" ref="rank">
    <div class="content-wrapper" ref="contentWrapper">
      <div class="countdown-wrapper">
        <count-down :deadline="deadline"></count-down>
      </div>
      <div class="title">
        <span class="tab">名次</span>
        <span class="tab">战队名</span>
        <span class="tab">LOGO</span>
        <span class="tab">解题数量</span>
        <span class="tab line-large">末次时间</span>
        <span class="tab">分数</span>
      </div>
      <div class="visible" ref="visible">
        <div class="item-wrapper" :style="{transform: calcCurrentPos}">
          <transition-group name="flip-list">
            <div class="item" v-for="(item, index) in list" :key="item.id">
              <span class="tab">{{index + 1}}</span>
              <span class="tab">{{item.user_name}}</span>
              <span class="tab"><img :src="item.avatar || defaultAvatar" class="avatar" @error="handleError($event)"/></span>
              <span class="tab">{{item.game_problem_record}}</span>
              <span class="tab line-large">{{serializeDate(item.last_answer)}}</span>
              <span class="tab">{{item.game_user_score}}</span>
            </div>
          </transition-group>
        </div>
      </div>
      <div class="triangle triangle-up" @click="pageDown()" v-show="currentPage !== 0"></div>
      <div class="triangle triangle-down" @click="pageUp()" v-show="(currentPage + 1) * pageLen < list.length"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MyTitle from 'base/my-title/MyTitle'
  import CountDown from 'base/count-down/countDown'
  import {serializeDate} from 'common/js/util'
  import {axiosPath} from 'common/js/config'
  import axios from 'axios'

  export default {
    data () {
      return {
        list: [],
        defaultAvatar: require('./defaultAvatar.png'),
        pageLen: 0,
        currentPage: 0,
        visibleHeight: 0,
        deadline: 0
      }
    },
    mounted () {
      this.initVisibleHeight()
      this.getRank()
    },
    activated () {
      this.initVisibleHeight()
      this.getRank()
    },
    deactivated () {
      clearTimeout(this.timer)
    },
    beforeDestroy () {
      clearTimeout(this.timer)
    },
    props: {},
    methods: {
      serializeDate (time) {
        return serializeDate(time, 'YYYY/MM/DD hh:mm:ss')
      },
      initVisibleHeight () {
        let height = this.$refs.rank.clientHeight
        this.pageLen = Math.floor(height / 40) - 2
        this.visibleHeight = this.pageLen * 40
        this.$refs.contentWrapper.style.height = this.visibleHeight + 40 + 'px'
        this.$refs.visible.style.height = this.visibleHeight + 'px'
      },
      handleError (e) {
        e.target.src = this.defaultAvatar
      },
      sort (data) {
        return data.sort(function (a, b) {
          if (a.game_user_score !== b.game_user_score) return b.game_user_score - a.game_user_score
          else return a.timestamp - b.timestamp
        })
      },
      addTimestamp (data) {
        data.forEach((item) => {
          item.timestamp = new Date(item.last_answer)
        })
        return data
      },
      getRank () {
        axios.get(axiosPath + 'getRank').then((res) => {
          let data = res.data.game_user
          data = this.addTimestamp(data)
          data = this.sort(data)
          this.list = data
          this.deadline = parseInt(res.data.end_time)
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            this.getRank()
          }, 10000)
        })
      },
      pageUp () {
        if ((this.currentPage + 1) * this.pageLen > this.list.length) return
        this.currentPage++
      },
      pageDown () {
        if (this.currentPage === 0) return
        this.currentPage--
      }
    },
    watch: {
      list (newVal, oldVal) {
        if (newVal.length !== oldVal.length) this.currentPage = 0
      }
    },
    computed: {
      calcCurrentPos () {
        let pageHeight = this.visibleHeight
        let offsetHeight = this.currentPage * pageHeight
        return `translate3d(0, ${-offsetHeight}px, 0)`
      }
    },
    components: {
      MyTitle,
      CountDown
    }
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .flip-list-move {
    transition: transform 1s;
  }

  .rank {
    width: 100%;
    height: 100%;
    .content-wrapper {
      position: relative;
      width: 1100px;
      margin: 0 auto;
      background-color: $container-bg-alpha;
      font-size: 0;
      font-weight: bold;
      .countdown-wrapper {
        position: absolute;
        top: -100px;
        left: 50%;
        width: 900px;
        transform: translate3d(-50%, 0, 0) scale(0.2);
      }
      .tab {
        font-size: 22px;
        line-height: 40px;
        height: 40px;
        display: inline-block;
        box-sizing: border-box;
        width: 15%;
        text-align: center;
        color: $color-blue;
        @include no-wrap();
      }
      .line-large {
        width: 25%;
      }
      .visible {
        height: 400px;
        overflow: hidden;
        .item-wrapper {
          transition: all 1s linear;
          .item {
            .tab {
              color: #fff;
              .avatar {
                height: 80%;
                width: auto;
                border-radius: 50%;
                padding-top: 4px;
              }
            }
            &:nth-child(odd) {
              background-color: $line-bg-alpha;
            }
          }
        }
      }
      .triangle {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 20px solid $color-blue;
      }
      .triangle-up {
        position: absolute;
        top: 50px;
        left: 0;
      }
      .triangle-down {
        position: absolute;
        transform: rotate(180deg);
        bottom: 10px;
        left: 0;
      }
    }
  }
</style>
