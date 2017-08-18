<template>
  <div class="rank">
    <div class="container">
      <my-title title="排行榜"></my-title>
    </div>
    <div class="person-container">
      <div v-for="col in column" :style="{width: columnWidth}" class="column">
        <div v-for="i in row" v-if="list[(col - 1) * row + i - 1]" class="item">
          <div class="ranking-wrapper">
            <div class="ranking">{{(col - 1) * row + i}}</div>
          </div>
          <div class="avatar-wrapper">
            <div class="avatar-container">
              <img :src="list[(col - 1) * row + i - 1][0]|| defaultAvatar" class="avatar"/>
            </div>
          </div>
          <div class="text-wrapper">
            <span class="text">X{{list[(col - 1) * row + i - 1][1]}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MyTitle from 'base/my-title/MyTitle'
  export default {
    data () {
      return {
        list: [],
        column: 1,
        row: 5, // 其实这个是const的，是总共有5行，column是计算会有几列,
        defaultAvatar: require('./defaultAvatar.png'),
        columnWidth: '100%'
      }
    },
    mounted () {
      setTimeout(() => {
        this.list = [['', 47], ['', 35], ['', 47], ['', 35], ['', 47], ['', 47]]
      }, 5000)
    },
    watch: {
      list (newValue, oldValue) {
        this.column = Math.min(Math.floor(newValue.length / 5) + 1, 4)
        this.columnWidth = 100 / this.column + '%'
      }
    },
    props: {},
    methods: {},
    components: {
      MyTitle
    }
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .rank {
    position: fixed;
    width: 1366px;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    background: url(../../assets/bg.jpg);
    background-size: cover;
    .person-container {
      margin: 0 auto;
      width: 1366px;
      .column {
        display: inline-block;
        vertical-align: top;
        box-sizing: border-box;
        border-right: 3px solid #fff;
        &:last-child {
          border-right: none;
        }
        .item {
          height: 100px;
          font-size: 35px;
          font-weight: bold;
          color: #fff;
          .avatar-wrapper, .text-wrapper, .ranking-wrapper {
            vertical-align: top;
            display: inline-block;
            text-align: center;
            line-height: 100px;
          }
          .ranking-wrapper {
            width: 20%;
          }
          .avatar-wrapper {
            width: 20%;
            .avatar-container {
              width: 60px;
              height: 60px;
              border-radius: 50%;
              margin: 20px auto 0;
            }
          }
          .text-wrapper {
            width: 53%;
            text-align: center;

          }
          .avatar {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            vertical-align: top;
          }
        }
      }
    }
  }
</style>
