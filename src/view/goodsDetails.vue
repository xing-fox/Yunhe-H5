<template>
  <div class="page">
      <div class="swiper" ref="swipeid">
          <div class="swiper-wrapper" >
            <div class="swiper-slide" v-for="(item, index) in dataList.goodPictures" :key="index" @click="showPictureFunc(index)" >
              <img :src="item.picture_url" >
            </div>
          </div>
          <div class="swiperIndex boxOrent" v-if='swiperTotal'>
            <span>{{ swiperIndex }}</span> / <span>{{ swiperTotal }}</span>
          </div>
      </div>
      <div class="proIntro">
          <div class="price">¥{{ dataList.price_new }}<span v-if="dataList.price_new != dataList.price_old">¥{{ dataList.price_old }}</span></div>
          <div class="title">{{ dataList.product_name }}</div>
      </div>
      <div class="protab">
          <div class='singleList bor-1px-b' @click="changeSpecFunc">
            <span class='title'>已选</span>
            <span><span v-if="dataList.color">{{ dataList.color }} </span><span v-if="dataList.memory_capacity">{{ dataList.memory_capacity }} </span><span v-if="dataList.supplier_desc">{{ dataList.supplier_desc }} </span><span v-if="dataList.contract_name">{{ dataList.contract_name }}</span></span>
            <div class='arrow_right'></div>
          </div>
          <div class="double">
              <div class="left">
                  <span>说明</span>
              </div>
              <div class="right">
                  <span>正品保障 / 货到付款 / 自提 / 7天退换货 / 迪信通发货售后</span>
              </div>
          </div>
      </div>
      <div class="proGraphic">
        <ul class="bor-1px-b">
          <li @click="graphicFunc(0)" :class="{active: activeFlag}">
            <span>图文介绍</span>
          </li>
          <li @click="graphicFunc(1)" :class="{active: !activeFlag}">
            <span>商品参数</span>
          </li>
        </ul>
        <div class='graphic'>
          <img mode="widthFix" v-for="(item, index) in urlData" :key="index" :src="item.picture_url" alt="">
        </div>
      </div>
      <div class="proBuy">
        <div class="shoppingCart" @click="shopCartFunc">
          <span>加入购物车</span>
        </div>
        <div class="buyNow" @click="changeSpecFunc">
          <span>立即购买</span>
        </div>
      </div>
      <setMeal v-if="setMealState" :typeIndex="dataType" :detailId="detailId" :dataList="specData" :proList="dataList" :contId="contractSureId" @changeSpec="specFunc" @changeState="stateFunc"></setMeal>
  </div>
