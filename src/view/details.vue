<template>
  <div>
    <div v-wechat-title="$route.meta.title"></div>
    <div class='detail'>
      <div id="details">
        <div class="swiper" ref="swipeid">
          <div class="swiper-wrapper" >
            <div v-if="Data.video_flag == '1'" class="swiper-slide" @click="videoFunc">
              <video v-show="vedioState" ref="video" :src="Data.note_video" controls="controls"></video>
              <img :src="Data.video_picture">
              <div class="vedioImg">
                <img src="../images/icon/play.png">
              </div>
            </div>
            <div v-if="Data.notePictures" class="swiper-slide" v-for="(item, index) in Data.notePictures" :key="index" @click="showPictureFunc(index)">
              <img :src="item">
            </div>
          </div>
          <div class="swiperIndex boxOrent" v-if='swiperTotal'>
            <span>{{ swiperIndex }}</span> / <span>{{ swiperTotal }}</span>
          </div>
        </div>
        <div class="info">
          <img class="infoImg" :src="Data.customer_picture" alt="">
          <div class="infoAddr">
            <p v-if="Data.shop_name">{{ Data.shop_name || '***' }}</p>
            <p :class="{onlyName: !Data.shop_name}">{{ Data.customer_name }}</p>
          </div>
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
            <span v-html="Data.note_desc"></span>
          </div>
          <div v-if="fromFlag == 1" class="iconImg">
            <img src="../images/ewm.jpeg" alt="">
          </div>
          <div v-if="fromFlag == 1" class="contEwm"><span>买潮机 找店员 超级店猿</span></div>
        </div>
        <div class="timeStar">
          <span class="time">{{ Data.created_at }}</span>
          <span class="collect">{{ Data.note_collection_total }}次收藏</span>
          <span class="zan">{{ Data.note_like_total }}次点赞</span>
        </div>
        <div class="touxiang">
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
            <li v-for="(item, index) in commentData.commentinfo" :key="index">
              <div class="listImg">
                <img :src="item.customer_picture" alt="">
              </div>
              <div class="listContent1">
                <div class="listContTitle">
                  <span>{{ item.customer_name }}</span>
                </div>
                <div class="listContMain boxOrent">
                  <span v-html="item.comment_content"></span>
                </div>
                <div class="timeStars">
                  <div class="time">{{ item.created_at }}</div>
                  <div v-if="item.is_reward == 1" class="reward">
                    <img src="../images/icon/shang.png" alt="">
                    <span>{{ item.reward_amount }}</span>
                  </div>
                  <div class="zan" @click="zanFunc(item.comment_id, item.customer_id, item.comment_like_flag, index)">
                    <img v-if="item.comment_like_flag == -1" src="../images/icon/admire_1.png" alt="">
                    <img v-else src="../images/icon/admire.png" alt="">
                    <span>{{ item.comment_like_total }}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="eavMore bor-t">
            <router-link :to="{path: 'details/evalmore', query:{'note_id': noteId}}">
              <span>查看全部</span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="footer bor-t">
        <div class="footerBox">
          <div class="item" @click="rewardStateFunc" v-show="Data.note_collection_flag">
            <span>赏</span>
            <img src="../images/icon/shang.png" alt="">
          </div>
          <div class="item" @click="collectFunc(Data.note_collection_flag)" v-show="Data.note_collection_flag">
            <img v-if="Data.note_collection_flag == 1" src="../images/icon/star.png">
            <img v-else :class="{animated: collectAnimal, flash: collectAnimal}" src="../images/icon/star_1.png">
          </div>
          <div class="item" @click="admireFunc(Data.note_like_flag)" v-show="Data.note_like_flag">
            <img v-if="Data.note_like_flag == 1" src="../images/icon/admire.png">
            <img v-else :class="{animated: admireAnimal, bounce: admireAnimal}" src="../images/icon/admire_1.png">
          </div>
        </div>
      </div>
      <Reward :data="RewardData" :noteid="Data.note_id" v-if="rewardState" @closed="rewardStateFunc"></Reward>
    </div>
    <router-view/>
  </div>
</template>

