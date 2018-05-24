<template>
  <div class="index">
    <div v-wechat-title="$route.meta.title"></div>
    <div class="title">
      <ul>
        <li v-for="(item, index) in tabList" :key="index" @click="tabChangeFunc(index)" :class="{active: listIndex == index}">{{ item }}</li>
      </ul>
    </div>
    <div v-if="!nodataState" class="main" ref="wrapper">
      <ul>
        <li v-for="(item, index) in DataList" :key="index" :class="{'list_has': tabType ==2, 'list_pass': tabType == 1}">
          <div class="list_main">
            <div class="price">¥
              <span :class="{priceFont: item.coupon_amount >= 100}">{{ item.coupon_amount }}</span>
            </div>
            <div class="intro">
              <div class="addr">
                <span>{{ item.remarks }}</span>
              </div>
              <div class="money">
                <span>满{{ item.serve_amount }}元可用</span>
              </div>
            </div>
          </div>
          <div class="list_time">
            <span>有效期：{{ item.effective_date }}至{{ item.expire_date }}</span>
          </div>
        </li>
      </ul>
    </div>
    <noData class="nodata" v-if="nodataState"></noData>
    <div class="footer">
      <span>{{ moreMessage }}</span>
      <div class="line"></div>
    </div>
    <telSure v-if="telState" @phoneChangeFunc="sure"></telSure>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import IScroll from 'iscroll'
import noData from '@/components/nodata'
import telSure from '@/components/phoneSure'
export default {
  name: 'coupon',
  data () {
    return {
      tabList: ['未使用', '已使用', '已过期'],
      moreMessage: '更多优惠 敬请期待',
      listIndex: 0, // flag banner
      nodataState: false, // flag nodata
      DataList: [], // 总数据
      tabType: 0,
      pageNum: 1,
      pagCount: 8,
      telState: false,
      scrollDom: '' // iscroll 滚动加载模块
    }
  },
  components: {
    noData,
    telSure
  },
  created () {
    this.LoadingingStatus(true)
    this.init()
  },
  methods: {
    ...mapActions([
      'LoadingingStatus'
    ]),
    init () {
      let self = this
      self.$http.MyCoupon({
        data: JSON.stringify({
          'status': self.tabType,
          'pag_no': self.pageNum,
          'pag_num': self.pagCount
        }),
        'openid': window.localStorage.getItem('openId')
      }).then(res => {
        this.LoadingingStatus(false)
        if (res.code === 'E00007') {
          self.telState = true
        } else {
          self.DataList = res.content
          self.$nextTick(() => {
            self.scrollDom = new IScroll(this.$refs.wrapper)
          })
          if (!res.content || !res.content.length) {
            this.nodataState = true
          }
        }
      })
    },
    tabChangeFunc (key) {
      this.LoadingingStatus(true)
      this.pageNum = 1
      this.tabType = key === 0 ? 0 : key === 1 ? 2 : 1
      this.listIndex = key
      this.nodataState = false
      this.init()
    },
    sure () {
      this.telState = false
      this.LoadingingStatus(true)
      this.init()
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  width: 100%;
  height: 100%;
  background: #f3f5f9;
  position: relative;
  .title {
    width: 100%;
    height: 0.44rem;
    line-height: 0.44rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: #fff;
    ul {
      width: 100%;
      height: 0.44rem;
      display: flex;
      li {
        flex: 1;
        -webkit-box-flex: 1;
        height: 0.44rem;
        color: #999;
        font-size: 0.15rem;
        text-align: center;
        &.active {
          color: #222;
          font-size: 0.17rem;
          position: relative;
          &.active:after {
            content: "";
            width: 40%;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            margin: 0 auto;
            border: 2px solid #ffda44;
            border-radius: 2px;
          }
        }
      }
    }
  }
  .main{
    font-size: 0;
    width: 100%;
    background: #fff;
    padding: .2rem 0 0 0;
    position: absolute;
    top: .49rem;
    bottom: .3rem;
    left: 0;
    right: 0;
    overflow: hidden;
    ul {
      width: 100%;
      padding: 0 0 .1rem 0;
      li {
        height: 1rem;
        margin: 0 .12rem .2rem .12rem;
        padding: .13rem 0 .14rem .27rem;
        box-sizing: border-box;
        background-image: url('../images/icon/ico_coup.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        &.list_has {
          height: 1rem;
          margin: 0 .12rem .2rem .12rem;
          padding: .13rem 0 .14rem .27rem;
          box-sizing: border-box;
          background-image: url('../images/icon/ico_coup_used.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          position: relative;
        }
        &.list_has:after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(255, 255, 255, .6);
          z-index: 1;
        }
        &.list_pass {
          height: 1rem;
          margin: 0 .12rem .2rem .12rem;
          padding: .13rem 0 .14rem .27rem;
          box-sizing: border-box;
          background-image: url('../images/icon/ico_coup_past.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          position: relative;
        }
        &.list_pass:after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(255, 255, 255, .6);
          z-index: 1;
        }
        .list_main {
          width: 100%;
          display: box;
          display: -webkit-box;
          .price {
            color: #e2330b;
            font-size: .18rem;
            height: .56rem;
            line-height: .56rem;
            .priceFont {
              font-size: .32rem !important;
            }
            span {
              font-size: .4rem;
              margin: 0 0 0 .04rem;
            }
          }
          .intro {
            font-size: 13px;
            color: #954F1C;
            margin: .11rem 0 0 .1rem;
          }
        }
        .list_time {
          font-size: 12px;
          color: #954F1C;
          letter-spacing: .01rem;
        }
      }
    }
  }
  .nodata{
    font-size: 0;
    width: 100%;
    background: #fff;
    padding: .2rem 0 0 0;
    position: absolute;
    top: .49rem;
    bottom: .3rem;
    left: 0;
    right: 0;
  }
  .footer{
    color: #ccc;
    font-size: .14rem;
    width: 100%;
    height: .3rem;
    line-height: .3rem;
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    span {
      display: inline-block;
      width: 35%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
      margin: 0 auto;
      background: #fff;
    }
    .line{
      content: '';
      width: 70%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: .15rem auto;
      border-top: 1px solid #ccc;
      transform: scaleY(.5);
      transform-origin: 0 0;
      -webkit-transform: scaleY(.5);
      -webkit-transform-origin: 0 0;
    }
  }
}
</style>