</template>
<script>
import wx from 'wx'
import Swiper from 'Swiper'
import setMeal from '@/components/setMeal'
export default {
  data () {
    return {
      Dom: '',
      openId: '',
      detailId: '',
      productId: '',
      dataType: 0, // 0购买,1购物车
      autoplay: true,
      interval: 5000,
      duration: 900,
      circular: true,
      setMealState: false,
      indicatorDots: true,
      activeFlag: true, // 图文消息切换
      address: '',
      urlData: [],
      dataList: [],
      colorId: '', // 颜色规格id
      memoryId: '', // 内存规格id
      supplierId: '', // 供应商规格id
      contractId: '', // 套餐规格id
      contractSureId: '', // 套餐id
      specData: {},
      swiperTotal: '',
      swiperIndex: 1
    }
  },
  components: {
    Swiper,
    setMeal
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      [this.colorId, this.memoryId, this.supplierId, this.contractId, this.contractSureId, this.setMealState, this.activeFlag, this.dataList, this.urlData] = ['', '', '', '', '', false, true, [], []]
      let self = this
      self.openId = 'o4FLT1Qmvvw7sWpGlvx-2jYALS1Y'
      self.productId = '95'
      self.$http.Goodsinfo({
        'openid': 'o4FLT1Qmvvw7sWpGlvx-2jYALS1Y',
        'product_id': '95'
      }).then(res => {
        self.dataList = res.content
        self.address = `${res.content.receiver_area || ''}${self.dataList.detail_address}`
        self.detailId = res.content.product_detail_id
        self.swiperTotal = res.content.goodPictures.length
        self.Goodsdescribe()
        self.Selectparameter()
        self.shareWx()
      }).then(() => {
        self.Dom = new Swiper(self.$refs.swipeid, {
          direction: 'horizontal',
          autoplay: true,
          loop: false,
          observer: true,
          observeParents: true,
          on: {
            transitionEnd: () => {
              if (self.swiperTotal >= self.swiperIndex) {
                self.swiperIndex = self.Dom.activeIndex + 1
              }
            }
          }
        })
      })
    },
    Goodsdescribe () {
      this.$http.Goodsdescribe({
        'openid': this.openId,
        'product_id': this.productId
      }).then(res => {
        if (!res.content[0]) {
          return (this.urlData = [])
        }
        this.urlData = res.content
      })
    },
    Selectparameter () {
      this.$http.Selectparameter({
        data: JSON.stringify({
          product_id: this.productId,
          color_id: this.colorId,
          memory_id: this.memoryId,
          supplier_id: this.supplierId,
          contract_id: this.contractId
        }),
        'openid': this.openId
      }).then(res => {
        if (res.code === 'E00000') {
          console.log(res)
          this.specData = res.content
        }
      })
    },
    graphicFunc (arg) {
      this.activeFlag = arg === 0
      arg === 0 ? this.Goodsdescribe() : this.Goodsparameter()
    },
    shopCartFunc () {
      this.dataType = 1
      this.setMealState = true
    },
    changeSpecFunc () {
      this.dataType = 0
      this.setMealState = true
    },
    Goodsparameter (openId) {
      this.$http.Goodsparameter({
        'openid': this.openId,
        'product_id': this.productId
      }).then(res => {
        if (!res.content[0]) {
          return (this.urlData = [])
        }
        this.urlData = res.content
      })
    },
    stateFunc () {
      this.setMealState = false
    },
    specFunc (e) {
      if (e.cate === 1) {
        this.colorId = e.id
      }
      if (e.cate === 2) {
        this.memoryId = e.id
      }
      if (e.cate === 3) {
        this.supplierId = e.id
      }
      if (e.cate === 4) {
        this.contractId = e.id
      }
      this.$http.Productdetail({
        data: JSON.stringify({
          product_id: this.productId,
          color_id: this.colorId,
          memory_id: this.memoryId,
          supplier_id: this.supplierId,
          contract_id: this.contractId
        }),
        'openid': this.openId
      }).then(res => {
        if (res.code !== 'E00000') {
          return this.$toast('暂无此套餐商品～', {
            icon: 'none',
            duration: 2000,
            mask: true
          })
        } else {
          return false
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
          jsApiList: ['previewImage']
        })
      })
    },
    showPictureFunc (index) {
      wx.previewImage({
        current: this.dataList.goodPictures[index],
        urls: this.dataList.goodPictures
      })
    }
  }
}
</script>
<style lang="less" scoped>
.page{
     //background: #f3f5f9;
    .swiper{
        width: 100%;
        height: 3.75rem;
        background: #000;
        overflow: hidden;
        position: relative;
        .swiper-slide{
          font-size: 0;
          width: 100%;
          max-height: 3.75rem;
          position: relative;
        }
        .swiper-slide img{
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          margin: auto auto;
        }
        .swiper-slide video{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3.75rem;
          z-index: 1;
        }
        .swiper-slide .vedioImg{
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,.5);
          position: absolute;
          top: 0;
          left: 0;
          img{
            width: 1rem;
            height: 1rem;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto auto;
          }
        }
        .swiperIndex{
          color: #fff;
          font-size: .14rem;
          width: .54rem;
          height: .26rem;
          text-align: center;
          display: -webkit-box;
          -webkit-box-pack: center;
          -webkit-box-align: center;
          text-align: center;
          background: #000;
          position: absolute;
          right: .2rem;
          bottom: .15rem;
          border-radius: .6rem;
          z-index: 10;
        }
      }
    .proIntro{
        background: #fff;
        padding: .15rem .1rem;
        .price{
        color: #ff5959;
        font-size: .2rem;
        line-height: .2rem;
        span{
            color: #999;
            font-size: .11rem;
            margin-left: .05rem;
            text-decoration:line-through
        }
        }
        .title{
        color: #333;
        font-size: .17rem;
        }
   }
   .protab{
        width: 100%;
        background: #fff;
        margin: .12rem 0 0 0;
        .singleList{
            color: #777;
            font-size: .13rem;
            width: 100%;
            height: .5rem;
            line-height: .5rem;
            position: relative;
            display: flex;
            .title{
                color: #333;
                padding: 0 .24rem 0 .12rem;
            }
            .arrow_right{
                width: .5rem;
                height: .5rem;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                background-image: url('../images/icon/right.png');
                background-size: 30% 30%;
                background-position: center center;
                background-repeat: no-repeat;
            }
            .addr{
                flex: 1;
                margin: 0 1rem 0 0;
                display: table;
                height: .5rem;
                span{
                display: table-cell;
                vertical-align: middle;
                text-align: left;
                line-height: .2rem;
                }
            }
        }
        .double{
            color: #777;
            font-size: .13rem;
            width: 100%;
            display: flex;
            .left{
                color: #333;
                padding: .15rem .24rem 0 .12rem;
            }
            .right{
                flex: 1;
                -webkit-flex: 1;
                padding: .15rem .05rem .15rem 0;
                line-height: .2rem;
            }
        }
    }
    .proGraphic{
        width: 100%;
        background: #fff;
        margin: .12rem 0 0 0;
        padding: 0 0 .57rem 0;
        ul{
            width: 100%;
            height: .5rem;
            display: flex;
            li{
                flex: 1;
                color: #777;
                font-size: .14rem;
                line-height: .5rem;
                text-align: center;
                position: relative;
                &.active{
                color: #ffda44;
                &:after{
                    content: '';
                    width: 70%;
                    position: absolute;
                    bottom: 1px;
                    left: 15%;
                    right: 15%;
                    border-bottom: 1px solid #ffda44;
                }
                }
            }
        }
        .graphic{
            font-size: 0;
            width: 100%;
            margin: .12rem 0 0 0;
            img{
                width: 100%;
            }
        }
    }
    .proBuy{
        width: 100%;
        height: .5rem;
        line-height: .5rem;
        background: #fff;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 999;
        display: flex;
    }
    .proBuy .star{
        width: .5rem;
        box-sizing: border-box;
        background-image: url('../images/icon/star.png');
        background-size: 40% 40%;
        background-repeat: no-repeat;
        background-position: center center;
    }
    .proBuy .shoppingCart,.proBuy .buyNow{
        font-size: .16rem;
        flex: 1;
        -webkit-flex: 1;
        text-align: center;
    }
    .proBuy .shoppingCart{
        color: #fff;
        background: #333;
    }
    .proBuy .buyNow{
        color: #222;
        background: #ffda44;
    }
}
</style>
