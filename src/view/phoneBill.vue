<template>
<div class="all">
    <div class="title">
        <div class="phone"><input type="tel" v-model="phoneNum"  v-on:input ="inputFunc"/></div>
        <div class="info">当前充值手机号</div>
    </div>
    <div class="content">
        <div class="money">
            <ul v-for="(item, index) in moneyList" :key="index">
                <li @click="getMoney(item,index)"  :class="{ active:activeIndex == index}" >{{ item.order_name }}</li>
            </ul>
        </div>
        <div class="pay">
            <p>需付款</p>
            <span>¥{{ priceCount }}</span>
        </div>
        <div class="bottom">
            <span @click="payMoney">充值</span>
        </div>
    </div>
</div>
</template>
<script>
import wx from 'wx'
import { mapActions } from 'vuex'
export default {
  name: 'PhoneBill',
  data () {
    return {
      phoneNum: '',
      priceCount: 0,
      moneyList: [],
      type: '',
      payType: this.$route.query.payType,
      parameter_id: '',
      activeIndex: -1
    }
  },
  created () {
    this.init()
    this.shareWx()
    if (this.payType === '0') {
      this.costInit()
    }
  },
  methods: {
    ...mapActions([
      'LoadingingStatus'
    ]),
    // 初始化获取手机号
    init () {
      let that = this
      this.LoadingingStatus(true)
      this.$http.getPhoneNumByOpenid({
        openid: 'o4FLT1Qmvvw7sWpGlvx-2jYALS1Y'
        // 'openid': window.localStorage.getItem('openId') || window.sessionStorage.getItem('openId')
      }).then(res => {
        this.LoadingingStatus(false)
        if (res.success && res.content) {
          that.phoneNum = res.content.phone
          if (that.payType === '1' && that.phoneNum !== null && that.phoneNum !== '') {
            that.getPhoneInit()
          }
        }
      })
    },
    // 查询话费充值套餐
    costInit () {
      let that = this
      this.$http.getMoneylist({
        data: JSON.stringify({
          'type': '0'
        })
      }).then(res => {
        this.moneyList = []
        if (res.success && res.content) {
          for (let i = 0; i < res.content.length; i++) {
            that.moneyList.push(res.content[i])
          }
        }
      })
    },
    // 查询流量充值套餐
    flowInit () {
      let that = this
      this.$http.getMoneylist({
        data: JSON.stringify({
          'type': '1',
          'operator': that.type
        })
      }).then(res => {
        this.moneyList = []
        if (res.success && res.content) {
          for (let i = 0; i < res.content.length; i++) {
            that.moneyList.push(res.content[i])
          }
        }
      })
    },
    // 充值流量 输入前三位
    inputFunc () {
      if (this.payType === '1') {
        if (this.phoneNum.length === 3) {
          this.$http.judgePhoneNum({
          }).then(res => {
            if (res.success && res.content) {
              this.type = res.content.obj[this.phoneNum]
              this.flowInit()
            }
          })
        }
      }
    },
    // 默认手机号截取三位查询运营商
    getPhoneInit () {
      let number = this.phoneNum.substring(0, 3)
      this.$http.judgePhoneNum({
      }).then(res => {
        if (res.success && res.content) {
          this.type = res.content.obj[number]
          this.flowInit()
        }
      })
    },
    // 获取金额
    getMoney (item, index) {
      this.priceCount = item.product_price
      this.parameter_id = item.parameter_id
      this.activeIndex = index
    },
    // 充值
    payMoney () {
      let self = this
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(this.phoneNum)) {
        self.$toast('请输入正确的手机号')
        return false
      }
      if (this.priceCount === 0) {
        self.$toast('请选择充值金额')
        return false
      }
      // 创建订单
      let that = this
      this.$http.createOrder({
        data: JSON.stringify({
          'phone': that.phoneNum,
          'type': that.payType,
          'parameter_id': '9'
        }),
        openid: 'o4FLT1Qmvvw7sWpGlvx-2jYALS1Y'
        // 'openid': window.localStorage.getItem('openId') || window.sessionStorage.getItem('openId')
      }).then(res => {
        if (res.success && res.content) {
          this.mobliePay(res.content.order_no)
        }
      })
    },
    mobliePay (orderNo) {
      let that = this
      this.$http.pay({
        data: JSON.stringify({
          'order_no': orderNo,
          'type': that.payType,
          'pay_way': '1',
          'coupon_flag': '0'
        }),
        openid: 'o4FLT1Qmvvw7sWpGlvx-2jYALS1Y',
        // 'openid': window.localStorage.getItem('openId') || window.sessionStorage.getItem('openId'),
        'payfrom': 'wxpub'
      }).then(res => {
        if (res.success && res.content) {
          console.log(res.content)
          // WeixinJSBridge.invoke(
          //   'getBrandWCPayRequest', {
          //     'appId': 'wx8b6bb04ed1ac3b29',
          //     'timeStamp': res.content.timestamp,
          //     'nonceStr': res.content.noncestr,
          //     'package': res.content.wxpay_package,
          //     'signType': 'MD5',
          //     'paySign': res.content.sign
          //   },
          //   function (res) {
          //     if (res.err_msg === 'get_brand_wcpay_request:ok') {}
          //   }
          // )
          wx.chooseWXPay({
            timestamp: res.content.timestamp,
            nonceStr: res.content.noncestr,
            package: res.content.wxpay_package,
            signType: 'MD5',
            paySign: res.content.sign,
            success: function (res) {
            // 支付成功后的回调函数
            }
          })
        }
      })
    },
    isAndroid () {
      let u = window.navigator.userAgent
      return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    },
    shareWx () {
      let self = this
      let sendUrl = window.localStorage.getItem('shareUrl')
      if (self.isAndroid()) {
        sendUrl = window.location.href.split('#')[0]
      }
      self.$http.WxgetJs({
        url: sendUrl
      }).then(response => {
        wx.config({
          debug: false,
          appId: 'wx8b6bb04ed1ac3b29',
          timestamp: response.content.timestamp,
          nonceStr: response.content.noncestr,
          signature: response.content.signature,
          jsApiList: ['chooseWXPay']
        })
        wx.ready(function () {
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.all{
  height: 100%;
  width: 100%;
    .title{
        background: #FFFFFF;
        width: 100%;
        height: .73rem;
        .phone{
            font-size: 20px;
            color: #000;
            margin: 0 0px 3px 0;
            padding: 0.16rem 0;
            input{
                -webkit-appearance: none;
                color: #666;
                font-size: .27rem;
                border: none;
                width: 100%;
                height: .29rem;
                outline:none;
                padding: 0 0 0 .1rem;
                margin-left: 0rem
            }
        }
        .info{
            font-size: .14rem;
            color: #999999;
            margin: -.18rem 0 .03rem .15rem;
        }
    }
    .content{
        width: 100%;
        margin-top: 5px;
        background: #FFFFFF;
        height: 5.2rem;
        .money{
            overflow: hidden;
            width: 100%;
            ul{
              margin-top: .43rem;
            }
            ul li{
                float: left;
                font-size: .18rem;
                color: #333333;
                border: 1px solid #CCCCCC;
                height: .61rem;
                width: 1.1rem;
                margin: 0 .05rem .15rem .07rem;
                text-align: center;
                line-height: .61rem;
                border-radius: .05rem;
                &.active{
                  background-color: #ffda44;
                }
            }
        }
        .pay{
            overflow: hidden;
            margin-top: .47rem;
            p{
                font-size: .14rem;
                float: left;
                margin-left: .15rem;
            }
            span{
                font-size: .2rem;
                float: right;
                margin-right: .16rem;
                color: #FF5959;
            }
        }
        .bottom span{
            width: 100%;
            height: .51rem;
            background: #FFDA44;
            line-height: .51rem;
            font-size: .16rem;
            color: #222222;
            letter-spacing: 0.61px;
            text-align: center;
            position: fixed;
            bottom: 0;
        }
    }
}
</style>
