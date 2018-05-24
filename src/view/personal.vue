<template>
  <div class="page">
    <div class="header">
      <div class="userinfo">
        <div class="userPhoto">
          <div class="userImg" type="userAvatarUrl"></div>
        </div>
        <div class="userName" type="userNickName">fox</div>
      </div>
    </div>
    <ul class="tabList">
      <li>
        <div class="count">{{dataList.collection_total}}</div>
        <div class="type">收藏单</div>
      </li>
      <li>
        <div class="count">{{dataList.like_total}}</div>
        <div class="type">点赞数</div>
      </li>
      <li>
        <div class="count">{{ dataList.cur_bal }}</div>
        <div class="type">猿币数</div>
      </li>
    </ul>
    <div class="order">
      <div class="title bor-b"  @click="goToOrderList(0)">
        <span>我的订单</span>
        <i class="icon_right"></i>
      </div>
      <ul class="orderList">
        <li @click="goToOrderList(1)">
          <i class="icon icon_order1" ></i>
          <p>待付款</p>
          <span v-if="dataList.order_waitpay != '0'" class="number">{{ dataList.order_waitpay }}</span>
        </li>
        <li @click="goToOrderList(2)">
          <i class="icon icon_order2"></i>
          <p>待发货</p>
          <span v-if="dataList.order_waitsend != '0'" class="number">{{ dataList.order_waitsend }}</span>
        </li>
        <li @click="goToOrderList(3)">
          <i class="icon icon_order3"></i>
          <p>待收货</p>
          <span v-if="dataList.order_waitreceive != '0'" class="number">{{ dataList.order_waitreceive }}</span>
        </li>
        <li>
          <i class="icon icon_order5"></i>
          <p>退货售后</p>
        </li>
      </ul>
    </div>
    <router-link :to="{ path: '/wechat_pub/coupon'}">
      <div class="coupon bor-1px-b">
        <span>我的优惠券</span>
        <i class="icon_right"></i>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      openId: '',
      dataList: Object,
      userInfos: Object
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.LoadingingStatus(true)
      this.$http.customerInfo({
        openid: window.localStorage.getItem('openId') || window.sessionStorage.getItem('openId')
      }).then(res => {
        this.LoadingingStatus(false)
        if (res.code === 'E00000') {
          this.dataList = res.content
        }
      })
    },
    goToOrderList (index) {},
    goToShopCart () {},
    ...mapActions([
      'LoadingingStatus'
    ])
  }
}
</script>

<style scoped lang="less">
.page {
  background: #f3f5f9;
}
.header {
  width: 100%;
  height: 2.1rem;
  background-image: url("http://test.xclerk.com/mrsyg/YunHaiTongProject/public_tab/image/xcc/bg.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  .userinfo {
    width: 100%;
    position: absolute;
    top: .5rem;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto auto;
    text-align: center;
    .userPhoto {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: .85rem;
      height: .85rem;
      border-radius: 0.425rem;
      overflow: hidden;
      box-sizing: border-box;
      border: 2px solid #fff;
      .userImg {
        display: block;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
      }
    }
    .userName {
      color: #222;
      font-size: .16rem;
      width: 100%;
      position: absolute;
      bottom: .4rem;
      left: 0;
      text-align: center;
    }
  }
}
.tabList {
  width: 100%;
  height: .75rem;
  background: #fff;
  display: flex;
  li {
    flex: 1;
    text-align: center;
    .count {
      color: #222;
      font-size: .18rem;
      margin: .14rem 0 0 0;
    }
    .type {
      color: #999;
      font-size: .14rem;
    }
  }
}
.order {
  width: 100%;
  background: #fff;
  margin: .12rem 0 0 0;
  .title {
    height: .46rem;
    line-height: .46rem;
    margin: 0 0 0 .15rem;
    display: flex;
    span {
      flex: 1;
      color: #222;
      font-size: .15rem;
    }
    .icon_right {
      display: inline-block;
      width: .46rem;
      height: .46rem;
      background-image: url("../images/icon/right.png");
      background-size: 30% 30%;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
  .orderList {
    width: 100%;
    display: flex;
    li {
      flex: 1;
      font-size: 0;
      padding: .1rem 0;
      text-align: center;
      position: relative;
      .icon {
        display: inline-block;
        width: .25rem;
        height: .25rem;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;
        &.icon_order1 {
          background-image: url("../images/icon/icon_order1.png");
        }
        &.icon_order2 {
          background-image: url("../images/icon/icon_order2.png");
        }
        &.icon_order3 {
          background-image: url("../images/icon/icon_order3.png");
        }
        &.icon_order4 {
          background-image: url("../images/icon/icon_order4.png");
        }
        &.icon_order5 {
          background-image: url("../images/icon/icon_order5.png");
        }
      }
      p {
        color: #222;
        font-size: .14rem;
      }
      .number {
        color: #fff;
        font-size: .1rem;
        width: .16rem;
        height: .16rem;
        border-radius: .1rem;
        line-height: .16rem;
        text-align: center;
        box-sizing: border-box;
        position: absolute;
        top: .06rem;
        right: .25rem;
        background: red;
      }
    }
  }
}
.coupon {
  background: #fff;
  height: .46rem;
  line-height: .46rem;
  margin: .12rem 0;
  padding: 0 0 0 .15rem;
  display: flex;
  span {
    flex: 1;
    color: #222;
    font-size: .16rem;
  }
  .icon_right {
    display: inline-block;
    width: .46rem;
    height: .46rem;
    background-image: url("../images/icon/right.png");
    background-size: 30% 30%;
    background-repeat: no-repeat;
    background-position: center center;
  }
}
</style>
