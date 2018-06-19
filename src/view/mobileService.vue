<template>
    <div class="all">
        <div class="header">
            <ul @click="addPhone">
                <li><img src="../images/icon/home_ico_cost@2x.png"/><li>
                <li><div>充话费</div></li>
            </ul>
             <ul @click="addFlow">
                <li><img src="../images/icon/home_ico_flow@2x.png"/><li>
                <li><div>充流量</div></li>
            </ul>
             <ul @click="getAll(4)">
                <li><img src="../images/icon/home_ico_bill@2x.png"/><li>
                <li><div>查账单</div></li>
            </ul>
        </div>
        <div class="content">
            <div class="mobileList">
                <div class="title">
                    <div class="box"></div>
                    <span class="plan">移动套餐</span>
                    <span class="arrow"><img src="../images/icon/rightJT.png"/></span>
                    <div @click="getAll(1)">全部</div>
                </div>
                <ul>
                    <li v-for="(item, index) in mobileList" :key="index">
                        <div>{{ item.contractName }}</div>
                        <img :src= "item.imageUri"   @click="showPictureFunc(item.imageUri)"/>
                    </li>
                </ul>
            </div>
            <div class="mobileList">
                <div class="title">
                    <div class="box"></div>
                    <span class="plan">宽带套餐</span>
                    <span class="arrow"><img src="../images/icon/rightJT.png"/></span>
                    <div @click="getAll(2)" >全部</div>
                </div>
                <ul>
                    <li v-for="(item, index) in broadbandList" :key="index">
                        <div>{{ item.contractName }}</div>
                        <img :src= "item.imageUri" alt="" />
                    </li>
                </ul>
            </div>
             <div class="mobileList">
                <div class="title">
                    <div class="box"></div>
                    <span class="plan">裸机优惠</span>
                    <span class="arrow"><img src="../images/icon/rightJT.png"/></span>
                    <div @click="getAll(3)">全部</div>
                </div>
                <ul>
                    <li v-for="(item, index) in bareMachine" :key="index">
                        <div>{{ item.contractName }}</div>
                        <img :src= "item.imageUri" />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import wx from 'wx'
