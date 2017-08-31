<template>
  <div class="count-down">
    <date-bit class="bit" :num="bitArr[0]"></date-bit>
    <date-bit class="bit" :num="bitArr[1]"></date-bit>
    <span class="split">:</span>
    <date-bit class="bit" :num="bitArr[2]"></date-bit>
    <date-bit class="bit" :num="bitArr[3]"></date-bit>
    <span class="split">:</span>
    <date-bit class="bit" :num="bitArr[4]"></date-bit>
    <date-bit class="bit" :num="bitArr[5]"></date-bit>
  </div>
</template>

<script type="text/ecmascript-6">
  import DateBit from 'base/date-bit/dateBit'
  export default {
    data () {
      return {
        bitArr: []
      }
    },
    mounted () {
      this.startCountDown()
    },
    activated () {
      this.startCountDown()
    },
    deactivated () {
      clearTimeout(this.timer)
    },
    beforeDestroy () {
      clearTimeout(this.timer)
    },
    props: {
      deadline: {
        required: true,
        default: 0
      }
    },
    watch: {
      deadline (newVal, oldVal) {
        console.log('chg')
        if (newVal === oldVal) return
        else {
          clearTimeout(this.timer)
          this.startCountDown()
        }
      }
    },
    methods: {
      startCountDown () {
        let deadline = this.deadline
        if (deadline instanceof Date) deadline = deadline.getTime()
        deadline = parseInt(deadline)
        let curTime = new Date().getTime()
        let delta = deadline - curTime
        if (delta < 0) {
          this.bitArr = [0, 0, 0, 0, 0, 0]
          return
        }
        delta = parseInt(delta / 1000)
        let second = delta % 60
        let minute = parseInt(delta / 60) % 60
        let hour = parseInt(delta / 60 / 60) % 60
        let arr = []
        arr.push(parseInt(hour / 10))
        arr.push(hour % 10)
        arr.push(parseInt(minute / 10))
        arr.push(minute % 10)
        arr.push(parseInt(second / 10))
        arr.push(second % 10)
        this.bitArr = arr
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.startCountDown()
        }, 1000)
      }
    },
    components: {
      DateBit
    }
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .count-down {
    text-align: center;
    .bit {
      display: inline-block;
      vertical-align: top;
    }
    .split {
      display: inline-block;
      height: 150px;
      font-size: 150px;
      line-height: 150px;
      color: rgb(204, 204, 204);
      vertical-align: top;
    }
  }
</style>
