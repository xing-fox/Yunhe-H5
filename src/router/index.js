import Vue from 'vue'
import Router from 'vue-router'
/*
** @/view/index 逛逛页面
** @/view/details 逛逛页面详情
*/
const Index = resolve => require(['@/view/index'], resolve)
const Details = resolve => require(['@/view/details'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/stroll',
      name: 'Index',
      component: Index,
      children: [
        {
          path: 'details',
          name: 'Details',
          component: Details
        }
      ]
    }
  ]
})