<script>
import wx from 'wx'
import { mapActions } from 'vuex'
import Swiper from 'Swiper'
import { Base64 } from 'js-base64'
import Reward from '@/components/reward'
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
      swiperTotal: '',
      RewardData: '',
      vedioState: false,
      collectAnimal: false,
      admireAnimal: false,
      noteId: this.$route.query.note_id,
      fromFlag: this.$route.query.from_flag
    }
  },
  components: {
    Swiper,
    Reward
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let self = this
      self.commitDetail()
      self.$http.NoteOperator({
        data: JSON.stringify({
          'note_id': self.$route.query.note_id,
          'pag_no': 1,
          'pag_num': 6
        }),
        openid: window.localStorage.getItem('openId') || window.sessionStorage.getItem('openId')
      }).then(response => {
        self.operatorData = response.content.data
      }).then(() => {
        self.LoadingingStatus(true)
        self.$http.NoteInfoDetails({
          data: JSON.stringify({
            'note_id': self.$route.query.note_id
          }),
          openid: window.localStorage.getItem('openId') || window.sessionStorage.getItem('openId')
        }).then(response => {
          response.content.note_name = Base64.decode(response.content.note_name)
          response.content.note_desc = Base64.decode(response.content.note_desc).replace(/\n/g, '<br/>')
          self.Data = response.content
          self.swiperTotal = response.content.video_flag === '1' ? self.Data.notePictures.length + 1 : self.Data.notePictures.length
          self.shareWx()
        }).then(() => {
          self.Dom = new Swiper(self.$refs.swipeid, {
            direction: self.direction,
            autoplay: true,
            loop: self.loop,
            observer: true,
            observeParents: true,
            on: {
              transitionEnd: () => {
                self.swiperIndex = self.Dom.activeIndex + 1
              }
            }
          })
          self.LoadingingStatus(false)
        })
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
    ...mapActions([
      'LoginingStatus',
      'LoadingingStatus'
    ]),
    admireFunc (arg) {
      this.admireAnimal = parseInt(arg) !== -1
      this.Data.note_like_total = parseInt(arg) === -1 ? parseInt(this.Data.note_like_total) - 1 : parseInt(this.Data.note_like_total) + 1
      this.Data.note_like_flag = parseInt(arg) === 1 ? -1 : 1
      this.$http.zanNewNote({
        data: JSON.stringify({
          'parameter_id': this.Data.note_id,
          operate: 2
        }),
        openid: window.localStorage.getItem('openId') || window.sessionStorage.getItem('openId')
      }).then(response => {
      })
    },
    collectFunc (arg) {
      this.collectAnimal = parseInt(arg) !== -1
      this.Data.note_collection_total = parseInt(arg) === -1 ? parseInt(this.Data.note_collection_total) - 1 : parseInt(this.Data.note_collection_total) + 1
      this.Data.note_collection_flag = parseInt(arg) === 1 ? -1 : 1
      this.$http.storeNewNote({
        data: JSON.stringify({
          'parameter_id': this.Data.note_id,
          'operate': 4,
          'type': arg
        }),
        openid: window.localStorage.getItem('openId') || window.sessionStorage.getItem('openId')
      }).then(response => {})
    },
    rewardStateFunc (arg) {
      this.rewardState = !this.rewardState
      this.$http.rewardNewNote({
        openid: window.localStorage.getItem('openId') || window.sessionStorage.getItem('openId')
      }).then(response => {
        this.RewardData = response.content
      })
    },
    commitDetail () {
      this.$http.commentDetail({
        data: JSON.stringify({
          'note_id': this.$route.query.note_id
        }),
        openid: window.localStorage.getItem('openId') || window.sessionStorage.getItem('openId')
      }).then(response => {
        for (let i = 0; i < response.content.commentinfo.length; i++) {
          response.content.commentinfo[i].comment_content = Base64.decode(response.content.commentinfo[i].comment_content)
        }
        this.commentData = response.content
      })
    },
    zanFunc (arg1, arg2, arg3, arg4) {
      this.commentData.commentinfo[arg4].comment_like_flag = parseInt(arg3) === -1 ? 1 : -1
      this.commentData.commentinfo[arg4].comment_like_total = parseInt(arg3) === -1 ? parseInt(this.commentData.commentinfo[arg4].comment_like_total) - 1 : parseInt(this.commentData.commentinfo[arg4].comment_like_total) + 1
      this.$http.zanCommitNewNote({
        data: JSON.stringify({
          'customer_id': arg2,
          'comment_id': arg1,
          'focus_type': 5,
          'type': parseInt(arg3)
        }),
        openid: window.localStorage.getItem('openId') || window.sessionStorage.getItem('openId')
      }).then(response => {
        console.log(response.msg)
      })
    },
    videoFunc () {
      this.vedioState = true
      this.$refs.video.play()
    },
    showPictureFunc (arg) {
      wx.previewImage({
        current: this.Data.notePictures[arg],
        urls: this.Data.notePictures
      })
    }
  },
  watch: {
    '$route': 'commitDetail'
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
          &>.onlyName{
            line-height: .38rem !important;
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
          span{
            white-space: pre-wrap;
          }
        }
        .iconImg{
          font-size: 0;
          width: 30%;
          margin: .3rem 35% .1rem;
          img{
            width: 100%;
          }
        }
        .contEwm{
          color: #666;
          font-size: .13rem;
          text-align: center;
          padding: 0 0 .2rem 0;
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
                  vertical-align: middle;
                }
                .eval{
                  width: .55rem;
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
                  width: .55rem;
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
                  width: .5rem;
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
            &.evaList_1{
              a{
                width: 100%;
                display: flex;
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
