<template>
     <div class="content_div">
        <div class="activity_items js_activity_items" id="latest_activity" @scroll="scrollFunc" ref="shopBox">
            <!--<div v-wechat-title="$route.meta.title"></div>-->
            <template v-for="( item, index) in data">
                <router-link :to="{ path:'/wechat_pub/shopActivity',query:{ action_id : item.action_id }}" :key="index">
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
        <loading v-show="isLoad"></loading>
    </div>
</template>

<style>
body {
  background-color: #f1f1f1;
}

.activity_items {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #fff;
  overflow: scroll;
}

.activity_items_item {
  width: 100%;
  height: 1.875rem;
  background: none center center no-repeat;
  background-size: cover;
  margin-bottom: 0.0703rem;
  position: relative;
}

.activity_items_item_ft {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.5391rem;
  padding: 0 0.1172rem;
  box-sizing: border-box;
  background-color: #fff;
}

.activity_items_item_ft .item_tips {
  font-size: 0.1523rem;
  color: #333;
  height: 0.2813rem;
  line-height: 0.2813rem;
}

.activity_items_item_ft .item_ico {
  width: 16%;
  color: #fff;
  font-size: 0.1641rem;
  text-align: right;
}

.activity_items_item_ft .item_ico:before {
  margin-right: 0.0469rem;
  font-size: 0.1641rem;
}

.item_ft_info {
  font-size: 0.12rem;
  height: 0.24rem;
  line-height: 0.24rem;
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
import loading from '../components/loading'
export default {
  name: 'latestActivities',
  components: {
    loading
  },
  data () {
    return {
      data: [],
      noMoreComments: false,
      pageNub: 1,
      isLoad: false
    }
  },
  computed: {
    /* 实现某一属性的实时计算 */
  },
  watched: {
    /* 检测某一属性值的变化 */
  },
  methods: {
    scrollFunc () {
      if (
        this.$refs.shopBox.scrollTop + document.body.clientHeight + 50 >
          this.$refs.shopBox.scrollHeight &&
        !this.noMoreComments
      ) {
        this.noMoreComments = true
        this.pageNub++
        this.init()
        console.log(this.pageNub)
      }
    },

    /* 组件内部的方法 */
    init () {
      let that = this
      that.isLoad = true
      this.$http
        .ShopActionInfo({
          openid:
            window.localStorage.getItem('openId') ||
            window.sessionStorage.getItem('openId'),
          data: JSON.stringify({
            pag_no: that.pageNub,
            pag_num: 5
          })
        })
        .then(res => {
          that.isLoad = false
          if (res.code === 'E00000') {
            if (
              res.content.shopactioninfo &&
              res.content.shopactioninfo.length > 0
            ) {
              that.data = that.data.concat(res.content.shopactioninfo)
            }
            that.noMoreComments = false
          } else {
            that.noMoreComments = true
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
    this.pageNub = 1
    this.noMoreComments = false
    this.init()
    console.log('开始创建')
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
