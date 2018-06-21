<template>
    <div class="activity_items js_activity_items" id="latest_activity">
        <!--<div v-wechat-title="$route.meta.title"></div>-->
        <template v-for="( item, index) in data">
            <router-link :to="{ path:'/shopActivity',query:{ action_id : item.action_id }}" :key="index">
                <div class="activity_items_item" :style="{ backgroundImage: 'url('+item.action_picture+')'}"
                     :data-url='item.action_id'>
                    <div class="activity_items_item_ft">
                        <div class="item_tips">{{ item.action_title }}</div>
                        <!-- <div class="item_ico icon-ai-eye iconfont"><%= item.url %></div>-->
                        <div class="item_ft_info">
                            <div class="item_ft_info_left"><span
                                    class="item_ft_info_left_num">{{ item.join_total }}</span>人已参加
                            </div>
                            <div class="item_ft_info_right" v-if="item.serve_amount">领劵立减{{ item.serve_amount }}元</div>
                        </div>
                    </div>
                </div>
            </router-link>
        </template>
    </div>
</template>

<style>
    body {
        background-color: #f1f1f1;
    }

    .activity_items {
        width: 100%;
    }

    .activity_items_item {
        width: 100%;
        height: 1.875rem;
        background: none center center no-repeat;
        background-size: cover;
        margin-bottom: .0703rem;
        position: relative;
    }

    .activity_items_item_ft {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: .5391rem;
        padding: 0 .1172rem;
        box-sizing: border-box;
        background-color: #fff;
    }

    .activity_items_item_ft .item_tips {
        font-size: .1523rem;
        color: #333;
        height: 0.2813rem;
        line-height: 0.2813rem;
    }

    .activity_items_item_ft .item_ico {
        width: 16%;
        color: #fff;
        font-size: .1641rem;
        text-align: right;
    }

    .activity_items_item_ft .item_ico:before {
        margin-right: .0469rem;
        font-size: .1641rem;
    }

    .item_ft_info {
        font-size: .12rem;
        height: 0.24rem;
        line-height: .24rem;
        color: #999;
    }

    .item_ft_info_left {
        float: left;
    }

    .item_ft_info_left_num {
        color: #ffda45;
    }

    .item_ft_info_right {
        float: right;
        color: #333;
    }
</style>

<script>
export default {
  data () {
    return {
      data: [
        {
          'action_picture': 'http://img2.imgtn.bdimg.com/it/u=3588772980,2454248748&fm=27&gp=0.jpg',
          'action_id': '123',
          'action_title': '测试测试测试',
          'join_total': '102',
          'serve_amount': '12'
        },
        {
          'action_picture': 'http://img2.imgtn.bdimg.com/it/u=3588772980,2454248748&fm=27&gp=0.jpg',
          'action_id': '123',
          'action_title': '测试测试测试',
          'join_total': '102',
          'serve_amount': '12'
        }
      ]
    }
  },
  computed: {
    /* 实现某一属性的实时计算 */
  },
  watched: {
    /* 检测某一属性值的变化 */
  },
  methods: {
    /* 组件内部的方法 */
    init () {
      let that = this
      this.$http.ShopActionInfo({
        openid: window.localStorage.getItem('openId') || window.sessionStorage.getItem('openId'),
        data: JSON.stringify({
          'pag_no': 1,
          'pag_num': 10
        })
      }).then(res => {
        if (res.success && res.content) {
          that.data = res.content.shopactioninfo
        }
      })
    }
  },
  beforeCreate: function () {
    /* 创建前状态 */
  },
  /* 1.在beforeCreate和created钩子之间，程序开始监控Data对象数据的变化及vue内部的初始化事件 */
  created: function () {
    /* 创建完毕状态 */
    this.init()
  },
  /**
   * 2.在created和beforeMount之间，判断是否有el选项，若有则继续编译，无，则暂停生命周期；
   * 然后程序会判断是否有templete参数选项，若有，则将其作为模板编译成render函数。若无，则将外部html作为模板编译（template优先级比外部html高）*
   * */
  beforeMount: function () {
    /* 载入前状态 */
  },
  /**
   * 3.在beforeMount和mounted之间，程序将上一步编辑好的html内容替换el属性指向的dom对象或者选择权对应的html标签里面的内容
   *
   * */
  mounted: function () {
    /* 载入后状态 */

  },
  /**
   * 4.mounted和beforeUpdate之间，程序实时监控数据变化
   *
   * */
  beforeUpdate: function () {
    /* 更新前状态 */
  },
  /**
   * 5.beforeUpdate和updated之间，实时更新dom
   *
   * */
  updated: function () {
    /* 更新后状态 */
  },
  beforeDestroy: function () {
    /* 销毁前状态 */
  },
  /**
   * 6.实例销毁
   *
   * */
  destroyed: function () {
    /* 销毁后状态 */
  }
}
</script>
