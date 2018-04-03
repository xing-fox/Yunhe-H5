<template>
  <div>
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
        <div class="timeStar">
          <span class="time">2018-01-21</span>
          <span class="collect">2次收藏</span>
          <span class="zan">5次点赞</span>
        </div>
        <div class="touxiang">
          <router-link :to="{path: 'details/praise'}">
            <img src="../images/1.png" alt="">
            <img src="../images/1.png" alt="">
            <img src="../images/1.png" alt="">
            <img src="../images/1.png" alt="">
            <img src="../images/1.png" alt="">
            <img src="../images/1.png" alt="">
            <img src="../images/icon/more.png" alt="">
          </router-link>
        </div>
        <div class="evaluate">
          <div class="title">
            <span>用户评价(1)</span>
          </div>
          <ul class="evaList">
            <li>
              <div class="listImg">
                <img src="../images/1.png" alt="">
              </div>
              <div class="listContent">
                <span>评论代表关注,属你最用心</span>
              </div>
            </li>
            <li>
              <div class="listImg">
                <img src="../images/1.png" alt="">
              </div>
              <div class="listContent1">
                <div class="listContTitle">
                  <span>asdfasdf</span>
                </div>
                <div class="listContMain">
                  <span>Iconfont-国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造,设计和前端开发的便捷工具</span>
                </div>
                <div class="timeStars">
                  <div class="time">昨天 11:12</div>
                  <div class="reward">
                    <img src="../images/icon/shang.png" alt="">
                    <span>10</span>
                  </div>
                  <div class="eval">
                    <img src="../images/icon/eval.png" alt="">
                    <span>1</span>
                  </div>
                  <div class="zan">
                    <img src="../images/icon/admire.png" alt="">
                    <span>10</span>
                  </div>
                </div>
                <div class="listEval">
                  <div class="list">
                    <div class="evalMain">
                      <span>羊肉烤串:</span>如果以上这些效果不能满足你的需求，你可以仿照animate.css的格式制作一些其他效果
                    </div>
                    <div class="timeZan">
                      <span class="zanTime">08-12 08:32</span>
                      <img src="../images/icon/admire.png" alt="">
                      <span class="zanCount">12</span>
                    </div>
                    <div class="listSeeMore">
                      <span>查看剩下3条回复</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="listImg">
                <img src="../images/1.png" alt="">
              </div>
              <div class="listContent1">
                <div class="listContTitle">
                  <span>asdfasdf</span>
                </div>
                <div class="listContMain">
                  <span>Iconfont-国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造,设计和前端开发的便捷工具</span>
                </div>
                <div class="timeStars">
                  <div class="time">昨天 11:12</div>
                  <div class="reward">
                    <img src="../images/icon/shang.png" alt="">
                    <span>10</span>
                  </div>
                  <div class="eval">
                    <img src="../images/icon/eval.png" alt="">
                    <span>90</span>
                  </div>
                  <div class="zan">
                    <img src="../images/icon/admire.png" alt="">
                    <span>10</span>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="listImg">
                <img src="../images/1.png" alt="">
              </div>
              <div class="listContent1">
                <div class="listContTitle">
                  <span>asdfasdf</span>
                </div>
                <div class="listContMain">
                  <span>Iconfont-国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造,设计和前端开发的便捷工具</span>
                </div>
                <div class="timeStars">
                  <div class="time">昨天 11:12</div>
                  <div class="reward">
                    <img src="../images/icon/shang.png" alt="">
                    <span>10</span>
                  </div>
                  <div class="eval">
                    <router-link :to="{path: 'details/evalmore'}">
                      <img src="../images/icon/eval.png" alt="">
                      <span>10</span>
                    </router-link>
                  </div>
                  <div class="zan">
                    <img src="../images/icon/admire.png" alt="">
                    <span>10000</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="eavMore bor-t">
            <router-link :to="{path: 'details/evalmore'}">
              <span>查看全部</span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="footer bor-t">
        <div class="item" @click="rewardStateFunc">
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
      <Reward v-if="rewardState" @closed="rewardStateFunc"></Reward>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Swiper from 'swiper'
