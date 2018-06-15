<template>
<div class="all">
    <div class="title">
        <div class="phone"><input type="tel" v-model="phoneNum" placeholder="请输入您的手机号码" v-on:input ="inputFunc"/></div>
        <div class="info">当前充值手机号</div>
    </div>
    <div class="content">
        <div class="money">
            <ul v-for="(item, index) in moneyList" :key="index">
                <li @click="getMoney(item.product_price, item.parameter_id)" >{{ item.order_name }}</li>
            </ul>
        </div>
        <div class="pay">
            <p>需付款</p>
            <span>{{ priceCount }}</span>
            <div><img src="../images/icon/money.png"/></div>
        </div>
        <div class="bottom">
            <button @click="payMoney">充值</button>
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
      parameter_id: ''
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
        'openid': 'oGJVJ5Jx5--nLHkOTU8ot_AarfY8'
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
    getMoney (money, parameterId) {
      this.priceCount = money
      this.parameter_id = parameterId
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
        'openid': 'oGJVJ5Jx5--nLHkOTU8ot_AarfY8'
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
        'openid': 'o4FLT1Qmvvw7sWpGlvx-2jYALS1Y',
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
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    .title{
        background: #FFFFFF;
        width: 100%;
        height: 10%;
        .phone{
            font-size: 20px;
            color: #000;
            margin: 0 0px 3px 20px;
            padding: 0.1rem 0;
            input{
                -webkit-appearance: none;
                color: #666;
                font-size: .13rem;
                border: none;
                width: 2.9rem;
                height: .29rem;
                margin: .08rem 0 0 .15rem;
                padding: 0 0 0 .1rem;
                border: 1px solid #ddd;
                border-radius: .05rem;
                box-sizing: border-box;
            }
        }
        .info{
            font-size: 12px;
            color: #999999;
            margin: -0.11rem 0 .03rem 0.35rem;
        }
    }
    .content{
        width: 100%;
        margin-top: 5px;
        background: #FFFFFF;
        height: 90%;
        .money{
            overflow: hidden;
            width: 100%;
            ul li{
                float: left;
                font-size: 14px;
                border: 1px solid #DDDDDD;;
                height: 40px;
                width: 25%;
                margin: 30px 0px 0px 22px;
                text-align: center;
                padding-top: 15px;
            }
        }
        .pay{
            overflow: hidden;
            p{
                font-size: 15px;
                float: left;
                margin: 40px 0 10px 20px;
            }
            span{
                font-size: 15px;
                float: right;
                margin: 40px 30px 0px 10px;
                color: #d81e06;
            }
            div img{
                float: right;
                height: 23px;
                width: 23px;
                margin: 39px 0px 0px 0px;
            }
        }
        button{
            width: 3.15rem;
            height: 0.5rem;
            background: #FFDA44;
            border-radius: 5px;
            font-size: .16rem;
            color: #222222;
            letter-spacing: 0.61px;
            text-align: center;
            margin: 0 0.3rem;
            position: absolute;
            bottom: 0.3rem;
        }
    }
}
</style>
