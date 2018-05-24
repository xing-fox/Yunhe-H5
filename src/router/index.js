import Vue from 'vue'
import Router from 'vue-router'
Vue.use(require('vue-wechat-title'))

/*
** @/view/index 逛逛页面
** @/view/details 逛逛页面详情
*/
const Index = resolve => require(['@/view/index'], resolve)
const Details = resolve => require(['@/view/details'], resolve)
const Praise = resolve => require(['@/view/praise'], resolve)
const Evalmore = resolve => require(['@/view/evalmore'], resolve)
const Coupon = resolve => require(['@/view/coupon'], resolve)
const Nearbystore = resolve => require(['@/view/nearbystore'], resolve)
const Personal = resolve => require(['@/view/personal'], resolve)
const Chat = resolve => require(['@/view/chat'], resolve)
const Chatdetail = resolve => require(['@/view/chatdetail'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/wechat_pub/stroll',
      name: 'Index',
      component: Index,
      meta: {
        title: '潮机笔记'
      },
      children: [
        {
          path: 'details',
          component: Details,
          meta: {
            title: '笔记详情'
          },
          children: [
            {
              path: 'praise',
              component: Praise
            },
            {
              path: 'evalmore',
              component: Evalmore
            }
          ]
        }
      ]
    },
    {
      path: '/wechat_pub/coupon',
      name: 'Coupon',
      component: Coupon,
      meta: {
        title: '我的优惠券'
      }
    },
    {
      path: '/wechat_pub/chat',
      name: 'Chat',
      component: Chat,
      meta: {
        title: '微聊'
      },
      children: [
        {
          path: 'chatdetail',
          component: Chatdetail,
          meta: {
            title: '答案详情'
          }
        }
      ]
    },
    {
      path: '/wechat_pub/personal',
      name: 'Personal',
      component: Personal,
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/wechat_pub/bystore',
      name: 'Nearbystore',
      component: Nearbystore,
      meta: {
        title: '附近门店'
      },
      children: [
        {
          path: 'details',
          component: Details,
          meta: {
            title: '笔记详情'
          },
          children: [
            {
              path: 'praise',
              component: Praise
            },
            {
              path: 'evalmore',
              component: Evalmore
            }
          ]
        }
      ]
    }
  ]
})
