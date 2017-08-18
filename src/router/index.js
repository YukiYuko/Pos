import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/page/Pos'
import Hotel from '@/components/page/Hotel'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'pos',
      component: Pos
    },
    {
      path: '/hotel',
      name: 'hotel',
      component: Hotel
    }
  ]
})
export default router
