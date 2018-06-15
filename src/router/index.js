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
const Talk = resolve => require(['@/view/talk'], resolve)
const Complain = resolve => require(['@/view/complain'], resolve)
const Evaluate = resolve => require(['@/view/evaluate'], resolve)
const MobileService = resolve => require(['@/view/mobileService'], resolve)
const PhoneBill = resolve => require(['@/view/phoneBill'], resolve)

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
    },
    {
      path: '/wechat_pub/talk',
      name: 'Talk',
      component: Talk,
      meta: {
        title: '聊天'
      }
    },
    {
      path: '/wechat_pub/complain',
      name: 'Complain',
      component: Complain,
      meta: {
        title: '投诉意见'
      }
    },
    /* 客户评价 */
    {
      path: '/wechat_pub/evaluate',
      name: 'Evaluate',
      component: Evaluate,
      meta: {
        title: '客户评价'
      }
    },
    /* 移动业务 */
    {
      path: '/wechat_pub/mobileService',
      name: 'MobileService',
      component: MobileService,
      meta: {
        title: '移动业务'
      }
    },
    /** 话费充值 */
    {
      path: '/wechat_pub/phoneBill',
      name: 'PhoneBill',
      component: PhoneBill,
      meta: {
        title: '话费充值'
      }
    }
  ]
})
