import Vue from 'vue'
import Router from 'vue-router'
import Progress from '@/components/progress/Progress'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'progress',
      component: Progress
    }
  ]
})
