<template>
  <div>
    <div class='detail'>
      <div id="details">
        <div class="swiper" ref="swipeid">
          <div class="swiper-wrapper" >
            <div class="swiper-slide" v-for="(item, index) in Data.notePictures" :key="index">
              <img :src="item" alt="">
            </div>
          </div>
          <div class="swiperIndex boxOrent">
            <span>{{ swiperIndex }}</span> / <span>{{ swiperTotal }}</span>
          </div>
        </div>
        <div class="info">
          <img class="infoImg" :src="Data.customer_picture" alt="">
          <div class="infoAddr">
            <p>{{ Data.shop_name || '***' }}</p>
            <p>{{ Data.customer_name }}</p>
          </div>
          <div class="infoFollow">+ <span>关注</span> </div>
        </div>
        <div class="ads" v-for="(item, index) in Data.noteProducts" :key="index">
          <img class="adsImg" :src="item.picture_url" alt="">
          <span>{{ item.product_name || 暂无 }}</span>
        </div>
        <div class="content">
          <div class="contTitle boxOrent">
            <span>{{ Data.note_name }}</span>
          </div>
          <div class="contMain boxOrent">
            <span>{{ Data.note_desc }}</span>
          </div>
        </div>
        <div class="timeStar">
          <span class="time">{{ Data.created_at }}</span>
          <span class="collect">{{ Data.note_collection_total }}次收藏</span>
          <span class="zan">{{ Data.note_like_total }}次点赞</span>
        </div>
        <div class="touxiang" v-if="operatorData">
          <router-link :to="{path: 'details/praise', query:{'note_id': noteId}}">
            <img v-for="(item, index) in operatorData" :key="index" :src="item.customer_picture" alt="">
            <img src="../images/icon/more.png" alt="">
          </router-link>
        </div>
        <div class="evaluate">
          <div class="title">
            <span>用户评价({{ commentData.comment_sum }})</span>
          </div>
          <ul class="evaList">
            <li>
              <div class="listImg">
                <img src="../images/icon/use.png" alt="">
              </div>
              <div class="listContent">
                <span>评论代表关注,属你最用心</span>
              </div>
            </li>
            <li v-for="(item, index) in commentData.commentinfo" :key="index">
              <div class="listImg">
                <img :src="item.customer_picture" alt="">
              </div>
              <div class="listContent1">
                <div class="listContTitle">
                  <span>{{ item.customer_name }}</span>
                </div>
                <div class="listContMain boxOrent">
                  <span>{{ item.comment_content }}</span>
                </div>
                <div class="timeStars">
                  <div class="time">{{ item.created_at }}</div>
                  <div v-if="item.is_reward == 1" class="reward">
                    <img src="../images/icon/shang.png" alt="">
                    <span>{{ item.reward_amount }}</span>
                  </div>
                  <div class="eval">
                    <!-- <router-link :to="{path: 'details/evalmore'}"> -->
                    <img src="../images/icon/eval.png" alt="">
                    <span>{{ item.comment_like_total }}</span>
                    <!-- </router-link> -->
                  </div>
                  <div class="zan">
                    <img v-if="item.comment_like_flag == -1" src="../images/icon/admire_1.png" alt="">
                    <img v-else src="../images/icon/admire.png" alt="">
                    <span>{{ item.comment_like_total }}</span>
                  </div>
                </div>
                <div class="listEval" v-if="item.reply_info">
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
          </ul>
          <div class="eavMore bor-t" @click="InputChange">
            <router-link :to="{path: 'details/evalmore'}">
              <span>查看全部</span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="footer bor-t">
        <div class="footerBox">
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
      </div>
      <!-- <Evalmore v-if="evalmore" class="evalmore animated fadeInRight"></Evalmore> -->
      <Reward v-if="rewardState" @closed="rewardStateFunc"></Reward>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Swiper from 'swiper'
// import Evalmore from '@/view/evalmore'
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
      evalmore: false,
      commentData: '',
      operatorData: '',
      swiperIndex: 1,
      rewardState: false,
      admireState: true,
      collectState: true,
      swiperTotal: Number,
      noteId: this.$route.query.note_id
    }
  },
  components: {
    Swiper,
    Reward
    // Evalmore
  },
  created () {
    this.LoadingingStatus(true)
    this.$http.NoteInfoDetails({
      data: JSON.stringify({
        'note_id': this.$route.query.note_id
      }),
      openid: window.localStorage.getItem('openId')
    }).then(response => {
      this.Data = response.content
      this.swiperTotal = this.Data.notePictures.length
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
      this.LoadingingStatus(false)
    })

    this.$http.commentDetail({
      data: JSON.stringify({
        'note_id': this.$route.query.note_id
      }),
      openid: window.localStorage.getItem('openId')
    }).then(response => {
      this.commentData = response.content
    })

    this.$http.NoteOperator({
      data: JSON.stringify({
        'note_id': this.$route.query.note_id,
        'pag_no': 1,
        'pag_num': 6
      }),
      openid: window.localStorage.getItem('openId')
    }).then(response => {
      this.operatorData = response.content.data
    })
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
    },
    InputChange () {
      // this.$refs.Inputs.focus()
    }
  },
  watch: {
    evalmore (val) {
      let self = this
      if (val) {
        self.bridge.onHistoryBack(function () {
          self.evalmore = !self.evalmore
        })
      } else {
        self.bridge.onHistoryBack()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .detail{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    overflow: scroll;
    background: #f4f6fa;
    #details{
      width: 100%;
      position: absolute;
      top: 0;
      bottom: .45rem;
      left: 0;
      overflow: scroll;
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
          display: -webkit-box;
          word-break: break-all;
          text-overflow: ellipsis;
          padding: .15rem .15rem 0 .17rem;
        }
        .contMain{
          color: #222;
          font-size: .14rem;
          line-height: .22rem;
          display: -webkit-box;
          word-break: break-all;
          text-overflow: ellipsis;
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
                display: -webkit-box;
                word-break: break-all;
                text-overflow: ellipsis;
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
                  width: .6rem;
                  text-align: right;
                  img{
                    width: .15rem;
                    vertical-align: middle;
                  }
                  span{
                    display: inline-block;
                    margin: 0 0 0 .02rem;
                    text-align: left;
                    vertical-align: middle;
                  }
                }
                .zan{
                  width: .6rem;
                  text-align: right;
                  img{
                    width: .15rem;
                    vertical-align: middle;
                  }
                  span{
                    display: inline-block;
                    margin: 0 0 0 .02rem;
                    vertical-align: middle;
                  }
                }
                .time,{
                  flex: 1;
                  span{
                    vertical-align: middle;
                  }
                }
                .reward{
                  width: .55rem;
                  margin-left: .05rem;
                  img{
                    width: .15rem;
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
      width: 100%;
      height: .45rem;
      background: #fff;
      line-height: .45rem;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10;
      .footerBox{
        width: 100%;
        display: flex;
        .item{
          flex: 1;
          color: #222;
          font-size: .13rem;
          text-align: center;
          span{
            vertical-align: middle;
          }
          img{
            width: .16rem;
            vertical-align: middle;
          }
        }
      }
    }
    .evalmore{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
    }
  }
</style>
