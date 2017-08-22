<template>
  <div class="rank">
    <div class="container">
      <my-title title="排行榜"></my-title>
    </div>
    <div class="list-container">
      <transition-group name="flip-list">
        <div v-for="i in testArr" :key="i" class="item">
          {{i}}
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MyTitle from 'base/my-title/MyTitle'
  export default {
    data () {
      return {
        list: [],
        defaultAvatar: require('./defaultAvatar.png'),
        columnWidth: '100%',
        testArr: [1, 2, 3, 4, 5]
      }
    },
    mounted () {
      setTimeout(() => {
        this.change()
      }, 5000)
    },
    props: {},
    methods: {
      change () {
        this.testArr = [1, 2, 3, 5, 4]
      }
    },
    components: {
      MyTitle
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
    position: fixed;
    width: 1366px;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    background: url(../../assets/bg.jpg);
    background-size: cover;
    .list-container {
      .item {
        width: 100%;
        height: 30px;
        background-color: red;
        &:nth-child(2n+1) {
          background-color: #66ccff;
        }
      }
    }
  }
</style>