export default {
  name: 'MobileService',
  data () {
    return {
      mobileList: [],
      broadbandList: [],
      bareMachine: []
    }
  },
  created () {
    this.shareWx()
    this.mobileInit()
  },
  methods: {
    ...mapActions([
      'LoadingingStatus'
    ]),
    mobileInit () {
      this.LoadingingStatus(true)
      let that = this
      this.$http.mobileContractlist({
        'contractTypeId': '1',
        'openid': window.localStorage.getItem('openId') || window.sessionStorage.getItem('openId')
      }).then(res => {
        this.LoadingingStatus(false)
        if (res.success && res.content) {
          if (res.content.length >= 2) {
            for (let i = 0; i < 2; i++) {
              res.content[i].imageUri = 'http://test.xclerk.com/upload/' + res.content[i].imageUri
              that.mobileList.push(res.content[i])
            }
          } else {
            for (let i = 0; i < res.content.length; i++) {
              res.content[i].imageUri = 'http://test.xclerk.com/upload/' + res.content[i].imageUri
              that.mobileList.push(res.content[i])
            }
          }
        }
      })
      this.$http.mobileContractlist({
        'contractTypeId': '2',
        'openid': window.localStorage.getItem('openId') || window.sessionStorage.getItem('openId')
      }).then(res => {
        this.LoadingingStatus(false)
        if (res.success && res.content) {
          if (res.content.length >= 2) {
            for (let i = 0; i < 2; i++) {
              res.content[i].imageUri = 'http://test.xclerk.com/upload/' + res.content[i].imageUri
              that.broadbandList.push(res.content[i])
            }
          } else {
            for (let i = 0; i < res.content.length; i++) {
              res.content[i].imageUri = 'http://test.xclerk.com/upload/' + res.content[i].imageUri
              that.broadbandList.push(res.content[i])
            }
          }
        }
      })
      this.$http.mobileContractlist({
        'contractTypeId': '3',
        'openid': window.localStorage.getItem('openId') || window.sessionStorage.getItem('openId')
      }).then(res => {
        this.LoadingingStatus(false)
        if (res.success && res.content) {
          if (res.content.length >= 2) {
            for (let i = 0; i < 2; i++) {
              res.content[i].imageUri = 'http://test.xclerk.com/upload/' + res.content[i].imageUri
              that.bareMachine.push(res.content[i])
            }
          } else {
            for (let i = 0; i < res.content.length; i++) {
              res.content[i].imageUri = 'http://test.xclerk.com/upload/' + res.content[i].imageUri
              that.bareMachine.push(res.content[i])
            }
          }
        }
      })
    },
    addPhone () {
      this.$router.push({path: '/wechat_pub/phoneBill', query: {payType: '0'}})
    },
    addFlow () {
      this.$router.push({path: '/wechat_pub/phoneBill', query: {payType: '1'}})
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
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'previewImage']
        })
        wx.ready(function () {
          wx.onMenuShareTimeline({
            title: self.Data.note_name,
            link: 'http://test.xclerk.com/yunhe/wechat/shareServlet?type=1&parameter=' + self.noteId,
            imgUrl: self.Data.notePictures[0],
            success: function () {
            }
          })
          wx.onMenuShareAppMessage({
            title: self.Data.note_name,
            desc: self.Data.note_desc,
            link: 'http://test.xclerk.com/yunhe/wechat/shareServlet?type=1&parameter=' + self.noteId,
            imgUrl: self.Data.notePictures[0],
            type: '',
            dataUrl: '',
            success: function () {
            }
          })
        })
      })
    },
    showPictureFunc (imageUri) {
      wx.previewImage({
        current: imageUri
      })
    },
    getAll (mobileType) {
      window.location.href = 'https://test.xclerk.com/mrsyg/YunHaiTongProject/public_tab/html/mobile_service_details.html?contractTypeId=' + mobileType
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
    .header {
        height: 18%;
        width: 100%;
        background: #FFFFFF;
        overflow: hidden;
        ul li img{
            width: .45rem;
            height: .45rem;
        }
        ul li div{
           font-size: .14rem;
           color: #222222;
           letter-spacing: 0;
           text-align: left;
           margin-top: -0.10rem;
        }
        ul{
            float: left;
            margin-left: .6rem;
            margin-top: -.40rem;
        }
    }
    .content{
            height: 82%;
            overflow: scroll;
        .mobileList{
            background: #FFFFFF;
            width: 100%;
            margin-top: .05rem;
            .title{
                overflow: hidden;
                .box{
                     float: left;
                     background: #55B9EB;
                     width: 0.04rem;
                     height: 0.16rem;
                     margin: .13rem 0 .1rem .1rem;
                }
                .arrow img{
                    float: right;
                    margin: .06rem .05rem 0 0;
                    width: .2rem;
                    height: .25rem;
                }
                .plan{
                    font-size: .16rem;
                    color: #222222;
                    letter-spacing: 0;
                    text-align: left;
                    float: left;
                    margin: .1rem 0 .1rem .05rem;

                }
                div{
                    float: right;
                    font-size: .13rem;
                    color: #999999;
                    letter-spacing: 0;
                    margin: .1rem .01rem .1rem .1rem;
                }
                .icon{
                    float: right;
                    height: .2rem;
                    width: .1rem;
                    margin-right: .1rem;
                }
             }
                ul li div{
                    font-size: .15rem;
                    color: #222222;
                    letter-spacing: 0;
                    text-align: left;
                    margin: .1rem .1rem .05rem .1rem;
                }
                ul li img{
                    margin: .1rem 0 .05rem .2rem;
                    width: 1.88rem;
                    height: 1.05rem;
                }
            }
        }
    }
</style>
