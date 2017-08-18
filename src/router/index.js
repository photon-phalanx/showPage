import Vue from 'vue'
import Router from 'vue-router'
import Progress from '@/components/progress/Progress'
import Rank from '@/components/rank/Rank'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'progress',
      component: Progress
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    }
  ]
})
