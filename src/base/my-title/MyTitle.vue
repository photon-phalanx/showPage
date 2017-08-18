<template>
  <div class="title">
    <p class="text">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    },
    mounted () {
    },
    props: {
      title: {
        type: String
      }
    },
    methods: {},
    components: {}
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .title {
    .text {
      display: block;
      width: 120px;
      height: 50px;
      margin: 0 auto;
      border-radius: 20px;
      color: #fff;
      font-size: 20px;
      text-align: center;
      line-height: 50px;
      background-color: rgba(7, 17, 27, 0.8);
    }
  }
</style>
