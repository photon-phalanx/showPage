import Vue from 'vue'
import Router from 'vue-router'
import Progress from '@/components/progress/Progress'
import Rank from '@/components/rank/Rank'
import Battlefield from '@/components/battlefield/Battlefield'
import CountDown from '@/base/count-down/countDown'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/progress',
      name: 'progress',
      component: Progress
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
      path: '/battlefield',
      name: 'battlefield',
      component: Battlefield
    },
    {
      path: '/countDown',
      name: 'countDown',
      component: CountDown
    },
    {
      path: '/',
      redirect: {name: 'progress'}
    }
  ]
})