import Reward from '@/components/reward'
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
      rewardState: false,
      admireState: true,
      collectState: true,
      swiperTotal: Number
    }
  },
  components: {
    Swiper,
    Reward
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
    },
    rewardStateFunc (arg) {
      this.rewardState = !this.rewardState
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
        text-align: center;
        display: -webkit-box;
        -webkit-box-orient: vertical;
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
    .timeStar{
      color: #999;
      font-size: .13rem;
      height: .18rem;
      line-height: .18rem;
      background: #fff;
      padding: .15rem;
      display: flex;
      .time{
        flex: 1;
      }
      .collect{
        width: .8rem;
        text-align: right;
      }
      .zan{
        width: .8rem;
        text-align: right;
      }
    }
    .touxiang{
      font-size: 0;
      padding: 0 .15rem .2rem;
      background: #fff;
      img{
        width: .35rem;
        height: .35rem;
        margin: 0 .12rem 0 0;
        border-radius: .18rem;
      }
    }
    .evaluate{
      font-size: 0;
      background: #fff;
      margin: .06rem 0 .06rem 0;
      .title{
        color: #222;
        font-size: .13rem;
        padding: .13rem 0 0 .12rem;
      }
      .evaList{
        width: 100%;
        li{
          margin: .3rem .12rem 0;
          display: flex;
          .listImg{
            width: .35rem;
            height: .35rem;
            img{
              width: 100%;
              height: 100%;
              border-radius: .18rem;
            }
          }
          .listContent{
            flex: 1;
            color: #999;
            font-size: .13rem;
            height: .35rem;
            line-height: .35rem;
            margin: 0 0 0 .11rem;
            padding: 0 0 0 .1rem;
            box-sizing: border-box;
            border: .01rem solid #ddd;
            border-radius: .05rem;
          }
          .listContent1{
            flex: 1;
            font-size: .13rem;
            margin: 0 0 0 .11rem;
            box-sizing: border-box;
            .listContTitle{
              color: #222;
              line-height: .18rem;
            }
            .listContMain{
              color: #222;
              line-height: .18rem;
              overflow: scroll;
            }
            .timeStars{
              color: #999;
              font-size: .13rem;
              width: 100%;
              line-height: .18rem;
              margin: .12rem 0 0 0;
              display: flex;
              .time{
                width: .3rem;
                vertical-align: middle;
              }
              .eval{
                width: .7rem;
                a{
                  color: #999;
                }
                img{
                  width: .16rem;
                  vertical-align: middle;
                }
                span{
                  display: inline-block;
                  width: .3rem;
                  margin: 0 0 0 .02rem;
                  text-align: left;
                  vertical-align: middle;
                }
              }
              .zan{
                width: .7rem;
                img{
                  width: .16rem;
                  vertical-align: middle;
                }
                span{
                  display: inline-block;
                  width: .4rem;
                  margin: 0 0 0 .02rem;
                  text-align: right;
                  vertical-align: middle;
                }
              }
              .time,.reward{
                flex: 1;
                img{
                  width: .16rem;
                  vertical-align: middle;
                }
                span{
                  vertical-align: middle;
                }
              }
            }
            .listEval{
              width: 100%;
              margin: .1rem 0 0 0;
              padding: .12rem .12rem .12rem .15rem;
              box-sizing: border-box;
              border-radius: .05rem;
              background: #f8f8f8;
              position: relative;
              .list{
              }
              &:before{
                content: '';
                width: 0;
                height: 0;
                border-left: .06rem solid transparent;
                border-right: .06rem solid transparent;
                border-bottom: .06rem solid #f8f8f8;
                position: absolute;
                top: -.06rem;
                left: .12rem;
              }
              .evalMain{
                color: #999;
                font-size: .13rem;
                span{
                  color: #222;
                  margin: 0 .1rem 0 0;
                }
              }
              .timeZan{
                color: #999;
                font-size: .13rem;
                margin: .1rem 0 0 0;
                display: flex;
                img{
                  width: .16rem;
                  height: .16rem;
                  vertical-align: middle;
                }
                span{
                  vertical-align: middle;
                  &.zanCount{
                    width: .42rem;
                    text-align: right;
                  }
                  &.zanTime{
                    flex: 1;
                  }
                }
              }
              .listSeeMore{
                color: #4395f7;
                margin: .1rem 0 0 0;
              }
            }
          }
        }
      }
      .eavMore{
        color: #222;
        font-size: .13rem;
        width: 100%;
        line-height: .45rem;
        text-align: center;
        margin: .1rem 0 0 0;
        a{
          color: #222;
        }
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
