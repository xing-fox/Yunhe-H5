<template>
  <div>
   <div id="details">
    <div class="swiper" ref="swipeid">
      <div class="swiper-wrapper" >
          <div class="swiper-slide" v-for="(item, index) in Data.notepicture" :key="index">
            <img :src="item.picture_url" alt="">
          </div>
      </div>
      <div class="swiperIndex">
        <span>{{ swiperIndex }}</span> / <span>{{ swiperTotal }}</span>
      </div>
    </div>
    <div class="info">
      <img class="infoImg" :src="Data.customer_picture" alt="">
      <div class="infoAddr">
        <p>{{ Data.shop_name || '暂无' }}</p>
        <p>{{ Data.customer_name }}</p>
      </div>
      <div class="infoFollow">+ <span>关注</span> </div>
    </div>
    <div class="ads" v-for="(item, index) in Data.productinfo" :key="index">
      <img class="adsImg" :src="item.picture_url" alt="">
      <span>{{ item.product_name || 暂无 }}</span>
    </div>
    <div class="content">
      <div class="contTitle">
          <span>{{ Data.note_name }}</span>
      </div>
      <div class="contMain">
        <span>{{ Data.note_desc }}</span>
      </div>
    </div>
   </div>
    <div class="footer">
      <div class="item">
        <span>赏</span>
        <img src="../images/icon/shang.png" alt="">
      </div>
      <div class="item" @click="collectFunc">
        <img v-if="collectState" src="../images/icon/star.png">
        <img v-else class="animated flash" src="../images/icon/star_1.png">
      </div>
      <div class="item" @click="admireFunc">
        <img v-if="admireState" src="../images/icon/admire.png">
        <img v-else class="animated bounce" src="../images/icon/admire_1.png">
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  name: 'Details',
  props: {
    effect: {
      type: String,
      default: 'slide'
    },
    loop: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    pagination: {
      type: Boolean,
      default: true
    },
    paginationType: {
      type: String,
      default: 'bullets'
    },
    autoPlay: {
      type: Number,
      default: 3000
    }
  },
  data () {
    return {
      Dom: Object,
      Data: Array,
      swiperIndex: 1,
      admireState: true,
      collectState: true,
      swiperTotal: Number
    }
  },
  components: {
    Swiper
  },
  created () {
    this.LoadingingStatus(true)
    this.$http.NoteInfoDetails({
      'note_id': this.$route.query.note_id
    }).then(response => {
      this.LoadingingStatus(false)
      this.Data = response
      this.swiperTotal = this.Data.notepicture.length
    }).then(() => {
      this.Dom = new Swiper(this.$refs.swipeid, {
        direction: this.direction,
        autoplay: true,
        loop: this.loop,
        on: {
          transitionEnd: () => {
            this.swiperIndex = this.Dom.activeIndex + 1
          }
        }
      })
    })
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'LoginingStatus',
      'LoadingingStatus'
    ]),
    admireFunc () {
      this.admireState = false
      // this.LoginingStatus(false)
    },
    collectFunc () {
      this.collectState = false
      // this.LoginingStatus(false)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  #details{
    width: 100%;
    position: absolute;
    top: 0;
    bottom: .45rem;
    overflow: scroll;
    left: 0;
    background: #f4f6fa;
    .swiper{
      width: 100%;
      height: 3.3rem;
      background: #f4f6fa;
      overflow: hidden;
      position: relative;
      .swiper-slide img{
        width: 100%;
        height: 100%;
      }
      .swiperIndex{
        color: #fff;
        font-size: .14rem;
        width: .54rem;
        height: .26rem;
        line-height: .26rem;
        text-align: center;
        background: #000;
        position: absolute;
        right: .2rem;
        bottom: .15rem;
        border-radius: .6rem;
        z-index: 10;
      }
    }
    .info{
      display: flex;
      width: 100%;
      height: .65rem;
      background: #fff;
      position: relative;
      .infoImg{
        width: .36rem;
        height: .36rem;
        border-radius: .18rem;
        margin: .15rem 0 0 .12rem;
        background: #999;
      }
      .infoAddr{
        font-size: .13rem;
        &>p:nth-child(1){
          color: #222;
          line-height: .18rem;
          margin: .14rem 0 0 .05rem;
        }
        &>p:nth-child(2){
          color: #666;
          line-height: .18rem;
          margin: .02rem 0 0 .05rem;
        }
      }
      .infoFollow{
        display: inline-block;
        color: #222;
        font-size: .13rem;
        width: .8rem;
        height: .3rem;
        line-height: .3rem;
        text-align: center;
        position: absolute;
        top: .18rem;
        right: .12rem;
        border: 1px solid #333;
        box-sizing: border-box;
        border-radius: .05rem;
        span{
          margin: 0 0 0 .02rem;
        }
      }
    }
    .ads{
      display: flex;
      width: 100%;
      height: .65rem;
      line-height: .65rem;
      margin: .01rem 0 0 0;
      background: #fff;
      .adsImg{
        width: .48rem;
        height: .48rem;
        margin: .09rem 0 0 .12rem;
      }
      span{
        color: #222;
        font-size: .15rem;
        margin: 0 0 0 .07rem;
      }
    }
    .content{
      width: 100%;
      margin: .06rem 0 0 0;
      background: #fff;
      .contTitle{
        color: #222;
        font-size: .18rem;
        line-height: .25rem;
        padding: .15rem .15rem 0 .17rem;
      }
      .contMain{
        color: #222;
        font-size: .14rem;
        line-height: .22rem;
        overflow: scroll;
        padding: .1rem .15rem .05rem .17rem;
      }
    }
  }
  .footer{
    display: flex;
    width: 100%;
    height: .45rem;
    background: #fff;
    line-height: .45rem;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #efefef;
    .item{
      flex: 1;
      color: #222;
      font-size: .13rem;
      span{
        vertical-align: middle;
      }
      img{
        width: .16rem;
        vertical-align: middle;
      }
    }
  }
</style>
