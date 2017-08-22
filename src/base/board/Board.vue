<template>
  <transition name="fade">
    <div class="board" v-show="list && list.length">
      <div class="content-wrapper" :class="{reverse: reverseFlag}">
        <div class="text-wrapper" :style="{transform: scrollOffset}">
          <div class="text" v-for="(item, index) in list">{{item[1]}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  // 每个框显示3行
  const SHOW_NUMBER = 3
  export default {
    data () {
      return {
        currentOffsetPage: 0
      }
    },
    created () {
      this.timer = null
    },
    mounted () {
      if (this.list.length >= SHOW_NUMBER) this.doScroll()
    },
    watch: {
      list (newVal, oldVal) {
        if (newVal.length === oldVal.length) return
        if (this.timer) clearTimeout(this.timer)
        this.currentOffsetPage = 0
        this.doScroll()
      }
    },
    props: {
      list: {
        type: Array,
        default: () => {
          return []
        }
      },
      reverseFlag: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      doScroll () {
        this.timer = setTimeout(() => {
          if (this.list.length / SHOW_NUMBER - 1 > this.currentOffsetPage) this.currentOffsetPage++
          else this.currentOffsetPage = 0
          this.doScroll()
        }, 3000)
      }
    },
    computed: {
      scrollOffset () {
        let offset = this.currentOffsetPage * 105
        return `translate3d(0, ${-offset}px,0)`
      }
    }
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .fade-enter-active {
    transition: all 0.4s linear;
  }

  .fade-enter {
    opacity: 0;
  }

  .board {
    width: 150px;
    height: 248px;
    background: url(./board.png);
    background-size: cover;
    .content-wrapper {
      position: absolute;
      left: 0;
      right: 0;
      height: 108px;
      bottom: 0;
      overflow: hidden;
      &.reverse {
        transform: rotate(-180deg);
      }
      .text-wrapper {
        width: 100%;
        text-align: center;
        font-size: 25px;
        line-height: 1.4;
        color: #00ff00;
        transition: all 1s linear;
        .text {
          width: 100%;
          @include no-wrap();
        }
      }
    }
  }
</style>
