<template>
  <div class="count-down">
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        deadTime: 0,
        hour: 0,
        minute: 0,
        second: 0
      }
    },
    mounted () {
      if (this.deadline instanceof Date) this.deadTime = this.deadline.valueOf()
      else this.deadTime = this.deadline
      this.updateTime()
    },
    props: {
      deadline: {
        type: Date,
        required: true
      }
    },
    methods: {
      updateTime () {
        let date = new Date().valueOf()
        let delta = date - this.deadTime
        this.hour = Math.floor(delta / 1000 / 60 / 60)
        this.minute = Math.floor(delta / 1000 / 60) % 60
        this.second = Math.floor(delta / 1000) % 60
        setTimeout(() => {
          this.updateTime()
        }, 1000)
      }
    },
    components: {}
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  @import "~common/scss/variable";
  @import "~common/scss/mixin";
</style>
