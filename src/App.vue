<template>
  <div id="app">
    <div class="container">
      <div class="nav">
        <router-link :to="{name: 'progress'}">进度</router-link>
        <router-link :to="{name: 'rank'}">排行榜</router-link>
        <router-link :to="{name: 'battlefield'}">战况</router-link>
      </div>
      <div class="router-view-wrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .container {
    position: fixed;
    width: 1366px;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    background: url(assets/bg.jpg);
    background-size: cover;
    .nav {
      width: 1100px;
      margin: 60px auto;
      height: 70px;
      border-radius: 20px;
      background-color: $title-blue-alpha;
      >* {
        display: inline-block;
        box-sizing: border-box;
        text-align: center;
        font-weight: bold;
        width: 150px;
        margin: 0 100px;
        height: 70px;
        line-height: 70px;
        font-size: 25px;
        text-decoration: none;
        color: $color-blue;
        &:hover, &.router-link-active {
          background-color: $title-blue-alpha;
          color: #fff;
        }
      }
    }
    .router-view-wrapper {
      position: absolute;
      top: 190px;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
</style>
